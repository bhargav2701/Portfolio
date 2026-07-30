from PIL import Image, ImageDraw
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(script_dir, 'assets', 'logos', 'website icon.png')
dst = os.path.join(script_dir, 'assets', 'favicon')

os.makedirs(dst, exist_ok=True)

# Load original logo
logo = Image.open(src).convert('RGBA')
print(f'Source: {logo.size} mode={logo.mode}')

# Use the logo's smallest dimension as base size for the circle
# Add padding so nothing is cut off (15% padding around the logo)
size = max(logo.size)
padding = int(size * 0.15)  # 15% padding
canvas_size = size + padding * 2

# Create a square canvas with transparent background
canvas = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))

# Center the logo on the canvas
x_offset = (canvas_size - logo.width) // 2
y_offset = (canvas_size - logo.height) // 2
canvas.paste(logo, (x_offset, y_offset), logo)

# Create circular mask
mask = Image.new('L', (canvas_size, canvas_size), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0, canvas_size - 1, canvas_size - 1), fill=255)

# Apply mask to make corners transparent
result = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
result.paste(canvas, (0, 0), mask)

print(f'Circular canvas: {canvas_size}x{canvas_size}')

# Generate all sizes
sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-48x48.png': 48,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
}

for fname, target_size in sizes.items():
    resized = result.resize((target_size, target_size), Image.LANCZOS)
    fp = os.path.join(dst, fname)
    resized.save(fp, 'PNG')
    print(f'Created {fname} ({target_size}x{target_size}) - {os.path.getsize(fp)} bytes')

# Generate .ico (multi-size: 16, 32, 48)
ico_sizes = [16, 32, 48]
ico_images = []
for s in ico_sizes:
    ico_images.append(result.resize((s, s), Image.LANCZOS))
ico_path = os.path.join(dst, 'favicon.ico')
ico_images[0].save(
    ico_path,
    format='ICO',
    sizes=[(s, s) for s in ico_sizes],
    append_images=ico_images[1:]
)
print(f'Created favicon.ico (16, 32, 48) - {os.path.getsize(ico_path)} bytes')

print('\nAll circular favicon files generated successfully!')
print('Files in assets/favicon/:')
for f in sorted(os.listdir(dst)):
    if f != 'site.webmanifest':
        fpath = os.path.join(dst, f)
        print(f'  {f}  ({os.path.getsize(fpath)} bytes)')
