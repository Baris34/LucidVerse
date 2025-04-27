import os
from dotenv import load_dotenv
import google.generativeai as genai
from markdown import markdown
load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash')

def analyze_dream(text):
    prompt = f"""
Aşağıdaki rüya için:
- Önce kısa ve yaratıcı bir başlık üret. (Sadece başlığı ver, 'Başlık:' ifadesiyle başlasın.)
- Freud'a göre kısaca analiz et.
- En son, sadece şu formatta bir tema belirt: Tema: [Tema İsmi]

Tema listesi:
Conflict (Çatışma), Fear (Korku), Freedom (Özgürlük), Loss (Kayıp),
Transformation (Dönüşüm), Love (Aşk), Isolation (Yalnızlık),
Control (Kontrol), Identity (Kimlik), Adventure (Macera)

Rüya: {text}
"""
    response = model.generate_content(prompt)
    return response.text.strip() 

