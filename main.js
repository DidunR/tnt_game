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
const showResult = document.querySelector(".result");
const container = document.querySelector(".container");
const inrtoduction = document.querySelector(".introduction");
const restartGameBtn = document.querySelector(".restart_game_button");





// const recordName = document.querySelector(".result_table");

// Отримуємо посилання на таблицю та тіло таблиці
const recordsTable = document.querySelector(".result_table");
const recordsTableBody = recordsTable.querySelector("tbody");

// Отримуємо значення поля вводу
const inputElement = document.querySelector(".input");
const nameValue = inputElement.value;
console.log(nameValue);

// Знаходимо колонку з іменами та зберігаємо в неї значення поля вводу
const nameColumnCells = recordsTableBody.querySelectorAll("td:nth-child(2)");
nameColumnCells.forEach((cell) => {
    if (cell.innerHTML === "") {
        cell.innerHTML = nameValue;
        return;
    };
});




// Задаємо початкові значення змінних
let timeLeft = 30; // Задаємо початковий час
let deminingCode = generateDeminingCode(); // Генеруємо випадкове шестизначне число
let timerId;
let enteredCode = "";

//функція перемикання початкового екрану та старту гри
function startGame() {
    const nameInput = document.querySelector(".input");
    const name = nameInput.value;

    if (name.trim() !== "") { // Перевіряємо, чи input містить дані
        inrtoduction.style.display = "none";
        container.style.display = "block";
        enteredCode = "";
        setEnteredCodeSpan.innerText = "";
        setEnteredCodeSpan.style.color = "white";
        // Запускаємо таймер 
        timeLeft = 30;
        setTimeSpan.innerText = timeLeft;
        clearInterval(timerId);
        timerId = setInterval(countdown, 1000);
        clockSound.play();
    } else {
        nameInput.classList.add('error');
        setTimeout(() => {
            nameInput.classList.remove('error');
        }, 2000);
    };
};

// створюємо цикл для генерації 10 чисел
for (let i = 0; i < 10; i++) {
    // створюємо div для кожного числа
    const numberDiv = document.createElement("div");
    numberDiv.classList.add("number");
    numberDiv.innerText = i;
    // задаємо випадкову початкову позицію і швидкість для кожного числа
    const startPosition = Math.random() * 55;
    const speed = Math.random() * 6 + 3;
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
    numbersDiv.appendChild(numberDiv);
};

// Додаємо обробники подій
resetButton.addEventListener("click", resetGame);
defuseButton.addEventListener("click", checkCode);
switchPage.addEventListener("click", startGame);
restartGame.addEventListener('click', restartFunction);
restartGameBtn.addEventListener('click', restartFunction);

// Виводимо випадкове шестизначне число на екран
setDeminingCodeSpan.innerText = deminingCode;

// функція перезапуску гри
function restartFunction() {
    inrtoduction.style.display = "flex";
    container.style.display = "none";
    showResult.style.display = "none";
    modal.style.display = "none";
};

// Функція для обнулення параметрів гри
function resetGame() {
    enteredCode = "";
    setEnteredCodeSpan.innerText = "";
    deminingCode = generateDeminingCode();
    setDeminingCodeSpan.innerText = deminingCode;
    setEnteredCodeSpan.style.color = "white";
    soundReset.play();
};

// Функція для перевірки введеного коду
function checkCode() {
    if (setEnteredCodeSpan.innerText === deminingCode.toString()) {
        clearInterval(timerId);

        console.log(setTimeSpan.innerText);

        clockSound.pause();
        correctAnswer.play();
        setEnteredCodeSpan.style.color = "darkgreen";
        container.style.display = "none";
        showResult.style.display = "flex";
    } else {
        setEnteredCodeSpan.style.color = "red";
        wrongAnswer.play();
    };
};

// Функція запуку таймера
function countdown() {
    timeLeft--;
    setTimeSpan.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerId);
        modal.style.display = 'block';
        audioBomb.play();
    };
};

// Функція генерації випадкового шестизначного числа
function generateDeminingCode() {
    return Math.floor(Math.random() * 900000 + 100000);
};

