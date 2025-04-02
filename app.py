from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from textblob import TextBlob
import random

app = Flask(__name__)
CORS(app)

jokes = [
    "Why don't skeletons fight each other? They don't have the guts.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call cheese that isn't yours? Nacho cheese!",
    "Two cannibals were eating a clow and they asked \"Why does this taste funny?\""
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    sentiment = TextBlob(text).sentiment.polarity

    if sentiment > 0:
        print(sentiment) #DEBUG
        return jsonify({"result": "good", "image": "thumbs-up.png"})
    elif sentiment == 0:
        print(sentiment)
        return jsonify({"result": "neutral"})
    else:
        print(sentiment) #DEBUG
        return jsonify({"result": "bad", "joke": random.choice(jokes)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
