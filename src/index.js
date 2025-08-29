// A URL da sua API local.
// Mantenha a porta 8000 se você a estiver rodando com o comando uvicorn padrão.
const API_URL = "https://analisadorpolinico-api.onrender.com";
// const API_URL = "http://127.0.0.1:8000"

// A lista de classes continua necessária para exibir o resultado da API.
const CLASS_LABELS = [
    'anadenanthera',
    'arecaceae',
    'arrabidaea',
    'cecropia',
    'chromolaena',
    'combretum',
    'croton',
    'dipteryx',
    'eucalipto',
    'faramea',
    'hyptis',
    'mabea',
    'matayba',
    'mimosa',
    'myrcia',
    'protium',
    'qualea',
    'schinus',
    'senegalia',
    'serjania',
    'syagrus',
    'tridax',
    'urochloa'
];

let canvas = document.getElementById('output-canvas');
canvas.style.display = 'none';
let ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('image-upload');
// const runButton = document.getElementById('run-detection');
// const downloadButton = document.getElementById('download-image');
const loadingSpinner = document.getElementById('loading-spinner');

// 1. Não há mais necessidade de carregar o modelo no navegador
async function loadModel() {
    await fetch(API_URL + "/health", { method: "GET" })
    console.log('API pronta para receber requisições.');
}

document.getElementById("run-detection").addEventListener("click", async () => {
    const file = imageUpload.files[0];
    if (file) {
        // Mostra aviso de processamento
        document.getElementById('processing-warning').style.display = 'block';
        loadingSpinner.classList.remove('spinner-hidden');

        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = async () => {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(API_URL + '/analyze', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log(data);

                const resultsDiv = document.getElementById('classification-results');
                resultsDiv.innerHTML = '';
                data.results.forEach(item => {
                    const p = document.createElement('p');
                    p.textContent = `${item.class}: ${(item.probability * 100).toFixed(2)}%`;
                    resultsDiv.appendChild(p);
                });

                // Mostra canvas e botão de download

                // document.getElementById('download-image').style.display = 'inline-block';

            } catch (err) {
                alert('Erro ao processar a imagem. Verifique a API.');
                console.error(err);
            } finally {
                loadingSpinner.classList.add('spinner-hidden');
                document.getElementById('processing-warning').style.display = 'none';
            }
        };
    } else {
        alert('Por favor, selecione uma imagem.');
    }
});



// 3. Desenha os resultados da API no canvas
function drawResultsFromAPI(image, result) {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const { predicted_class, confidence } = result;
    const score = (confidence * 100).toFixed(2);
    const text = `Classe: ${predicted_class} | Certeza: ${score}%`;

    // Desenha um retângulo e o texto no canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(10, 10, ctx.measureText(text).width + 20, 30);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(text, 20, 30);

    canvas.style.display = 'block';
}

// 4. Lógica para download da imagem analisada
// downloadButton.addEventListener('click', () => {
//     const link = document.createElement('a');
//     link.download = 'analise_ia.png';
//     link.href = canvas.toDataURL('image/png');
//     link.click();
// });

// Função para chamar a API sem ninguém pedir
async function autoFetchAPI() {
    console.log("⏳ Chamando API automaticamente...");

    try {
        await fetch(API_URL + "/health", { method: "GET" })

        const data = await response.json();
        console.log("✅ Resposta automática da API:", data);

    } catch (error) {
        console.error("❌ Erro ao chamar API automaticamente:", error);
    }
}

// Inicia chamadas automáticas a cada 30 segundos (30000 ms)
setInterval(autoFetchAPI, 30000);


// 6. Inicia o carregamento da API
document.addEventListener('DOMContentLoaded', loadModel);