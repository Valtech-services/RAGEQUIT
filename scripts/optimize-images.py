#!/usr/bin/env python3
"""
optimize-images.py — allège les images du site (point d'audit A-001).

À lancer depuis la racine du dépôt après l'ajout d'une miniature, d'une
image de blog ou de catégorie :  python3 scripts/optimize-images.py
Nécessite Pillow (pip install pillow). Le script est idempotent.

- public/thumbnails/<id>.jpg : 1024 px max, vrai JPEG qualité 82
  (sert aussi d'image de partage og:image) ;
  + variantes WebP 320 px et 640 px dans public/thumbnails/w320/ et w640/,
  utilisées par les cartes de jeux (src/lib/thumb.js).
- public/blog/*.jpg : 1376 px de large max, qualité 80,
  + variante WebP 640 px dans public/blog/w640/ (cartes du blog).
- public/categories/*.jpg : 1024 px max, qualité 80.
- logos PNG de l'en-tête : 640 px (logo) et 256 px (icône) de large.
"""
import os, sys
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public')


def flat(im):
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        bg = Image.new('RGB', im.size, (10, 7, 32))
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert('RGB')


def cap_jpeg(path, max_side, quality, max_kb):
    im = Image.open(path)
    fmt = im.format
    big = max(im.size) > max_side
    heavy = os.path.getsize(path) > max_kb * 1024
    if not big and not heavy and fmt == 'JPEG':
        return False
    im = flat(im)
    if big:
        im.thumbnail((max_side, max_side), Image.LANCZOS)
    import io
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=quality, optimize=True, progressive=True)
    # On ne garde le résultat que s'il est plus léger (ou si le fichier
    # n'était pas un vrai JPEG).
    if fmt == 'JPEG' and buf.tell() >= os.path.getsize(path):
        return False
    with open(path, 'wb') as fh:
        fh.write(buf.getvalue())
    return True


def webp(src, dst, width):
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return False
    im = flat(Image.open(src))
    im.thumbnail((width, width), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, 'WEBP', quality=78, method=6)
    return True


def png_width(path, width):
    im = Image.open(path)
    if im.width <= width:
        return False
    h = round(im.height * width / im.width)
    im.resize((width, h), Image.LANCZOS).save(path, 'PNG', optimize=True)
    return True


changed = []
tdir = os.path.join(ROOT, 'thumbnails')
for f in sorted(os.listdir(tdir)):
    p = os.path.join(tdir, f)
    if not os.path.isfile(p) or not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        continue
    if f.lower().endswith(('.jpg', '.jpeg')) and cap_jpeg(p, 1024, 82, 250):
        changed.append(p)
    base = os.path.splitext(f)[0]
    for w in (320, 640):
        if webp(p, os.path.join(tdir, f'w{w}', base + '.webp'), w):
            changed.append(f'thumbnails/w{w}/{base}.webp')

for sub, side, q, kb in (('blog', 1376, 80, 300), ('categories', 1024, 80, 150)):
    d = os.path.join(ROOT, sub)
    for f in sorted(os.listdir(d)):
        p = os.path.join(d, f)
        if os.path.isfile(p) and f.lower().endswith(('.jpg', '.jpeg')) and cap_jpeg(p, side, q, kb):
            changed.append(p)

bdir = os.path.join(ROOT, 'blog')
for f in sorted(os.listdir(bdir)):
    p = os.path.join(bdir, f)
    if os.path.isfile(p) and f.lower().endswith(('.jpg', '.jpeg', '.png')):
        if webp(p, os.path.join(bdir, 'w640', os.path.splitext(f)[0] + '.webp'), 640):
            changed.append(f'blog/w640/{os.path.splitext(f)[0]}.webp')

for f, w in (('ragequit-logo-white.png', 640), ('ragequit-icon-white.png', 256)):
    p = os.path.join(ROOT, f)
    if os.path.exists(p) and png_width(p, w):
        changed.append(p)

print(f'{len(changed)} fichier(s) optimisé(s)')
for c in changed:
    print(' -', os.path.relpath(c, ROOT) if os.path.isabs(c) else c)
