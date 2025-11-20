# 🤗 HandsFull
**HandsFull** 
Es una plataforma diseñada para facilitar el aprendizaje del lenguaje de señas de forma interactiva. 
Nace como un proyecto universitario y combina el uso de la cámara web con un modelo de inteligencia artificial capaz de reconocer gestos en tiempo real. Su objetivo es ofrecer una experiencia sencilla, accesible y dinámica para quienes deseen aprender señas de manera práctica.

---
**Características principales**

- Reconocimiento de señas en tiempo real mediante cámara web.

- Modelo de IA entrenado para letras, números y gestos básicos.

- Interfaz simple, educativa e interactiva.

- Modo manual y modo automático de predicción.

---

## ✅ Requisitos del backend

- Python **3.11.5**
- pip
- Entorno virtual (venv)

### Dependencias Python

```bash
pip install tensorflow==2.7.0
pip install opencv-python
pip install protobuf==3.20.*
pip install numpy==1.21
pip install flask
pip install flask-cors
````

---

## 🚀 Ejecución del proyecto

### 1. **Frontend**

-- Desde la carpeta principal
```bash
cd app/front
python -m http.server 8000
```

Esto iniciará el frontend en [http://localhost:8000](http://localhost:8000)

---

### 2. Backend

Desde la carpeta `app/back`, activa tu entorno virtual e instala las dependencias:

```bash
# Activar el entorno
.\venv\Scripts\activate

cd app/back

# Ejecutar el servidor
python server.py
```

El backend se ejecutará en [http://localhost:5000](http://localhost:5000)

---
