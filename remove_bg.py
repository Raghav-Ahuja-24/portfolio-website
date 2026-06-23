from rembg import remove
from PIL import Image

input_path = r"c:\Users\acer\Desktop\PortfolioWebsite\public\images\hologram-avatar.png"
output_path = r"c:\Users\acer\Desktop\PortfolioWebsite\public\images\hologram-avatar-transparent.png"

with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input_data = i.read()
        output_data = remove(input_data)
        o.write(output_data)

print("Background removed successfully")
