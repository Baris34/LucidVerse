from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dream_analysis import analyze_dream
from firebase_config import db
from story_generator import generate_story
from werkzeug.security import generate_password_hash, check_password_hash
import re

app = Flask(__name__)
CORS(app) 

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('username'):
        return jsonify({"error": "Missing email, password, or username"}), 400

    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    users_ref = db.collection('users')
    query = users_ref.where('email', '==', email).limit(1).stream()
    existing_user = [doc for doc in query]

    if existing_user:
        return jsonify({"error": "Bu e-posta adresi zaten kayıtlı."}), 409

    query_username = users_ref.where('username', '==', username).limit(1).stream()
    existing_username = [doc for doc in query_username]
    if existing_username:
        return jsonify({"error": "Bu kullanıcı adı zaten alınmış."}), 409

    hashed_password = generate_password_hash(password)

    try:
        user_data = {
            'username': username,
            'email': email,
            'password_hash': hashed_password,
            'created_at': datetime.utcnow().isoformat()
        }
        user_ref = users_ref.document()
        user_ref.set(user_data)

        return jsonify({
            "message": "Kullanıcı başarıyla oluşturuldu.",
            "userId": user_ref.id,
            "username": username,
            "email": email
        }), 201
    except Exception as e:
        return jsonify({"error": "Kullanıcı oluşturulurken bir hata oluştu: " + str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing email or password"}), 400

    email = data.get('email')
    password = data.get('password')

    users_ref = db.collection('users')
    query = users_ref.where('email', '==', email).limit(1).stream()
    
    user_doc = None
    for doc in query:
        user_doc = doc
        break

    if not user_doc:
        return jsonify({"error": "Geçersiz e-posta veya şifre."}), 401

    user_data = user_doc.to_dict()
    
    if not user_data.get('password_hash') or not check_password_hash(user_data['password_hash'], password):
        return jsonify({"error": "Geçersiz e-posta veya şifre."}), 401

    return jsonify({
        "message": "Giriş başarılı.",
        "userId": user_doc.id,
        "username": user_data.get('username'),
        "email": user_data.get('email')
    }), 200

@app.route('/')
def home():
    return jsonify({"message": "LucidVerse AI API is running!"})

def extract_theme(text: str) -> str:
    match = re.search(r"Tema:\s*([A-Za-z]+)", text)
    if match:
        return match.group(1).strip()
    return "Unknown"
def extract_title(text: str) -> str:
    match = re.search(r"Başlık:\s*(.*)", text)
    return match.group(1).strip() if match else "Başlık Yok"

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    dream_text = data.get("text")
    if not dream_text:
        return jsonify({"error": "No dream text provided"}), 400

    full_analysis = analyze_dream(dream_text)

    title_match = re.search(r"Başlık:\s*(.*)", full_analysis)
    theme_match = re.search(r"Tema:\s*(.*)", full_analysis)

    title = title_match.group(1).strip() if title_match else "Başlık Yok"
    theme = theme_match.group(1).strip() if theme_match else "Tema Yok"
    
    analysis_text = re.sub(r"Başlık:.*\n?", "", full_analysis)
    analysis_text = re.sub(r"Tema:.*", "", analysis_text).strip()

    doc_ref = db.collection('dreams').add({
        'title': title,
        'analysis': analysis_text,
        'theme': theme,
        'dreamText' : dream_text,
        'created_at': datetime.utcnow().isoformat()
    })

    return jsonify({
        "title": title,
        "analysis": analysis_text,
        "theme": theme
    })


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
            "title": data.get("title", ""),
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

@app.route("/dreams", methods=["GET"])
def get_dreams():
    dreams_ref = db.collection("dreams")
    docs = dreams_ref.order_by("created_at", direction="DESCENDING").stream()
    dreams = []

    for doc in docs:
        data = doc.to_dict()
        dreams.append({
            "id": doc.id,
            "title": data.get("title", ""),
            "theme": data.get("theme", ""),
            "analysis": data.get("analysis", "")
        })

    return jsonify(dreams)


@app.route("/dream/<dream_id>", methods=["GET"])
def get_single_dream(dream_id):
    try:
        doc_ref = db.collection("dreams").document(dream_id)
        doc = doc_ref.get()
        if doc.exists:
            return jsonify(doc.to_dict())
        else:
            return jsonify({"error": "Rüya bulunamadı."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

