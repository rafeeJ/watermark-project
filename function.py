from google.cloud import storage
from PIL import Image, ImageDraw, ImageFont
import io
import google.auth
import requests


def add_watermark(request):
    file = request.files['file']
    file_name = file.filename
    file_contents = file.read()

    storage_client = storage.Client()
    bucket = storage_client.bucket("watermarker-project.appspot.com")
    blob = bucket.blob(file_name)
    blob.upload_from_string(file_contents)

    image = Image.open(io.BytesIO(file_contents))
    
    draw = ImageDraw.Draw(image)
    text = "Made by Rafee"
    for i in range(10):
        draw.text((10, 0 + (i * 10)), text, (255, 255, 255))

    new_file_name = "watermarked_" + file_name
    file_location = '/tmp/' + new_file_name
    image.save(file_location)

    new_blob = bucket.blob(new_file_name)
    new_blob.upload_from_filename(file_location, content_type='image/png')

    return 'https://storage.googleapis.com/watermarker-project.appspot.com/{}'.format(new_file_name.replace(' ', '%20'))
