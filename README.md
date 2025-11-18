# 🤲 HandsFull

**HandsFull** es una plataforma interactiva para el aprendizaje del lenguaje de señas, desarrollada como proyecto universitario. Utiliza la cámara web y un modelo de reconocimiento basado en inteligencia artificial para identificar gestos en tiempo real, brindando una experiencia accesible, educativa y dinámica para quienes deseen aprender lenguaje de señas de forma fácil y práctica.

---

## ✅ Requisitos del backend

- Python **3.9**
- pip
- Entorno virtual recomendado

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

## 🚀 Cómo ejecutar el proyecto

### 1. Frontend

Desde la carpeta `app/front`, ejecuta:

```bash
cd app/front
python -m http.server 8000
```

Esto iniciará el frontend en [http://localhost:8000](http://localhost:8000)

---

### 2. Backend

Desde la carpeta `app/back`, activa tu entorno virtual e instala las dependencias:

```bash
cd app/back

# Activar el entorno
.\venv\Scripts\activate

# Ejecutar el servidor
python server.py
```

El backend se ejecutará en [http://localhost:5000](http://localhost:5000)

---
