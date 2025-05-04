// Вопросы для квиза обратной связи
const questions = [
  {
    text: "Вопрос 1",
    options: ["Ответ 1", "Ответ 2", "Ответ 3"],
  },
];

let currentQuestion = 0;
let totalQuestions = questions.length;
let userAnswers = [];

// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Установка цвета фона в соответствии с темой Telegram
document.body.style.backgroundColor = tg.themeParams.bg_color || "#ECECE7";
document.body.style.color = tg.themeParams.text_color || "#00171F";

// Бургер-меню
const burgerMenu = document.querySelector(".burger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Обработчик кнопки "Начать опрос"
document.getElementById("startQuizBtn").addEventListener("click", startQuiz);

function startQuiz() {
  document.querySelector(".quiz-start-btn").style.display = "none";
  const chat = document.querySelector(".chat");
  chat.innerHTML = "";
  userAnswers = [];

  setTimeout(() => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("chat-message", "operator");
    questionElement.innerHTML = `
            <div class="message-container">
                <div class="operator-avatar">
                    <img src="./Image/avatar.gif" alt="avatar">
                </div>
                <div class="message">${questions[0].text}</div>
            </div>
            <div class="options">
                ${questions[0].options
                  .map(
                    (option) =>
                      `<button class="option" onclick="nextQuestion(1, '${option}')">${option}</button>`
                  )
                  .join("")}
            </div>
        `;
    chat.appendChild(questionElement);

    // Скролл вниз
    const chatContainer = document.querySelector("main");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 1000);
}

function nextQuestion(questionNumber, userAnswer) {
  if (questionNumber !== currentQuestion + 1) {
    console.log(
      `Несоответствие номеров вопросов: текущий ${
        currentQuestion + 1
      }, пришел ${questionNumber}`
    );
    return;
  }

  // Скрываем текст приветствия после ответа на первый вопрос
  if (currentQuestion === 0) {
    document.querySelector(".welcome-text").style.display = "none";
  }

  // Сохраняем ответ пользователя
  userAnswers.push(userAnswer);

  const chatContainer = document.querySelector("main");

  // Добавляем ответ пользователя в чат
  const userAnswerMessage = document.createElement("div");
  userAnswerMessage.classList.add("chat-message", "user-answer");
  userAnswerMessage.innerHTML = `
        <div class="message-container">
            <div class="message">${userAnswer}</div>
        </div>
    `;
  document.querySelector(".chat").appendChild(userAnswerMessage);

  // Показываем "печатает..."
  const typingMessage = document.createElement("div");
  typingMessage.classList.add("chat-message", "operator");
  typingMessage.innerHTML = `
        <div class="message-container">
            <div class="operator-avatar">
                <img src="./Image/avatar.gif" alt="avatar">
            </div>
            <div class="message typing">
                Оператор печатает<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
            </div>
        </div>
    `;
  document.querySelector(".chat").appendChild(typingMessage);

  // Обновляем прогресс-бар
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;
  document.querySelector(".progress").style.width = `${progressPercent}%`;

  // Скролл вниз
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    typingMessage.remove();

    // Показываем сообщение об окончании опроса
    const endMessage = document.createElement("div");
    endMessage.classList.add("chat-message", "operator");
    endMessage.innerHTML = `
            <div class="message-container">
                <div class="operator-avatar">
                    <img src="./Image/avatar.gif" alt="avatar">
                </div>
                <div class="message">
                    Спасибо за ответы! Мы свяжемся с Вами в ближайшее время.
                </div>
            </div>
        `;
    document.querySelector(".chat").appendChild(endMessage);

    // Скролл вниз
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 1500);

  currentQuestion++;
}
