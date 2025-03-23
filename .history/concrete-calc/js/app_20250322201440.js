// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registrado');
            })
            .catch(err => {
                console.log('Falha no ServiceWorker:', err);
            });
    });
}

// Lógica da Calculadora
let tuboCount = 1;

function adicionarTubo() {
    tuboCount++;
    const novoItem = document.createElement('div');
    novoItem.className = 'tubo-item';
    novoItem.innerHTML = 
        <h3>Tubo ${tuboCount}</h3>
        <div class="input-group">
            <label>Raio (m)</label>
            <input type="number" class="raio" step="0.01">
        </div>
        <div class="input-group">
            <label>Quantidade</label>
            <input type="number" class="quantidade">
        </div>
        <div class="input-group">
            <label>Comprimento (m)</label>
            <input type="number" class="comprimento-tubo" step="0.01">
        </div>
    ;
    document.getElementById('tubos-container').appendChild(novoItem);
}

function calcular() {
    const largura = parseFloat(document.getElementById('largura').value) || 0;
    const altura = parseFloat(document.getElementById('altura').value) || 0;
    const comprimento = parseFloat(document.getElementById('comprimento').value) || 0;

    let volumeTubos = 0;
    
    document.querySelectorAll('.tubo-item').forEach(tubo => {
        const raio = parseFloat(tubo.querySelector('.raio').value) || 0;
        const quantidade = parseFloat(tubo.querySelector('.quantidade').value) || 0;
        const comprimentoTubo = parseFloat(tubo.querySelector('.comprimento-tubo').value) || 0;
        
        volumeTubos += Math.PI * Math.pow(raio, 2) * comprimentoTubo * quantidade;
    });

    const volumeBanco = largura * altura * comprimento;
    const concretoNecessario = volumeBanco - volumeTubos;

    // Atualizar UI
    document.getElementById('volume-banco').textContent = volumeBanco.toFixed(2);
    document.getElementById('volume-tubos').textContent = volumeTubos.toFixed(2);
    document.getElementById('concreto').textContent = concretoNecessario.toFixed(2);
}

// Salvar dados offline
function salvarLocalmente() {
    const dados = {
        largura: document.getElementById('largura').value,
        altura: document.getElementById('altura').value,
        comprimento: document.getElementById('comprimento').value,
        tubos: []
    };

    document.querySelectorAll('.tubo-item').forEach(tubo => {
        dados.tubos.push({
            raio: tubo.querySelector('.raio').value,
            quantidade: tubo.querySelector('.quantidade').value,
            comprimento: tubo.querySelector('.comprimento-tubo').value
        });
    });

    localStorage.setItem('concreteCalcData', JSON.stringify(dados));
}

// Carregar dados salvos
window.addEventListener('load', () => {
    const savedData = localStorage.getItem('concreteCalcData');
    if (savedData) {
        const dados = JSON.parse(savedData);
        // Implementar lógica de carregamento
    }
});