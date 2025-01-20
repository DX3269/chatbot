from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)
CORS(app)  

model_name = "facebook/blenderbot-400M-distill"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route('/message', methods=['POST'])
def process_message():
    user_query = request.json.get('query', '').strip()

    if not user_query:
        return jsonify({"reply": "Please say something!"})


    inputs = tokenizer(user_query, return_tensors="pt")
    reply_ids = model.generate(**inputs)
    bot_reply = tokenizer.decode(reply_ids[0], skip_special_tokens=True)

    return jsonify({"reply": bot_reply})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
