import os
from dotenv import load_dotenv
import google.generativeai as genai
from markdown import markdown
load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash')

def analyze_dream(text):
    prompt = f"Aşağıdaki rüyayı Freud'a göre kısaca analiz et: {text}"
    response = model.generate_content(prompt)
    markdown_text = response.text
    html_output = markdown(markdown_text)
    return html_output
