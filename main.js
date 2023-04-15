// Отримуємо посилання на необхідні елементи з DOM
const numbersDiv = document.querySelector(".numbers");
const setTimeSpan = document.querySelector(".set_time");
const setDeminingCodeSpan = document.querySelector(".set_demining_code");
const setEnteredCodeSpan = document.querySelector(".set_entered_code");
const resetButton = document.querySelector(".reset");
const defuseButton = document.querySelector(".defuse");

const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');


// Задаємо початкові значення змінних
let timeLeft = 10; // Задаємо початковий час
let deminingCode = generateDeminingCode(); // Генеруємо випадкове шестизначне число
let timerId;
let enteredCode = "";


// створюємо цикл для генерації 10 чисел
for (let i = 0; i < 10; i++) {
    // створюємо div для кожного числа
    const numberDiv = document.createElement("div");
    numberDiv.classList.add("number");
    numberDiv.innerText = i;

    // задаємо випадкову початкову позицію і швидкість для кожного числа
    const startPosition = Math.random() * 60;
    const speed = Math.random() * 9 + 10;

    // const visibilityRadius = Math.random() * 20 + 10;

    // додаємо стилі для початкової позиції та швидкості руху
    numberDiv.style.top = `${startPosition}%`;
    numberDiv.style.animationDuration = `${speed}s`;

    numberDiv.addEventListener("click", () => {
        setEnteredCodeSpan.innerText += i;
    });

    // додаємо обробник події для зміни курсора
    numberDiv.addEventListener("mouseenter", () => {
        document.body.style.cursor = "pointer";
    });

    // додаємо обробник події для повернення курсора до його початкового стану
    numberDiv.addEventListener("mouseleave", () => {
        document.body.style.cursor = "auto";
    });

    // додаємо стилі для області видимості
    // numberDiv.style.setProperty("--visibility-radius", `${visibilityRadius}px`);

    // додаємо div з числом до div з класом "numbers"
    numbersDiv.appendChild(numberDiv);
};


// Додаємо обробники подій
resetButton.addEventListener("click", resetGame);
defuseButton.addEventListener("click", checkCode);

// Функція для перезапуску гри
function resetGame() {
    enteredCode = "";
    setEnteredCodeSpan.innerText = "";
    deminingCode = generateDeminingCode();
    setDeminingCodeSpan.innerText = deminingCode;
    timeLeft = 30;
    setTimeSpan.innerText = timeLeft;
    clearInterval(timerId);
    timerId = setInterval(countdown, 1000);
}

// Функція для перевірки введеного коду
function checkCode() {
    if (setEnteredCodeSpan.innerText === deminingCode.toString()) {
        clearInterval(timerId);
        alert("You defused the bomb!");
    } else {
        alert("You failed to defuse the bomb!");
    }
    resetGame();
}




// Функція для таймера
function countdown() {
    timeLeft--;
    setTimeSpan.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerId);
        modal.style.display = 'block';
        resetGame();
    }
}


// Функція генерації випадкового шестизначного числа
function generateDeminingCode() {
    return Math.floor(Math.random() * 900000 + 100000);
}

// Запускаємо таймер
timerId = setInterval(countdown, 1000);

// Виводимо випадкове шестизначне число на екран
setDeminingCodeSpan.innerText = deminingCode;


const restartGame = document.querySelector(".modal");
restartGame.addEventListener('click', function () {
    location.reload();
    console.log("Hello");
});