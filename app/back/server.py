#Subir
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

# Cargar ambos modelos una vez
letter_model = tf.keras.models.load_model("best_letter.h5")
number_model = tf.keras.models.load_model("best_number.h5")

@app.route('/predict', methods=['POST'])
def predict():
    mode = request.args.get('mode', 'letters')

    print(f"Modo recibido: {mode}")

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    img_np = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Preprocesar según el modo
    if mode == 'letters':
        model = letter_model
        abc = 'ABCDEFGHIKLMNOPQRSTUVWXY'
        img = cv2.resize(img_np, (56, 56)) / 255
    elif mode == 'numbers':
        model = number_model
        abc = '0123456789'
        img = cv2.resize(img_np, (56, 56)) / 255
    else:
        return jsonify({'error': 'Invalid mode'}), 400

    pred = model.predict(img.reshape(1, *img.shape))
    label = abc[np.argmax(pred)]

    return jsonify({'prediction': label})

if __name__ == '__main__':
    app.run(debug=True)
