# Traces the supplied raster logo into layered SVG (wordmark, stripe accent, tagline).
# Usage: pip install potracer pillow numpy; python3 trace.py texturr-logo-supplied.png ..
import sys, numpy as np, potrace
from PIL import Image
K=6  # upscale before tracing for smoother curves
im=Image.open(sys.argv[1]).convert('RGB')
W,H=im.size
big=np.asarray(im.resize((W*K,H*K),Image.LANCZOS)).astype(int)
r,g,b=big[...,0],big[...,1],big[...,2]
red=(r>120)&(r-g>55)
light=(r>120)&(g>120)&(b>120)&~red
yy=np.arange(H*K)[:,None]
word=light&(yy<140*K); tag=light&(yy>=140*K)
def path(mask):
    pl=potrace.Bitmap(mask).trace(turdsize=8*K,alphamax=1.0,opticurve=True,opttolerance=0.2)
    f=lambda p:f"{p.x/K:.2f} {p.y/K:.2f}"
    d=[]
    for c in pl:
        pts=[c.start_point]+[s.end_point for s in c.segments]
        if max(q.x for q in pts)-min(q.x for q in pts) > W*K*0.98: continue  # canvas boundary, not artwork
        d.append("M"+f(c.start_point))
        for s in c.segments:
            d.append(("L"+f(s.c)+" L"+f(s.end_point)) if s.is_corner else ("C"+f(s.c1)+" "+f(s.c2)+" "+f(s.end_point)))
        d.append("Z")
    return "".join(d)
# crop box: tight around artwork
ys,xs=np.where(light|red); x0,x1,y0,y1=xs.min()/K,xs.max()/K,ys.min()/K,ys.max()/K
wy0,wy1=np.where(word.any(1))[0][[0,-1]]/K
pw,pa,pt=path(word),path(red),path(tag)
vb_full=f"{x0-1:.1f} {y0-1:.1f} {x1-x0+2:.1f} {y1-y0+2:.1f}"
vb_word=f"{x0-1:.1f} {wy0-1:.1f} {x1-x0+2:.1f} {wy1-wy0+2:.1f}"
def svg(vb,tag_on,title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-labelledby="t"><title id="t">{title}</title>'
      f'<path class="lg-word" fill-rule="evenodd" fill="var(--logo-word, #191917)" d="{pw}"/>'
      f'<path class="lg-accent" fill-rule="evenodd" fill="var(--logo-accent, #8A735B)" d="{pa}"/>'
      + (f'<path class="lg-tag" fill-rule="evenodd" fill="var(--logo-tag, var(--logo-word, #191917))" d="{pt}"/>' if tag_on else '') + '</svg>')
out=sys.argv[2]
open(f'{out}/texturr-logo.svg','w').write(svg(vb_full,True,'Texturr — Surface Evolution'))
open(f'{out}/texturr-wordmark.svg','w').write(svg(vb_word,False,'Texturr'))
print('viewBox full',vb_full,'| word',vb_word,'| bytes',len(pw)+len(pa)+len(pt))
