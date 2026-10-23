# Artes originais de referência

Os três ZIPs originais foram publicados com autorização expressa do proprietário
em 2026-10-23. Nenhuma imagem ou animação foi reduzida, transformada ou descartada.
São referências para criar artes próprias, não a expansão autoral já concluída.

## Recuperar os três ZIPs completos

Todos os bytes estão nesta branch `references/original-art-archives`, em 63 partes
verificáveis. O manifesto fixa o commit imutável de cada parte e os hashes das
partes e dos três ZIPs inteiros. A ordem é explícita. Não há release publicada.

Baixe o script desta branch e execute com Python 3.11 ou superior:

```sh
curl -fL 'https://raw.githubusercontent.com/songjongdevsecops/songjongdevsecops.github.io/references/original-art-archives/originals/download.py' -o download-originals.py
python3 download-originals.py --destination ../original-art-references
```

O script usa somente a biblioteca padrão, baixa e reúne as partes, confere todos
os hashes e entrega `magias.zip`, `criaturas.zip` e `sprites-completos.zip`.
Não extrai os ZIPs. Permite retomar downloads interrompidos. Rejeita um arquivo de
destino existente que não corresponda ao original. Uma cópia já verificada é
reutilizada. SHA256SUMS registra os hashes dos três ZIPs originais.

Também pode usar um checkout desta branch, sem baixar as partes novamente:

```sh
python3 originals/download.py --manifest originals/manifest.json --parts-root . --destination ../original-art-references
```

**Não integrar esta branch de armazenamento em main nem usá-la como base dos
PRs de artes.** Trabalhe a partir da main atual, em um fork; consulte os originais
separadamente. Eles não fazem parte do build do jogo. Nenhum anexo deste chat ou
acesso à conta original é necessário para consultar os arquivos públicos.

O trabalho pendente e o encaminhamento por capacidade estão no PR #14 e em
`docs/art/SPRITES-PENDENTES.md` na branch `docs/continuidade-sprites`. A tarefa
visual exige geração de imagens; não atribuí-la ao DeepSeek. O rascunho do lobo
está no PR #13 e não é uma criatura completamente adaptada.
