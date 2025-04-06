from flask import Flask, request, jsonify
from flask_cors import CORS
from dream_analysis import analyze_dream
from firebase_config import db
import re

app = Flask(__name__)
CORS(app) 

@app.route('/')
def home():
    return jsonify({"message": "LucidVerse AI API is running!"})

def extract_theme(text: str) -> str:
    match = re.search(r"Tema:\s*([A-Za-z]+)", text)
    if match:
        return match.group(1).strip()
    return "Unknown"

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    if request.method == 'OPTIONS':
        
        return '', 204

    data = request.get_json()
    dream_text = data.get("text")
    if not dream_text:
        return jsonify({"error": "No dream text provided"}), 400

    result = analyze_dream(dream_text)
    theme =  extract_theme(result)

    doc_ref = db.collection('dreams').add({
        'currentTheme': theme
    })
    return jsonify({"analysis": result})

if __name__ == '__main__':
    app.run(debug=True)
