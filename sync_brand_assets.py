#!/usr/bin/env python3
"""Baixe a logo oficial e o mascote do repositório público da Monks.
Execute antes de publicar um repositório que não tenha a pasta images original.
"""
from pathlib import Path
from urllib.request import urlretrieve
BASE = 'https://monks1911.github.io/site-monks-tecnologia-sistemas/images/'
DEST = Path(__file__).parent / 'assets'
DEST.mkdir(exist_ok=True)
for name in ('logo-monks.png', 'mascote-parado.png'):
    urlretrieve(BASE+name, DEST/name)
    print('Salvo:', DEST/name)
print('Agora você pode usar src="assets/logo-monks.png" no index.html e a mesma imagem em og:image/favicon.')
