// Função para avançar para a próxima etapa
function nextStep() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    iniciarSimulacao();
}

// Função para iniciar a simulação
function iniciarSimulacao() {
    var video = document.getElementById('video-simulacao');
    video.currentTime = 0; // Iniciar o vídeo do começo
    video.play();
    video.addEventListener('timeupdate', verificarTempo);
    video.addEventListener('play', prevenirTelaCheia, false);
}

// Prevenir comportamento de tela cheia em dispositivos móveis
function prevenirTelaCheia() {
    this.controls = false; // Remover controles para prevenir pausa manual
    this.removeEventListener('play', prevenirTelaCheia, false); // Remove a escuta para não repetir
}

// Função para verificar o tempo do vídeo
function verificarTempo() {
    var video = document.getElementById('video-simulacao');
    if (video.currentTime >= 11) {
        video.pause();
        document.getElementById('botoes-simulacao').style.display = 'block';
    }
}

// Função para ação de compra
function acaoCompra() {
    var video = document.getElementById('video-simulacao');
    document.getElementById('botoes-simulacao').style.display = 'none';
    video.removeEventListener('timeupdate', verificarTempo);
    video.play();
    video.addEventListener('ended', function() {
        mostrarResultado(false); // Passar 'false' indicando que a compra está errada
    });
}

// Função para ação de venda
function acaoVenda() {
    var video = document.getElementById('video-simulacao');
    document.getElementById('botoes-simulacao').style.display = 'none';
    video.removeEventListener('timeupdate', verificarTempo);
    video.play();
    video.addEventListener('ended', function() {
        mostrarResultado(true); // Passar 'true' indicando que a venda está correta
    });
}

// Função para mostrar o resultado
function mostrarResultado(acertou) {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';

    var resultTitle = document.getElementById('result-title');
    var resultMessage = document.getElementById('result-message');

    if (acertou) {
        resultTitle.innerText = 'Parabéns! Você acertou! 🎉';
        resultMessage.innerText = 'Você acertou a previsão e está no caminho certo para dominar o mercado financeiro! 🎯 Aproveite esta oportunidade para aprofundar ainda mais seus conhecimentos com nosso ebook exclusivo, que oferece estratégias comprovadas como no exemplo do grafico anterior e insights valiosos. E o melhor de tudo, você pode adquiri-lo com 50% de desconto! Não perca essa chance de transformar sua abordagem financeira. 🚀📈';

        var checkoutButton = document.createElement('button');
        checkoutButton.className = 'button';
        checkoutButton.innerText = 'Comprar Ebook com 50% de Desconto 📚';
        checkoutButton.onclick = function() {
            window.location.href = 'https://pay.hotmart.com/I94197589W?off=gp4zz0x4';
        };
        document.getElementById('step3').appendChild(checkoutButton);

        lancarConfetes();
    } else {
        resultTitle.innerText = 'Infelizmente, você errou. 😢';
        resultMessage.innerText = 'Sua decisão de compra não foi a melhor. Tente novamente e analise melhor os gráficos!';

        var retryButton = document.createElement('button');
        retryButton.className = 'button';
        retryButton.innerText = 'Tentar Novamente 🔄';
        retryButton.onclick = reset;
        document.getElementById('step3').appendChild(retryButton);
    }
}

// Função para lançar confetes
function lancarConfetes() {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Função para reiniciar o processo
function reset() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    document.getElementById('result-title').innerText = '';
    document.getElementById('result-message').innerText = '';
    
    // Remover botões adicionais de step3
    var step3 = document.getElementById('step3');
    while (step3.lastChild.tagName === 'BUTTON') {
        step3.removeChild(step3.lastChild);
    }
}
