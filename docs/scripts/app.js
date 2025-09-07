const quizData = [
  {
    question: "پایتخت ایران کدام است؟",
    options: ["تهران", "مشهد", "اصفهان", "یزد"],
    correct: 1,
    score: 10,
  },
  {
    question: " بزرگترین قاره جهان کدام است؟",
    options: ["آفریقا", "آسیا", "آمریکا", "آروپا"],
    correct: 2,
    score: 10,
  },
  {
    question: " کدام کشور بیشترین جمعیت را دارد؟",
    options: ["روسیه", "چین", "آمریکا", "هند"],
    correct: 4,
    score: 10,
  },
  {
    question: "کدام سیاره به سیاره سرخ معروف است؟",
    options: ["زمین", "مشتری", "زهره", "مریخ"],
    correct: 4,
    score: 10,
  },
  {
    question: "رود نیل در کدام قاره قرار دارد؟",
    options: ["آسیا", "آروپا", "آفریقا", "آمریکا"],
    correct: 3,
    score: 10,
  },
  {
    question: "کدام حیوان به سریع ترین حیوان خشکی معروف است؟",
    options: ["اسب", "یوزپلنگ", "شیر", "ببر"],
    correct: 2,
    score: 10,
  },
  {
    question: "پایتخت کشور فرانسه کدام است؟",
    options: ["لندن", "پاریس", "رم", "مادرید"],
    correct: 2,
    score: 10,
  },
  {
    question: "کدام گاز بیشتر جو زمین را تشکیل میدهد؟",
    options: ["نیتروژن", "اکسیژن", "کربن دی اکسید", "هیدروژن"],
    correct: 1,
    score: 10,
  },
  {
    question: " بزرگترین جزیره جهان کدام است؟",
    options: ["نیوزیلند", "موریس", "هاوایی", "گرینلند"],
    correct: 4,
    score: 10,
  },
  {
    question: "کدام عنصر با نماد O شناخته می شود",
    options: ["کربن", "طلا", "اکسیژن", "هیدروژن"],
    correct: 3,
    score: 10,
  },
];

const questionWrapper = document.querySelector(".question");
const answerWrapper = document.querySelector(".answer-wrapper");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const quizPage = document.querySelector("#quiz-page");
const resultPage = document.querySelector("#result-page");
const returnToQuizBtb = document.querySelector("#return-to-quiz");
const finalScore = document.querySelector("#final-score");
const time = document.querySelector("#time");
let questionCounter = 0;
let scoreCounter = 0;
let userAnswers = [];

const saveState = () => {
  localStorage.setItem("questionCounter", questionCounter);
  localStorage.setItem("scoreCounter", scoreCounter);
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
};
const loadState = () => {
  const savedQuestion = localStorage.getItem("questionCounter");
  const savedScore = localStorage.getItem("scoreCounter");
  const savedAnswers = localStorage.getItem("userAnswers");

  if (savedQuestion !== null && savedScore !== null) {
    questionCounter = parseInt(savedQuestion);
    scoreCounter = parseInt(savedScore);
  }
  if (savedAnswers) {
    userAnswers = JSON.parse(savedAnswers);
  }
  ShowQuiz();
};
const ShowQuiz = () => {
  const currentQuestion = quizData[questionCounter];
  console.log(quizData, questionCounter);

  questionWrapper.innerHTML = currentQuestion.question;
  answerWrapper.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const isChecked =
      userAnswers[questionCounter] == index + 1 ? "checked" : "";
    answerWrapper.insertAdjacentHTML(
      "beforeend",
      `
        <label class="flex items-center gap-2 cursor-pointer text-xl">
              <input 
                data-index = "${index + 1}"
                type="radio" 
                name="color" 
                class="appearance-none outline-0 w-5 h-5 border-2 border-gray-400 rounded-full 
                       checked:border-orange-400 
                       relative 
                       checked:before:content-[''] checked:before:w-2 checked:before:h-2 
                       checked:before:bg-orange-400 checked:before:rounded-full 
                       checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 
                       checked:before:-translate-x-1/2 checked:before:-translate-y-1/2" ${isChecked}
              />
              ${option}
            </label>
      `
    );
  });
};
const nextQuestion = () => {
  const selected = document.querySelector(".answer-wrapper input:checked");
  if (selected) {
    const prevAnswer = userAnswers[questionCounter];
    const currentQuestion = quizData[questionCounter];
    const selectedIndex = parseInt(selected.dataset.index);
    if (prevAnswer == currentQuestion.correct && prevAnswer != selectedIndex) {
      scoreCounter -= currentQuestion.score;
    }
    if (
      selectedIndex == currentQuestion.correct &&
      prevAnswer != selectedIndex
    ) {
      scoreCounter += currentQuestion.score;
    }
    userAnswers[questionCounter] = selectedIndex;
    questionCounter++;
  } else {
    alert("لطفا حداقل یک گذینه انتخاب کنید");
  }

  saveState();
  if (questionCounter == quizData.length) {
    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    resultPage.classList.add("flex");
    finalScore.innerHTML = `نمره آزمون شما ${scoreCounter} از 100 میباشد`;
    return;
  }
  if (questionCounter == quizData.length - 1) {
    nextBtn.innerHTML = "اتمام آزمون";
  }
  ShowQuiz();
};
const prevQuestion = () => {
  if (questionCounter == 0) {
    return;
  } else {
    questionCounter--;
    saveState();
  }
  ShowQuiz();
};
const returnToQuiz = () => {
  questionCounter = 0;
  scoreCounter = 0;
  userAnswers = [];

  quizPage.classList.remove("hidden");
  resultPage.classList.add("hidden");
  nextBtn.innerHTML = "سوال بعدی";

  saveState();
  ShowQuiz();
};
const showTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, 0);
  const minutes = now.getMinutes().toString().padStart(2, 0);
  const seconds = now.getSeconds().toString().padStart(2, 0);

  time.innerHTML = `${hours}:${minutes}:${seconds}`;
};
setInterval(showTime, 1000);
nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", prevQuestion);
returnToQuizBtb.addEventListener("click", returnToQuiz);
window.addEventListener("load", () => {
  loadState();
  showTime();
});
