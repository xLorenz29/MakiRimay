const letrasTodas = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y'
];

const numerosTodos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const gridLetras = document.getElementById('grid-letras');
const gridNumeros = document.getElementById('grid-numeros');

letrasTodas.forEach(letra => {
    const img = document.createElement('img');
    img.src = `senas/letras/${letra}.jpg`;
    img.alt = `Seña ${letra}`;
    img.title = `Seña: ${letra}`;
    gridLetras.appendChild(img);
});

numerosTodos.forEach(num => {
    const img = document.createElement('img');
    img.src = `senas/numeros/${num}.jpg`;
    img.alt = `Seña ${num}`;
    img.title = `Seña: ${num}`;
    gridNumeros.appendChild(img);
});

