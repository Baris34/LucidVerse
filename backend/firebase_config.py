import os
import json
import base64
import tempfile
from firebase_admin import credentials, initialize_app, firestore
from dotenv import load_dotenv

load_dotenv()

firebase_key_base64 = os.getenv("FIREBASE_KEY_BASE64")

decoded_key = base64.b64decode(firebase_key_base64.encode())

with tempfile.NamedTemporaryFile(delete=False, suffix=".json") as f:
    f.write(decoded_key)
    temp_key_path = f.name

cred = credentials.Certificate(temp_key_path)
initialize_app(cred)
db = firestore.client()
