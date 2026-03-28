// ==================== GLOBAL VARIABLES ====================
let currentWidget = null;
let currentQuestion = 0;
let userAnswers = [];
let slideIndex = 0;

// ==================== QUIZ DATA ====================
const quizData = [
  {
    question: "CPU को पूरा रूप के हो?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Unit",
      "Computer Processing Unit",
    ],
    correct: 0,
  },
  {
    question: "कुन अपरेटिङ सिस्टम होइन?",
    options: ["Windows", "Linux", "Photoshop", "macOS"],
    correct: 2,
  },
  {
    question: "RAM को पूरा रूप के हो?",
    options: [
      "Random Access Memory",
      "Read Access Memory",
      "Random Available Memory",
      "Read Available Memory",
    ],
    correct: 0,
  },
  {
    question: "URL को पूरा रूप के हो?",
    options: [
      "Uniform Resource Locator",
      "Universal Resource Locator",
      "Uniform Resource Link",
      "Universal Resource Link",
    ],
    correct: 0,
  },
  {
    question: "HTML को पूरा रूप के हो?",
    options: [
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyper Transfer Markup Language",
      "High Transfer Markup Language",
    ],
    correct: 0,
  },
];

// ==================== STUDENT DATA ====================
const studentData = [
  { symbol: "1001", class: "10", year: "2081", term: "1", dob: "2008-05-10", name: "राम शर्मा", gpa: "3.50", result: "PASS", percentage: "85%" },
  { symbol: "1002", class: "10", year: "2081", term: "1", dob: "2008-09-12", name: "सीता गुरुङ", gpa: "3.85", result: "PASS", percentage: "92%" },
];

// ==================== WIDGET ====================
function showWidget(id) {
  const container = document.getElementById("widget-container");
  if (!container) return;

  if (currentWidget === id) {
    container.style.display = container.style.display === "block" ? "none" : "block";
    return;
  }

  container.style.display = "block";
  document.querySelectorAll(".widget").forEach(w => w.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
  currentWidget = id;
}

// ==================== QUIZ ====================
function loadQuiz() {
  currentQuestion = 0;
  userAnswers = new Array(quizData.length).fill(null);
  displayQuestion();
}

function displayQuestion() {
  const q = quizData[currentQuestion];
  const area = document.getElementById("quizArea");
  if (!area) return;

  area.innerHTML = `
    <h5>प्रश्न ${currentQuestion + 1}/${quizData.length}</h5>
    <p>${q.question}</p>
    ${q.options.map((opt, i) => `
      <div>
        <input type="radio" name="q" ${userAnswers[currentQuestion] === i ? "checked" : ""} 
        onchange="userAnswers[${currentQuestion}] = ${i}">
        ${opt}
      </div>
    `).join("")}
  `;
}

function nextQuestion() {
  if (userAnswers[currentQuestion] === null) return alert("उत्तर दिनुहोस्");
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    displayQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  }
}

function submitQuiz() {
  if (userAnswers.includes(null)) return alert("सबै प्रश्नको उत्तर दिनुहोस्");

  let score = 0;
  quizData.forEach((q, i) => {
    if (q.correct === userAnswers[i]) score++;
  });

  const percent = (score / quizData.length) * 100;
  document.getElementById("quizResult").innerHTML =
    `Score: ${score}/${quizData.length} (${percent}%)`;

  // Save result
  localStorage.setItem("lastScore", percent);
}

// ==================== RESULT SEARCH ====================
function searchResult() {
  const symbol = document.getElementById("symbol").value;
  const dob = document.getElementById("dob").value;

  const student = studentData.find(s => s.symbol === symbol && s.dob === dob);
  const resultDiv = document.getElementById("result");

  if (student) {
    resultDiv.innerHTML = `
      <h5>${student.name}</h5>
      <p>GPA: ${student.gpa}</p>
      <p>Percentage: ${student.percentage}</p>
    `;
  } else {
    resultDiv.innerHTML = "Result not found";
  }
}

// ==================== CAROUSEL ====================
function carousel() {
  const slides = document.querySelectorAll(".mySlides");
  if (!slides.length) return;

  slides.forEach(s => s.style.display = "none");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.display = "block";

  setTimeout(carousel, 5000);
}

// ==================== COPY ====================
function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert("Copied!"))
    .catch(() => alert("Copy failed"));
}

// ==================== SUBSCRIPTION ====================
function subscribe() {
  const name = document.getElementById("name").value;
  alert(`Thank you ${name}`);
}

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", () => {
  carousel();

  // Auto load quiz when modal open (optional)
  const quizBtn = document.getElementById("startQuiz");
  if (quizBtn) quizBtn.addEventListener("click", loadQuiz);
});







