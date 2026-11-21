from PIL import Image, ImageDraw
import math

src = r"C:\laragon\www\repo-atlas-next\assets\avatar-512.png"
out = r"C:\laragon\www\repo-atlas-next\assets\logo-pulse.gif"

size = 360
base = Image.open(src).convert("RGB").resize((size, size), Image.LANCZOS)
frames = []
n = 18
cx = cy = size / 2

for i in range(n):
    t = i / n
    frame = base.copy()
    draw = ImageDraw.Draw(frame, "RGBA")
    radius = 150 + 5 * math.sin(2 * math.pi * t)
    box = (cx - radius, cy - radius, cx + radius, cy + radius)
    draw.ellipse(box, outline=(34, 211, 238, 150), width=2)
    draw.ellipse(
        (cx - radius + 8, cy - radius + 8, cx + radius - 8, cy + radius - 8),
        outline=(139, 92, 246, 90),
        width=1,
    )
    angle = 2 * math.pi * t
    dx, dy = radius * math.cos(angle), radius * math.sin(angle)
    draw.ellipse((cx + dx - 6, cy + dy - 6, cx + dx + 6, cy + dy + 6), fill=(168, 85, 247, 255))
    dx2, dy2 = radius * math.cos(angle + math.pi), radius * math.sin(angle + math.pi)
    draw.ellipse((cx + dx2 - 5, cy + dy2 - 5, cx + dx2 + 5, cy + dy2 + 5), fill=(34, 211, 238, 255))
    frames.append(frame)

frames[0].save(
    out,
    save_all=True,
    append_images=frames[1:],
    duration=90,
    loop=0,
    optimize=True,
)
print("animated logo:", out)
