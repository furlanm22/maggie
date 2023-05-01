from flask import Flask, request
from pymongo import MongoClient
import openai

app = Flask(__name__)

# configurações do banco de dados
client = MongoClient('mongodb://mongo:27017')
db = client['chatbot_db']
collection = db['chat_history']

# configurações da OpenAI
openai.api_key = 'sua_chave_api_aqui'

@app.route('/chat', methods=['POST'])
def chat():
    input_text = request.json['input']

    # envia a entrada para a OpenAI
    response = openai.Completion.create(
        engine='text-davinci-002',
        prompt=input_text,
        max_tokens=100
    )

    # salva a entrada e a saída no banco de dados
    chat_data = {
        'input': input_text,
        'output': response.choices[0].text
    }
    collection.insert_one(chat_data)

    return {'output': response.choices[0].text}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)