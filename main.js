// Отримуємо посилання на необхідні елементи з DOM
const numbersDiv = document.querySelector(".numbers");
const setTimeSpan = document.querySelector(".set_time");
const setDeminingCodeSpan = document.querySelector(".set_demining_code");
const setEnteredCodeSpan = document.querySelector(".set_entered_code");
const resetButton = document.querySelector(".reset");
const defuseButton = document.querySelector(".defuse");

const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const restartGame = document.querySelector(".modal");


const clockSound = document.querySelector(".clock_sound");
const audioBomb = document.querySelector(".bomb_explosion");
const correctAnswer = document.querySelector(".correct_answer");
const wrongAnswer = document.querySelector(".wrong_answer");
const soundReset = document.querySelector(".sound_reset");

const switchPage = document.querySelector(".start_game_button");

switchPage.addEventListener("click", startGame);

//функція перемикання початкового екрану та старту гри
function startGame() {
    const container = document.querySelector(".container");
    const inrtoduction = document.querySelector(".introduction");
    inrtoduction.style.display = "none";
    container.style.display = "block";
    // Запускаємо таймер 
    timerId = setInterval(countdown, 1000);
    clockSound.play();
}

// Задаємо початкові значення змінних
let timeLeft = 30; // Задаємо початковий час
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
    const startPosition = Math.random() * 55;
    const speed = Math.random() * 6 + 3;

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
restartGame.addEventListener('click', function () {
    location.reload();
});

// Функція для перезапуску гри
function resetGame() {
    enteredCode = "";
    setEnteredCodeSpan.innerText = "";
    deminingCode = generateDeminingCode();
    setDeminingCodeSpan.innerText = deminingCode;
    setEnteredCodeSpan.style.color = "white";
    soundReset.play();
    // timeLeft = 10;
    // setTimeSpan.innerText = timeLeft;
    // clearInterval(timerId);
    // timerId = setInterval(countdown, 1000);
}



// Функція для перевірки введеного коду
function checkCode() {
    if (setEnteredCodeSpan.innerText === deminingCode.toString()) {
        clearInterval(timerId);
        clockSound.pause();
        correctAnswer.play();
        setEnteredCodeSpan.style.color = "darkgreen";
        // alert("You defused the bomb!");
    } else {
        setEnteredCodeSpan.style.color = "red";
        wrongAnswer.play();
        // alert("You failed to defuse the bomb!");
    }
    // resetGame();
}



// Функція для таймера
function countdown() {
    timeLeft--;
    setTimeSpan.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerId);
        modal.style.display = 'block';
        audioBomb.play();
        // resetGame();
    }
}


// Функція генерації випадкового шестизначного числа
function generateDeminingCode() {
    return Math.floor(Math.random() * 900000 + 100000);
}



// Виводимо випадкове шестизначне число на екран
setDeminingCodeSpan.innerText = deminingCode;






