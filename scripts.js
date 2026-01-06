// Função para criar corações
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = '❤️';
    heart.style.fontSize = `${(Math.random() * (6 - 2) + 2).toFixed(2)}rem`
    heart.style.left = Math.random() * 75 + 'dvw';
    heart.style.animationDuration = 2 + Math.random() * 3 + 's';
    document.querySelector('.hearts-container').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    },10000);
}

// Criar corações em intervalos regulares
setInterval(createHeart, 800);


document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');
    const surpriseButton = document.getElementById('surpriseButton');
    const fullMessage = "Oi, meu amor!\nTudo bem?\nTenho uma surpresinha pra você...\nEspero que goste! ❤️";
    let currentIndex = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    messageElement.appendChild(cursor);

    surpriseButton.style.display = 'none';

    // Função para o cursor piscar
    function blinkCursor() {
        cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible';
    }

    // Digitação com cursor
    function typeWriter() {
        if (currentIndex < fullMessage.length) {
            cursor.style.visibility = 'visible'; // Garante que o cursor apareça durante a digitação
            const currentChar = fullMessage.charAt(currentIndex);
            if (currentChar === '\n') {
                cursor.insertAdjacentHTML('beforebegin', '<br>'); // Converte quebra de linha para <br>
            } else {
                cursor.insertAdjacentHTML('beforebegin', currentChar === ' ' ? '&nbsp;' : currentChar); // Converte espaçamentos
            }
            currentIndex++;
            setTimeout(typeWriter, 50); // Ajuste a velocidade conforme necessário
        } else {
            cursor.style.visibility = 'hidden';
            surpriseButton.style.display = 'inline'; // Esconde o cursor ao final
            surpriseButton.classList.add('show');
        }
    }

    // Início com o cursor piscando por 3 segundos
    let blinkInterval = setInterval(blinkCursor, 500);
    setTimeout(() => {
        clearInterval(blinkInterval);
        cursor.style.visibility = 'visible'; // Garante que o cursor esteja visível no início da digitação
        typeWriter();
    }, 3000);

    surpriseButton.addEventListener('click', function () {
        this.innerText = 'EU TE AMO';
        this.classList.remove('show');
        this.classList.add('animate-expand');

        setTimeout(() => {
            document.getElementById('intro').style.display = 'none';
            document.querySelector('.hearts-container').style.display = 'flex';
            document.getElementById('mainContent').style.display = 'flex';
        }, 1500);
    });
});



// Carrossel de Imagens e Deslizar

const carrossel = document.querySelector('.carrossel');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let index = 0;
let autoSlideInterval;
let isDragging = false;
let startX = 0;

// Função para atualizar o slide visível
function updateSlidePosition() {
    carrossel.style.transform = `translateX(${-index * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Função para o próximo slide
function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlidePosition();
}

// Função para o slide anterior
function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlidePosition();
}

// Função para ir para um slide específico
function currentSlide(n) {
    index = n;
    updateSlidePosition();
    resetAutoSlide();
}

// Inicia o temporizador de alternância automática
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Reinicia o temporizador de alternância automática
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Eventos de arrastar para toque e mouse
function handleStart(event) {
    isDragging = true;
    startX = event.touches ? event.touches[0].clientX : event.clientX;
    resetAutoSlide(); // Reinicia o temporizador ao iniciar o arrasto
}

function handleMove(event) {
    if (!isDragging) return;

    const moveX = event.touches ? event.touches[0].clientX : event.clientX;
    const diffX = startX - moveX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        isDragging = false; // Evita múltiplas transições no mesmo movimento
    }
}

function handleEnd() {
    isDragging = false;
}

// Adiciona os eventos para toque e mouse
carrossel.addEventListener('mousedown', handleStart);
carrossel.addEventListener('mousemove', handleMove);
carrossel.addEventListener('mouseup', handleEnd);
carrossel.addEventListener('mouseleave', handleEnd);

carrossel.addEventListener('touchstart', handleStart);
carrossel.addEventListener('touchmove', handleMove);
carrossel.addEventListener('touchend', handleEnd);

// Inicializa o carrossel
updateSlidePosition();
startAutoSlide(); // Inicia a alternância automática

let dynamicDate = '2025-08-20T00:00:00';

// Função para alterar o texto e a data
// function alterarTextoDescricao() {
//     const enfase = document.querySelector("#enfase-text");

//     if (enfase.classList.contains("acidente")) {
//         enfase.classList.remove("acidente");
//         enfase.classList.add("intencional");

//         enfase.innerText = '"EU TE AMO"';
//         dynamicDate = '2025-02-01T10:33:00'; // Atualiza a data
//     } else {
//         enfase.classList.remove("intencional");
//         enfase.classList.add("acidente");

//         enfase.innerText = '"Porque EU TE AMO"';
//         dynamicDate = '2025-01-19T03:50:00'; // Atualiza a data
//     }

//     // Atualiza imediatamente os valores exibidos
//     atualizarTempoDecorrido(dynamicDate);
// }

// Atualiza o tempo decorrido
function atualizarTempoDecorrido(stringData) {
    const dataInicio = new Date(stringData);
    const agora = new Date();
    const diferenca = agora - dataInicio;

    if (diferenca <= 0) {
        document.getElementById('dias').innerText = "0";
        document.getElementById('horas').innerText = "0";
        document.getElementById('minutos').innerText = "0";
        document.getElementById('segundos').innerText = "0";
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById('dias').innerText = dias;
    document.getElementById('horas').innerText = horas;
    document.getElementById('minutos').innerText = minutos;
    document.getElementById('segundos').innerText = segundos;
}

// Adicionar evento para alterar o texto e a data (apenas "click" para toque rápido e cliques)
// document.querySelector("#enfase-text").addEventListener("click", alterarTextoDescricao);

// Atualiza o tempo decorrido a cada segundo
setInterval(() => atualizarTempoDecorrido(dynamicDate), 1000);
