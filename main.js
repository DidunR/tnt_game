// Отримуємо посилання на необхідні елементи з DOM
const numbersDiv = document.querySelector(".numbers");
const setTimeSpan = document.querySelector(".set_time");
const setDeminingCodeSpan = document.querySelector(".set_demining_code");
const setEnteredCodeSpan = document.querySelector(".set_entered_code");
const resetButton = document.querySelector(".reset");
const defuseButton = document.querySelector(".defuse");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const restartGame = document.querySelector(".modal");
const clockSound = document.querySelector(".clock_sound");
const audioBomb = document.querySelector(".bomb_explosion");
const correctAnswer = document.querySelector(".correct_answer");
const wrongAnswer = document.querySelector(".wrong_answer");
const soundReset = document.querySelector(".sound_reset");
const switchPage = document.querySelector(".start_game_button");
const numberSound = document.querySelector(".num_sound");
const showResult = document.querySelector(".result");
const container = document.querySelector(".container");
const inrtoduction = document.querySelector(".introduction");
const restartGameBtn = document.querySelector(".restart_game_button");


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
        deminingCode = generateDeminingCode();
        setDeminingCodeSpan.innerText = deminingCode;
        // Запускаємо таймер 
        timeLeft = 30;
        setTimeSpan.innerText = timeLeft;
        clearInterval(timerId);
        timerId = setInterval(countdown, 1000);
        clockSound.play();
    } else {
        nameInput.classList.add("error");
        setTimeout(() => {
            nameInput.classList.remove("error");
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
        numberSound.play();
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
restartGame.addEventListener("click", restartFunction);
restartGameBtn.addEventListener("click", restartFunction);

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
        const nameInput = document.querySelector(".input");
        const name = nameInput.value;
        addRecord(name, (30 - setTimeSpan.innerText));
        clockSound.pause();
        correctAnswer.play();
        showRecords();
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
        modal.style.display = "block";
        audioBomb.play();
    };
};

// Функція генерації випадкового шестизначного числа
function generateDeminingCode() {
    return Math.floor(Math.random() * 900000 + 100000);
};

//якщо є то витягує інфу якщо ні то створює новий масив
const recordTable = JSON.parse(localStorage.getItem("records")) || [];

// додати нову запис до масиву
function addRecord(name, time) {
    // додати нову запис
    recordTable.push({ name: name, time: time });
    // сортувати масив за показником часу
    recordTable.sort((a, b) => a.time - b.time);
    // якщо масив більше 5 елементів, обрізати його
    if (recordTable.length > 5) {
        recordTable.splice(5, recordTable.length - 5);
    };
    localStorage.setItem("records", JSON.stringify(recordTable));
};


//Функція запису результатів в таблицю
function showRecords() {
    const table = document.querySelector(".result_table");
    table.innerHTML = "";
    const tableHead = `<li class="li li_head"><div>Place</div><div>Name</div><div>Time</div></li>`;
    const records = JSON.parse(localStorage.getItem("records"));
    const tableHtml = records.reduce((sum, el, index) => {
        return sum += `<li class="li"><div>${index + 1}</div><div>${el.name}</div><div>${el.time} s</div></li>`
    }, tableHead);
    table.innerHTML = tableHtml;
}
