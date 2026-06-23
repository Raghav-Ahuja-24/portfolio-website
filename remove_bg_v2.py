from rembg import remove
from PIL import Image
import os

# Using the second generated image that had a solid background
input_path = r"C:\Users\acer\.gemini\antigravity-ide\brain\48cc4377-7a74-4b44-98ed-2eb81be9938c\hologram_avatar_no_checkers_1782184965290.png"
output_path = r"c:\Users\acer\Desktop\PortfolioWebsite\public\images\hologram-avatar.png"

with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input_data = i.read()
        output_data = remove(input_data)
        o.write(output_data)

print("Background removed successfully from the solid background version")
