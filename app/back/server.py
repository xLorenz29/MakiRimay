from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import cv2
import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

app = Flask(__name__)
CORS(app)

# Cargar modelos una sola vez (optimiza memoria)
letter_model = tf.keras.models.load_model("best_letter.h5")
number_model = tf.keras.models.load_model("best_number.h5")

@app.route("/", methods=["GET"])
def home():
    return {"status": "Backend OK"}

@app.route("/predict", methods=["POST"])
def predict():
    # tu lógica original
    return {"message": "Predicción lista"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
