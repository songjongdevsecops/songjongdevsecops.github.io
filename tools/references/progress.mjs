import { readFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
const root = new URL("../../", import.meta.url);
const read = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));
const manifest = await read("assets/reference-art/manifest.json");
const review = await read("docs/art/referencias/curadoria.json");
const query = process.argv[2];
const ids = new Set(), sources = new Map(), matched = [];
const entries = new Map();
for (const entry of review.entries) {
  const key = `${entry.archive}:${entry.member}`;
  if (entries.has(key)) throw Error(`Curadoria duplicada: ${key}`);
  entries.set(key, entry);
}
let references = 0;
for (let page = 0; page < Math.ceil(manifest.references / 8192); page++) {
  const text = await readFile(new URL(`docs/art/referencias/cobertura-${String(page).padStart(4, "0")}.ndjson.gz.txt`, root), "utf8");
  for (const line of gunzipSync(Buffer.from(text, "base64")).toString().trim().split("\n")) {
    const [archive, member, id, width, height, frames] = JSON.parse(line);
    const source = `${archive}:${member}`;
    if (sources.has(source)) throw Error(`Referência duplicada: ${source}`);
    sources.set(source, id); ids.add(id); references++;
    if (query && (source.toLowerCase().includes(query.toLowerCase()) || id === query))
      matched.push({ archive, member, id, width, height, frames,
        status: entries.get(source)?.status || "pending" });
  }
}
if (references !== manifest.references || ids.size !== manifest.recipes)
  throw Error("Inventário incompleto");
for (const item of review.entries) {
  if (!ids.has(item.id)) throw Error(`ID desconhecido: ${item.id}`);
  if (sources.get(`${item.archive}:${item.member}`) !== item.id)
    throw Error("Origem não corresponde ao ID");
  // Generated sheets and render checks cannot approve art automatically.
  if (!["draft", "rejected"].includes(item.status))
    throw Error("Este registro contém apenas estudos ainda sem aprovação integral");
  if (!/^docs\/art\/referencias\/curadoria\/[a-z0-9-]+\.png$/.test(item.file))
    throw Error("Caminho de estudo inválido");
  const bytes = await readFile(new URL(item.file, root));
  if (createHash("sha256").update(bytes).digest("hex") !== item.sha256)
    throw Error("Estudo modificado após a revisão");
  if (!item.review?.issues?.length) throw Error("Faltam pendências do estudo");
}
console.log(JSON.stringify(query ? matched : {
  references, recipes: ids.size, artisticallyApproved: 0,
  pendingReferences: references, pendingRecipes: ids.size,
  drafts: review.entries.length,
  note: "Inventário não equivale a adaptação artística concluída.",
}, null, 2));
