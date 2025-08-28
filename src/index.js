// Este é o código JavaScript que lida com a lógica do modelo e da interface.
// Ele assume que você já converteu seu modelo .pt para o formato TensorFlow.js
// e que os arquivos (como model.json, etc.) estão em uma pasta no seu projeto.
// Substitua o caminho './caminho_do_seu_modelo/model.json' pelo caminho real.

const MODEL_PATH = './caminho_do_seu_modelo/model.json';
const CLASS_LABELS = ['classe1', 'classe2', 'classe3']; // Substitua pelos rótulos reais

let model;
let canvas = document.getElementById('output-canvas');
let ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('image-upload');
const runButton = document.getElementById('run-detection');
const downloadButton = document.getElementById('download-image');
const loadingSpinner = document.getElementById('loading-spinner');

// 1. Carrega o modelo de IA
async function loadModel() {
    console.log('Carregando modelo...');
    loadingSpinner.classList.remove('spinner-hidden');
    model = await tf.loadGraphModel(MODEL_PATH);
    console.log('Modelo carregado com sucesso!');
    loadingSpinner.classList.add('spinner-hidden');
    runButton.disabled = false;
}

// 2. Executa a detecção na imagem
async function runDetection(image) {
    console.log('Executando inferência...');
    const startTime = performance.now();

    const tensor = tf.browser.fromPixels(image)
        .resizeBilinear([416, 416])
        .expandDims(0)
        .toFloat();

    const predictions = await model.executeAsync(tensor);

    // Libera a memória do tensor
    tf.dispose(tensor);

    const endTime = performance.now();
    console.log(`Inferência concluída em ${endTime - startTime}ms`);

    // Processa os resultados para obter bounding boxes, scores e classes
    const [boxes, scores, classes] = await Promise.all(predictions.map(t => t.array()));

    // Desenha a imagem original e as detecções no canvas
    drawResults(image, boxes, scores, classes);

    // Libera a memória dos tensores de previsão
    tf.dispose(predictions);

    downloadButton.style.display = 'block';
}

// 3. Desenha os resultados no canvas
function drawResults(image, boxes, scores, classes) {
    // Redimensiona o canvas para a imagem original
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const threshold = 0.5; // Limite de confiança

    // Itera sobre as predições e desenha as caixas
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > threshold) {
            const [y1, x1, y2, x2] = boxes[i];
            const className = CLASS_LABELS[classes[i]];
            const score = (scores[i] * 100).toFixed(2);

            const [left, top, width, height] = [
                x1 * canvas.width,
                y1 * canvas.height,
                (x2 - x1) * canvas.width,
                (y2 - y1) * canvas.height
            ];

            // Desenha a caixa
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(left, top, width, height);

            // Desenha o texto
            ctx.fillStyle = 'red';
            ctx.font = '16px Arial';
            const text = `${className}: ${score}%`;
            ctx.fillText(text, left, top > 10 ? top - 5 : top + 15);
        }
    }
    canvas.style.display = 'block'; // Mostra o canvas
}

// 4. Lógica para download da imagem analisada
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'analise_ia.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

// 5. Lógica para o botão de análise
runButton.addEventListener('click', async () => {
    const file = imageUpload.files[0];
    if (file && model) {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => runDetection(image);
    } else {
        alert('Por favor, selecione uma imagem e aguarde o modelo carregar.');
    }
});

// 6. Inicia o carregamento do modelo assim que a página é carregada
document.addEventListener('DOMContentLoaded', loadModel);