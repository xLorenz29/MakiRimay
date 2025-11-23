const video = document.getElementById("video");
const overlay = document.getElementById("overlay");
const captureCanvas = document.getElementById("captureCanvas");
const roiPreview = document.getElementById("roiPreview");
const overlayCtx = overlay.getContext("2d");
const captureCtx = captureCanvas.getContext("2d");

const roiSize = 100;
const roiX = 20;
const roiY = 40;

let isProcessing = false;
let autoInterval = null;
let isAutoActive = false;

let palabra = "";
let ultimaLetra = "";
let contadorRepeticiones = 0;

const palabrasValidas = [
    "rico", "flor", "kilo", "roca", "loro", "rayo", "faro",
    "fila", "lira", "idea", "rollo", "aire", "cafe"
];

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => console.error("Error al acceder a la cámara:", err));

function drawOverlay() {
    overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
    overlayCtx.strokeStyle = "green";
    overlayCtx.lineWidth = 2;
    overlayCtx.strokeRect(roiX, roiY, roiSize, roiSize);
    requestAnimationFrame(drawOverlay);
}
drawOverlay();

async function autoCaptureAndPredict() {
    if (isProcessing) return; // evita peticiones solapadas
    isProcessing = true;

    captureCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
    const roiData = captureCtx.getImageData(roiX, roiY, roiSize, roiSize);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = roiSize;
    tempCanvas.height = roiSize;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.putImageData(roiData, 0, 0);
    roiPreview.src = tempCanvas.toDataURL("image/png");

    tempCanvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, "captured.png");
        const mode = document.getElementById("mode").value;

        try {
            const response = await fetch(`https://octopus-app-xnbme.ondigitalocean.app/predict?mode=${mode}`, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                const letraActual = data.prediction;

                document.getElementById("result").textContent = "Predicción: " + letraActual;

                // Verificación de repeticiones
                if (letraActual === ultimaLetra) {
                    contadorRepeticiones++;
                    if (contadorRepeticiones === 5) {
                        palabra += letraActual;
                        document.getElementById("palabra").textContent = palabra;
                        contadorRepeticiones = 0;
                    }
                } else {
                    ultimaLetra = letraActual;
                    contadorRepeticiones = 1;
                }
            }
        } catch (e) {
            console.error("Error en fetch:", e);
        } finally {
            isProcessing = false;
        }
    }, "image/png");
}

document.getElementById("capture").addEventListener("click", () => {
    if (isAutoActive) return; // Evita usar el botón si está en automático

    captureCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
    const roiData = captureCtx.getImageData(roiX, roiY, roiSize, roiSize);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = roiSize;
    tempCanvas.height = roiSize;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.putImageData(roiData, 0, 0);
    roiPreview.src = tempCanvas.toDataURL("image/png");

    tempCanvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, "captured.png");
        const mode = document.getElementById("mode").value;

        const response = await fetch(`https://octopus-app-xnbme.ondigitalocean.app/predict?mode=${mode}`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById("result").textContent = "Predicción: " + data.prediction;
        } else {
            document.getElementById("result").textContent = "Error en la predicción";
        }
    }, "image/png");
});

const modeSelector = document.getElementById("mode"); //

document.getElementById("toggleAuto").addEventListener("click", () => {
    const captureBtn = document.getElementById("capture");
    const toggleBtn = document.getElementById("toggleAuto");

    if (!isAutoActive) {
        isAutoActive = true;
        toggleBtn.textContent = "Detener automático";

        captureBtn.disabled = true;
        modeSelector.disabled = true;

        // Limpiar palabra anterior
        palabra = "";
        ultimaLetra = "";
        contadorRepeticiones = 0;
        document.getElementById("palabra").textContent = "...";

        // Obtener modo actual
        const modo = document.getElementById("mode").value;

        if (modo === "letters") {
            // Palabra aleatoria de letras
            const sugerida = palabrasValidas[Math.floor(Math.random() * palabrasValidas.length)];
            document.getElementById("palabraSugerida").textContent = sugerida;
        } else if (modo === "numbers") {
            // Número aleatorio de 4 dígitos
            const digitosValidos = ['0', '1', '2', '4', '5', '9'];
            let numero = "";
            for (let i = 0; i < 4; i++) {
                const idx = Math.floor(Math.random() * digitosValidos.length);
                numero += digitosValidos[idx];
            }
            document.getElementById("palabraSugerida").textContent = numero;
        } else {
            document.getElementById("palabraSugerida").textContent = "Modo inválido";
        }

        autoInterval = setInterval(autoCaptureAndPredict, 1000);
    } else {
        isAutoActive = false;
        toggleBtn.textContent = "Iniciar automático";

        captureBtn.disabled = false;
        modeSelector.disabled = false;

        clearInterval(autoInterval);
        autoInterval = null;

        // Esperar 500 ms para asegurarnos que no hay predicción en proceso
        setTimeout(() => {
            document.getElementById("result").textContent = "Predicción: ...";

            roiPreview.src = "";
            roiPreview.alt = "Aún no hay imagen previa";
        }, 1500);
    }
});
