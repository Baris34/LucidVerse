from flask import Flask, request, jsonify
from flask_cors import CORS
from dream_analysis import analyze_dream
from firebase_config import db
from story_generator import generate_story
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

@app.route("/generate-story", methods=["POST"])
def generate_story_route():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    story = generate_story(text)
    return jsonify(story), 200

@app.route("/stories", methods=["GET"])
def get_stories():
    stories_ref = db.collection("stories")
    docs = stories_ref.order_by("created_at", direction="DESCENDING").stream()
    stories = []

    for doc in docs:
        data = doc.to_dict()
        stories.append({
            "id": doc.id,
            "title": data.get("title", ""),  # ✅ Başlık eklendi
            "content": data.get("story", "")[:30] + "...",
            "theme": data.get("theme", ""),
            "full_story": data.get("story", "")
        })

    return jsonify(stories)   

@app.route("/story/<story_id>", methods=["GET"])
def get_single_story(story_id):
    try:
        doc_ref = db.collection("stories").document(story_id)
        doc = doc_ref.get()
        if doc.exists:
            return jsonify(doc.to_dict())
        else:
            return jsonify({"error": "Hikaye bulunamadı."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
