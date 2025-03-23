// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registrado com escopo:', registration.scope);
            })
            .catch(err => {
                console.error('Falha no ServiceWorker:', err);
            });
    });
}

// Funções da Calculadora
let tuboCount = 1;

function parseInput(value) {
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed : 0;
}

function adicionarTubo() {
    const container = document.getElementById('tubos-container');
    if (!container) return;

    tuboCount++;
    const novoItem = document.createElement('div');
    novoItem.className = 'tubo-item';
    novoItem.innerHTML = `
        <h3>Tubo ${tuboCount}</h3>
        <div class="input-group">
            <label>Raio (m)</label>
            <input type="number" class="raio" step="0.01" required>
        </div>
        <div class="input-group">
            <label>Quantidade</label>
            <input type="number" class="quantidade" min="1" value="1" required>
        </div>
        <div class="input-group">
            <label>Comprimento (m)</label>
            <input type="number" class="comprimento-tubo" step="0.01" required>
        </div>
    `;
    container.appendChild(novoItem);
    salvarLocalmente();
}

function calcular() {
    try {
        const largura = parseInput(document.getElementById('largura').value);
        const altura = parseInput(document.getElementById('altura').value);
        const comprimento = parseInput(document.getElementById('comprimento').value);

        let volumeTubos = 0;

        document.querySelectorAll('.tubo-item').forEach(tubo => {
            const raio = parseInput(tubo.querySelector('.raio').value);
            const quantidade = parseInput(tubo.querySelector('.quantidade').value);
            const comprimentoTubo = parseInput(tubo.querySelector('.comprimento-tubo').value);

            volumeTubos += Math.PI * Math.pow(raio, 2) * comprimentoTubo * quantidade;
        });

        const volumeBanco = largura * altura * comprimento;
        const concretoNecessario = volumeBanco - volumeTubos;

        // Atualizar UI
        document.getElementById('volume-banco').textContent = volumeBanco.toFixed(2);
        document.getElementById('volume-tubos').textContent = volumeTubos.toFixed(2);
        document.getElementById('concreto').textContent = Math.max(concretoNecessario, 0).toFixed(2);

        salvarLocalmente();

    } catch (error) {
        console.error('Erro no cálculo:', error);
        alert('Erro nos dados inseridos! Verifique os valores.');
    }
}

// Sistema de Persistência
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

function carregarDados() {
    const savedData = localStorage.getItem('concreteCalcData');
    if (!savedData) return;

    try {
        const dados = JSON.parse(savedData);

        // Preencher campos principais
        document.getElementById('largura').value = dados.largura || '';
        document.getElementById('altura').value = dados.altura || '';
        document.getElementById('comprimento').value = dados.comprimento || '';

        // Preencher tubos salvos
        const tubosContainer = document.getElementById('tubos-container');
        tubosContainer.innerHTML = ''; // Limpar tubos existentes

        dados.tubos.forEach((tubo, index) => {
            const novoItem = document.createElement('div');
            novoItem.className = 'tubo-item';
            novoItem.innerHTML = `
                <h3>Tubo ${index + 1}</h3>
                <div class="input-group">
                    <label>Raio (m)</label>
                    <input type="number" class="raio" step="0.01" value="${tubo.raio || ''}" required>
                </div>
                <div class="input-group">
                    <label>Quantidade</label>
                    <input type="number" class="quantidade" min="1" value="${tubo.quantidade || 1}" required>
                </div>
                <div class="input-group">
                    <label>Comprimento (m)</label>
                    <input type="number" class="comprimento-tubo" step="0.01" value="${tubo.comprimento || ''}" required>
                </div>
            `;
            tubosContainer.appendChild(novoItem);
        });
        tuboCount = dados.tubos.length;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Inicialização
window.addEventListener('load', () => {
    carregarDados();
});