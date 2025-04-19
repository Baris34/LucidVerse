import os
from dotenv import load_dotenv
import google.generativeai as genai
from firebase_config import db
from datetime import datetime
import re

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def clean_title(raw_title):
    return re.sub(r'[*_`]', '', raw_title).strip()

def generate_story(text):
    prompt = f"""
Aşağıdaki rüyadan etkilenerek kısa ve özgün bir hikaye üret:
- Başlık ile başlasın. Başlık kısa ve metin ile ilgili anlamlı olsun.
- Ardından hikaye metnini yaz.
- Hikayenin sonunda 'Tema: [tema]' olacak şekilde temayı belirt.

Rüya: {text}
"""

    response = model.generate_content(prompt)
    full_text = response.text.strip()

    lines = full_text.splitlines()

    raw_title = lines[0].strip() if lines else "Başlık Yok"
    title = clean_title(raw_title)

    theme_line = next((line for line in lines if line.startswith("Tema:")), "")
    theme = theme_line.replace("Tema:", "").strip() if "Tema:" in theme_line else "Bilinmiyor"
    
    story_body = "\n".join(line for line in lines[1:] if not line.startswith("Tema:"))

    story_data = {
        "text": text,
        "title": title,
        "story": story_body,
        "theme": theme,
        "created_at": datetime.utcnow().isoformat()
    }
    db.collection("stories").add(story_data)

    return story_data
