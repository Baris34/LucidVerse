from flask import Flask, request, jsonify
from flask_cors import CORS
from dream_analysis import analyze_dream

app = Flask(__name__)
CORS(app)  # CORS önce tanımlı

@app.route('/')
def home():
    return jsonify({"message": "LucidVerse AI API is running!"})

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    if request.method == 'OPTIONS':
        # Preflight isteğine başarılı cevap
        return '', 204

    data = request.get_json()
    dream_text = data.get("text")
    if not dream_text:
        return jsonify({"error": "No dream text provided"}), 400

    result = analyze_dream(dream_text)
    return jsonify({"analysis": result})

if __name__ == '__main__':
    app.run(debug=True)
