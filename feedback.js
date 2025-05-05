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

// Новый сценарий квиза для PeakFormIO
const quiz = [
  {
    id: "main",
    question: "Какова основная цель вашего обращения?",
    options: [
      { text: "🔹 Нужен сайт или лендинг", next: "site" },
      { text: "🔹 Хочу продвигать бизнес в соцсетях/рекламе", next: "ads" },
      {
        text: "🔹 Планирую продавать/продаю на маркетплейсах",
        next: "marketplace",
      },
    ],
  },
  // --- Блок "Разработка сайта" ---
  {
    id: "site",
    question: "У вас уже есть сайт?",
    options: [
      {
        text: "🔹 Да, но нужно доработать/обновить",
        result:
          "Мы проведем аудит и предложим решения для улучшения конверсии.",
        final: true,
      },
      { text: "🔹 Нет, нужен с нуля", next: "site-type" },
      {
        text: "🔹 Есть, ищу специалистов для продвижения",
        result: "Настроим SEO и рекламу для привлечения клиентов.",
        next: "ads",
      },
      {
        text: "🔹 Пока не нужен сайт",
        result: "Возможно, вам подойдет продвижение в соцсетях?",
        next: "ads",
      },
    ],
  },
  {
    id: "site-type",
    question: "Какой тип сайта вам нужен?",
    options: [
      {
        text: "🔹 Лендинг",
        result: "Создадим одностраничник с высокой конверсией под вашу ЦА",
        next: "site-tools",
      },
      {
        text: "🔹 Интернет-магазин",
        result: "Разработаем удобный каталог с интеграцией платежей и CRM.",
        next: "site-tools",
      },
      {
        text: "🔹 Корпоративный сайт",
        result: "Сделаем стильную визитку компании с SEO-оптимизацией.",
        next: "site-tools",
      },
      {
        text: "🔹 Другое",
        result: "Обсудим индивидуальный проект на бесплатной консультации.",
        comment: true,
        next: "site-tools",
      },
    ],
  },
  {
    id: "site-tools",
    question: "Нужны ли дополнительные инструменты?",
    options: [
      {
        text: "🔹 Да, хочу сразу подключить рекламу (SEO/таргет)",
        result: "Рекомендуем пакет: сайт + настройка рекламы",
        next: "site-budget",
      },
      { text: "🔹 Пока только сайт", next: "site-budget" },
    ],
  },
  {
    id: "site-budget",
    question: "Какой у вас бюджет?",
    options: [
      {
        text: "🔹 До 50 тыс. руб.",
        result: "Стартовые решения: лендинг или точечная реклама",
        next: "site-launch",
      },
      {
        text: "🔹 50–100 тыс. руб.",
        result: "Оптимальный пакет: сайт + реклама",
        next: "site-launch",
      },
      {
        text: "🔹 100+ тыс. руб.",
        result: "Комплексный digital-маркетинг",
        next: "site-launch",
      },
    ],
  },
  {
    id: "site-launch",
    question: "Когда планируете запуск?",
    options: [
      {
        text: "🔹 Срочно (1–2 недели)",
        result: "Предложим быстрые решения",
        final: true,
      },
      {
        text: "🔹 В течение месяца",
        result: "Разработаем стратегию",
        final: true,
      },
      {
        text: "🔹 Пока изучаю варианты",
        result: "Запишем на бесплатную консультацию",
        final: true,
      },
    ],
    finalMessage:
      "Хотите посмотреть примеры наших работ? [Кейсы] Или обсудить детали с менеджером? [Оставить заявку]",
  },
  // --- Блок "Реклама" ---
  {
    id: "ads",
    question: "Какие платформы вас интересуют?",
    options: [
      {
        text: "🔹 Instagram/Facebook",
        result: "Настроим таргет с точным попаданием в вашу ЦА.",
        next: "ads-site",
      },
      {
        text: "🔹 ВКонтакте",
        result: "Запустим рекламу в сообществах и таргет.",
        next: "ads-site",
      },
      {
        text: "🔹 TikTok",
        result: "Создадим вирусный контент + продвижение.",
        next: "ads-site",
      },
      {
        text: "🔹 Другое",
        result: "Поможем с Яндекс.Директ, Google Ads и др.",
        comment: true,
        next: "ads-site",
      },
    ],
  },
  {
    id: "ads-site",
    question: "Нужен ли сайт для рекламы?",
    options: [
      {
        text: "🔹 Да, у меня его нет",
        result: "Рекомендуем лендинг + рекламную кампанию",
        next: "ads-budget",
      },
      {
        text: "🔹 Есть, но он устарел",
        result: "Оптимизируем сайт + запустим рекламу",
        next: "ads-budget",
      },
      { text: "🔹 Нет, только реклама", next: "ads-budget" },
    ],
  },
  {
    id: "ads-budget",
    question: "Какой у вас бюджет на рекламу?",
    options: [
      {
        text: "🔹 До 30 тыс. руб.",
        result: "Рекомендуем точечный таргет или SEO.",
        next: "ads-launch",
      },
      {
        text: "🔹 30–100 тыс. руб.",
        result: "Запустим комплекс: креативы + A/B-тесты.",
        next: "ads-launch",
      },
      {
        text: "🔹 100+ тыс. руб.",
        result: "Разработаем стратегию на 3–6 месяцев.",
        next: "ads-launch",
      },
    ],
  },
  {
    id: "ads-launch",
    question: "Когда планируете запуск?",
    options: [
      {
        text: "🔹 Срочно (1–2 недели)",
        result: "Предложим быстрые решения",
        final: true,
      },
      {
        text: "🔹 В течение месяца",
        result: "Разработаем стратегию",
        final: true,
      },
      {
        text: "🔹 Пока изучаю варианты",
        result: "Запишем на бесплатную консультацию",
        final: true,
      },
    ],
    finalMessage:
      "Мы гарантируем прозрачную аналитику. Хотите разбор вашей ниши? [Заказать аудит]",
  },
  // --- Блок "Маркетплейсы" ---
  {
    id: "marketplace",
    question: "На каких площадках планируете продавать?",
    options: [
      {
        text: "🔹 Wildberries",
        result: "Поможем с карточками, логистикой и рекламой внутри WB.",
        next: "marketplace-problem",
      },
      {
        text: "🔹 Ozon",
        result: "Оптимизируем карточки и выведем в топ.",
        next: "marketplace-problem",
      },
      {
        text: "🔹 Яндекс.Маркет",
        result: "Настроим кампании с ROI-контролем.",
        next: "marketplace-problem",
      },
      { text: "🔹 Другое", comment: true, next: "marketplace-problem" },
    ],
  },
  {
    id: "marketplace-problem",
    question: "Что вас беспокоит в работе с маркетплейсами?",
    options: [
      {
        text: "🔹 Низкие продажи",
        result: "Проанализируем конкурентов и перезапустим карточки.",
        next: "marketplace-support",
      },
      {
        text: "🔹 Сложности с оформлением",
        result: "Возьмем на себя все технические моменты.",
        next: "marketplace-support",
      },
      {
        text: "🔹 Логистика",
        result: "Подключим проверенных поставщиков услуг.",
        next: "marketplace-support",
      },
    ],
  },
  {
    id: "marketplace-support",
    question: "Нужна ли дополнительная поддержка?",
    options: [
      {
        text: "🔹 Да, хочу рекламу внутри маркетплейса",
        result: "Пакет: карточки товаров + продвижение",
        next: "ads",
      },
      {
        text: "🔹 Да, нужен сайт для трафика",
        result: "Свяжем маркетплейс с вашим интернет-магазином",
        next: "site",
      },
      { text: "🔹 Только базовые услуги", next: "marketplace-budget" },
    ],
  },
  {
    id: "marketplace-budget",
    question: "Какой у вас бюджет?",
    options: [
      {
        text: "🔹 До 30 тыс. руб.",
        result: "Стартовые решения: карточки товаров и/или точечная реклама",
        next: "marketplace-launch",
      },
      {
        text: "🔹 30–100 тыс. руб.",
        result: "Оптимальный пакет: лендинг + реклама",
        next: "marketplace-launch",
      },
      {
        text: "🔹 100+ тыс. руб.",
        result: "Комплексный digital-маркетинг",
        next: "marketplace-launch",
      },
    ],
  },
  {
    id: "marketplace-launch",
    question: "Когда планируете запуск?",
    options: [
      {
        text: "🔹 Срочно (1–2 недели)",
        result: "Предложим быстрые решения",
        final: true,
      },
      {
        text: "🔹 В течение месяца",
        result: "Разработаем стратегию",
        final: true,
      },
      {
        text: "🔹 Пока изучаю варианты",
        result: "Запишем на бесплатную консультацию",
        final: true,
      },
    ],
    finalMessage:
      "Наши клиенты увеличивают продажи в 2–5 раз. Хотите так же? [Кейсы]",
  },
];

let currentId = "main";
let progressSteps = [];

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

// Квиз-бот
const chat = document.querySelector(".chat");
const startBtn = document.getElementById("startQuizBtn");
const welcomeText = document.querySelector(".welcome-text");
const progressBar = document.querySelector(".progress");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  document.querySelector(".quiz-start-btn").style.display = "none";
  chat.innerHTML = "";
  userAnswers = [];
  progressSteps = [];
  if (welcomeText) welcomeText.style.display = "none";
  currentId = "main";
  showQuestion(currentId);
}

function showQuestion(id) {
  const q = quiz.find((q) => q.id === id);
  if (!q) return;
  progressSteps.push(id);
  updateProgress();

  // Показ вопроса
  const questionElem = document.createElement("div");
  questionElem.classList.add("chat-message", "operator");
  questionElem.innerHTML = `
    <div class="message-container">
      <div class="operator-avatar"></div>
      <div class="message">${q.question}</div>
    </div>
    <div class="options">
      ${q.options
        .map(
          (opt, idx) =>
            `<button class="option" data-idx="${idx}">${opt.text}</button>`
        )
        .join("")}
    </div>
  `;
  chat.appendChild(questionElem);
  scrollChat();

  // Навешиваем обработчики на кнопки
  questionElem.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => handleAnswer(q, btn, btn.dataset.idx));
  });
}

function handleAnswer(q, btn, idx) {
  const option = q.options[idx];
  // Добавляем ответ пользователя в чат
  addUserMessage(option.text);
  // Если есть результат — показываем
  if (option.result) {
    addOperatorMessage(option.result);
  }
  // Если нужен комментарий
  if (option.comment) {
    askForComment(q, option);
    return;
  }
  // Если финал — показываем финальное сообщение
  if (option.final || q.finalMessage) {
    setTimeout(() => {
      if (q.finalMessage) addOperatorMessage(q.finalMessage);
    }, 800);
    return;
  }
  // Переход к следующему вопросу
  if (option.next) {
    setTimeout(() => showQuestion(option.next), 800);
  }
}

function askForComment(q, option) {
  // Показать поле для комментария
  const commentElem = document.createElement("div");
  commentElem.classList.add("chat-message", "user-answer");
  commentElem.innerHTML = `
    <div class="message-container">
      <div class="message">
        <input type="text" class="comment-input" placeholder="Ваш комментарий..." style="width:90%"> <button class="option send-comment">Отправить</button>
      </div>
    </div>
  `;
  chat.appendChild(commentElem);
  scrollChat();
  commentElem.querySelector(".send-comment").addEventListener("click", () => {
    const val = commentElem.querySelector(".comment-input").value.trim();
    if (val) {
      addUserMessage(val);
      if (option.next) setTimeout(() => showQuestion(option.next), 800);
    }
  });
}

function addUserMessage(text) {
  const userMsg = document.createElement("div");
  userMsg.classList.add("chat-message", "user-answer");
  userMsg.innerHTML = `
    <div class="message-container">
      <div class="message">${text}</div>
    </div>
  `;
  chat.appendChild(userMsg);
  scrollChat();
}

function addOperatorMessage(text) {
  const opMsg = document.createElement("div");
  opMsg.classList.add("chat-message", "operator");
  opMsg.innerHTML = `
    <div class="message-container">
      <div class="operator-avatar"></div>
      <div class="message">${text}</div>
    </div>
  `;
  chat.appendChild(opMsg);
  scrollChat();
}

function updateProgress() {
  if (!progressBar) return;
  const percent = Math.min((progressSteps.length / 7) * 100, 100); // 7 — примерное среднее число шагов
  progressBar.style.width = percent + "%";
}

function scrollChat() {
  const chatContainer = document.querySelector("main");
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
