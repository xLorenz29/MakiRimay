const letrasTodas = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y'
];

const numerosTodos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const gridLetras = document.getElementById('grid-letras');
const gridNumeros = document.getElementById('grid-numeros');

// Generar letras
letrasTodas.forEach(letra => {
    const letraItem = document.createElement('div');
    letraItem.className = 'letra-item';
    
    const img = document.createElement('img');
    img.src = `../senas/letras/${letra.toLowerCase()}.jpg`;
    img.alt = `Seña ${letra}`;
    img.title = `Seña: ${letra}`;
    
    const span = document.createElement('span');
    span.className = 'letra';
    span.textContent = letra;
    
    letraItem.appendChild(img);
    letraItem.appendChild(span);
    gridLetras.appendChild(letraItem);
});

// Generar números
numerosTodos.forEach(num => {
    const numeroItem = document.createElement('div');
    numeroItem.className = 'numero-item';
    
    const img = document.createElement('img');
    img.src = `../senas/numeros/${num}.jpg`;
    img.alt = `Seña ${num}`;
    img.title = `Seña: ${num}`;
    
    const span = document.createElement('span');
    span.className = 'numero';
    span.textContent = num;
    
    numeroItem.appendChild(img);
    numeroItem.appendChild(span);
    gridNumeros.appendChild(numeroItem);
});

// FILTRADO
const botonesFilterro = document.querySelectorAll('.btn-filtro');
const columnasGuia = document.querySelectorAll('.guia-columna');

botonesFilterro.forEach(boton => {
    boton.addEventListener('click', () => {
        const filtro = boton.getAttribute('data-filtro');
        
        // Actualizar botones activos
        botonesFilterro.forEach(btn => btn.classList.remove('active'));
        boton.classList.add('active');
        
        // Mostrar/ocultar columnas
        columnasGuia.forEach(columna => {
            const tipo = columna.getAttribute('data-tipo');
            
            if (filtro === 'todos') {
                columna.style.display = 'block';
            } else if (tipo === filtro) {
                columna.style.display = 'block';
            } else {
                columna.style.display = 'none';
            }
        });
    });
});

