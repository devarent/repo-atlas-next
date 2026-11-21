from PIL import Image, ImageDraw
import math

src = r"C:\laragon\www\repo-atlas-next\assets\avatar-512.png"
out = r"C:\laragon\www\repo-atlas-next\assets\logo-pulse.gif"

size = 360
base = Image.open(src).convert("RGB").resize((size, size), Image.LANCZOS)
frames = []
n = 24
cx = cy = size / 2

VIOLET = (139, 92, 246)
CYAN = (77, 225, 255)
PINK = (255, 155, 210)
AMBER = (255, 184, 107)

for i in range(n):
    t = i / n
    frame = base.copy()
    draw = ImageDraw.Draw(frame, "RGBA")

    radius = 158 + 4 * math.sin(2 * math.pi * t)
    draw.ellipse(
        (cx - radius, cy - radius, cx + radius, cy + radius),
        outline=(*CYAN, 130),
        width=2,
    )
    draw.ellipse(
        (cx - radius + 9, cy - radius + 9, cx + radius - 9, cy + radius - 9),
        outline=(*VIOLET, 80),
        width=1,
    )

    angle = 2 * math.pi * t - math.pi / 2
    dx, dy = radius * math.cos(angle), radius * math.sin(angle)
    draw.ellipse((cx + dx - 6, cy + dy - 6, cx + dx + 6, cy + dy + 6), fill=(*CYAN, 255))
    draw.ellipse((cx + dx - 12, cy + dy - 12, cx + dx + 12, cy + dy + 12), outline=(*CYAN, 55), width=2)

    angle2 = angle + math.pi
    dx2, dy2 = radius * math.cos(angle2), radius * math.sin(angle2)
    draw.ellipse((cx + dx2 - 5, cy + dy2 - 5, cx + dx2 + 5, cy + dy2 + 5), fill=(*PINK, 255))

    angle3 = angle + math.pi * 0.55
    dx3, dy3 = radius * math.cos(angle3), radius * math.sin(angle3)
    draw.ellipse((cx + dx3 - 3, cy + dy3 - 3, cx + dx3 + 3, cy + dy3 + 3), fill=(*AMBER, 220))

    frames.append(frame)

frames[0].save(
    out,
    save_all=True,
    append_images=frames[1:],
    duration=80,
    loop=0,
    optimize=True,
)
print("animated logo:", out)
