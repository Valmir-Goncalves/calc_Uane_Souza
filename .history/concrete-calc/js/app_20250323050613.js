function adicionarTubo() {
    const tubosContainer = document.getElementById('tubos-container');
    const tuboCount = tubosContainer.querySelectorAll('.tubo-item').length + 1;

    const novoTubo = document.createElement('div');
    novoTubo.classList.add('tubo-item');
    novoTubo.innerHTML = `
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

    tubosContainer.appendChild(novoTubo);
}

function calcular() {
    const largura = parseFloat(document.getElementById('largura').value) || 0;
    const altura = parseFloat(document.getElementById('altura').value) || 0;
    const comprimento = parseFloat(document.getElementById('comprimento').value) || 0;

    const volumeBanco = largura * altura * comprimento;
    let volumeTubos = 0;

    const tubos = document.querySelectorAll('.tubo-item');
    tubos.forEach(tubo => {
        const raio = parseFloat(tubo.querySelector('.raio').value) || 0;
        const quantidade = parseInt(tubo.querySelector('.quantidade').value) || 0;
        const comprimentoTubo = parseFloat(tubo.querySelector('.comprimento-tubo').value) || 0;

        volumeTubos += Math.PI * Math.pow(raio, 2) * comprimentoTubo * quantidade;
    });

    const concretoNecessario = volumeBanco - volumeTubos;

    document.getElementById('volume-banco').textContent = volumeBanco.toFixed(2);
    document.getElementById('volume-tubos').textContent = volumeTubos.toFixed(2);
    document.getElementById('concreto').textContent = concretoNecessario.toFixed(2);
}

