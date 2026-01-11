// Database Storage System using localStorage
class SocialStatsDB {
    constructor() {
        this.dbName = 'shamser_social_stats';
        this.initDB();
    }

    initDB() {
        if (!localStorage.getItem(this.dbName)) {
            const initialData = {
                subscribers: 1542,
                subscribersList: [],
                articleStats: {
                    'article1': { views: 1234, likes: 125, shares: 34, userLikes: [] },
                    'article2': { views: 987, likes: 98, shares: 21, userLikes: [] },
                    'article3': { views: 2109, likes: 210, shares: 45, userLikes: [] }
                }
            };
            localStorage.setItem(this.dbName, JSON.stringify(initialData));
        }
    }

    getDB() {
        return JSON.parse(localStorage.getItem(this.dbName));
    }

    saveDB(data) {
        localStorage.setItem(this.dbName, JSON.stringify(data));
    }

    incrementViews(articleId) {
        const db = this.getDB();
        if (db.articleStats[articleId]) {
            db.articleStats[articleId].views++;
            this.saveDB(db);
        }
        return db.articleStats[articleId]?.views || 0;
    }

    toggleLike(articleId, userId) {
        const db = this.getDB();
        const article = db.articleStats[articleId];
        
        if (article) {
            const userIndex = article.userLikes.indexOf(userId);
            
            if (userIndex === -1) {
                article.userLikes.push(userId);
                article.likes++;
            } else {
                article.userLikes.splice(userIndex, 1);
                article.likes--;
            }
            
            this.saveDB(db);
            return {
                likes: article.likes,
                isLiked: userIndex === -1
            };
        }
        return null;
    }

    incrementShares(articleId) {
        const db = this.getDB();
        if (db.articleStats[articleId]) {
            db.articleStats[articleId].shares++;
            this.saveDB(db);
        }
        return db.articleStats[articleId]?.shares || 0;
    }

    addSubscriber(userId) {
        const db = this.getDB();
        if (!db.subscribersList.includes(userId)) {
            db.subscribersList.push(userId);
            db.subscribers = db.subscribersList.length;
            this.saveDB(db);
            return true;
        }
        return false;
    }

    getSubscriberCount() {
        const db = this.getDB();
        return db.subscribers;
    }

    getArticleStats(articleId) {
        const db = this.getDB();
        return db.articleStats[articleId] || { views: 0, likes: 0, shares: 0 };
    }
}

// Initialize database
const socialDB = new SocialStatsDB();

// Generate unique user ID
function getUserId() {
    let userId = localStorage.getItem('shamser_user_id');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('shamser_user_id', userId);
    }
    return userId;
}

const userId = getUserId();

// Quiz Questions
const quizData = [
    {
        q: "What is the full form of CPU?",
        options: [
            "Computer Processing Unit",
            "Central Processing Unit",
            "Central Process Unit",
            "Computer Process Unit"
        ],
        answer: 1
    },
    {
        q: "Which of these is not an operating system?",
        options: [
            "Windows",
            "Linux",
            "Photoshop",
            "macOS"
        ],
        answer: 2
    },
    {
        q: "RAM stands for:",
        options: [
            "Random Access Memory",
            "Read Access Memory",
            "Random Available Memory",
            "Read Available Memory"
        ],
        answer: 0
    },
    {
        q: "Which programming language is used for web development?",
        options: [
            "Python",
            "Java",
            "HTML",
            "C++"
        ],
        answer: 2
    },
    {
        q: "What does URL stand for?",
        options: [
            "Uniform Resource Locator",
            "Universal Resource Locator",
            "Uniform Resource Link",
            "Universal Resource Link"
        ],
        answer: 0
    }
];

// Quiz variables
let currentQuizQuestion = 0;
let quizScore = 0;
let userQuizAnswers = Array(quizData.length).fill(null);
let quizTimer;
let timeLeft = 300;

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();
    
    initializePostStats();
    initializeQuiz();
    updateNepaliDateTime();
    updateTimeAgo();
    initializeWidgets();
    initializeTranslator();
    
    setInterval(updateNepaliDateTime, 1000);
    setInterval(updateTimeAgo, 60000);
    
    const navbar = document.querySelector('.main-nav');
    const navOffsetTop = navbar.offsetTop;
    
    function handleScroll() {
        if (window.scrollY > navOffsetTop) {
            navbar.classList.add('fixed-navbar');
        } else {
            navbar.classList.remove('fixed-navbar');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    const carousel = new bootstrap.Carousel(document.getElementById('headerCarousel'), {
        interval: 5000,
        wrap: true,
        pause: 'hover'
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    document.getElementById('demoModal').addEventListener('shown.bs.modal', function () {
        const softwareCarousel = new bootstrap.Carousel(document.getElementById('softwareCarousel'));
    });
});

// Nepali Date and Time Function
function updateNepaliDateTime() {
    const nepaliMonths = [
        "बैशाख", "जेठ", "असार", "श्रावण", "भदौ", "असोज",
        "कार्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत"
    ];
    
    const nepaliDays = [
        "आइतबार", "सोमबार", "मंगलबार", "बुधबार", 
        "बिहिबार", "शुक्रबार", "शनिबार"
    ];
    
    const now = new Date();
    
    const nepaliDate = {
        year: 2080,
        month: 9,
        day: 26,
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds(),
        dayOfWeek: now.getDay()
    };
    
    let hour = nepaliDate.hour;
    let ampm = hour >= 12 ? "अपरान्ह" : "पूर्वान्ह";
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;
    
    const minute = String(nepaliDate.minute).padStart(2, '0');
    const second = String(nepaliDate.second).padStart(2, '0');
    
    const nepaliDateTimeStr = 
        `${nepaliMonths[nepaliDate.month - 1]} ${nepaliDate.day} गते ` +
        `${nepaliDays[nepaliDate.dayOfWeek]} ${ampm} ${hour}बजे ` +
        `${minute} मिनेट ${second} सेकेण्ड`;
    
    document.getElementById('nepaliDateTime').textContent = nepaliDateTimeStr;
}

// Time Ago Function
function updateTimeAgo() {
    const timeAgoElements = document.querySelectorAll('.time-ago');
    timeAgoElements.forEach(element => {
        const timeString = element.getAttribute('data-time');
        const time = new Date(timeString);
        const now = new Date();
        const diffMs = now - time;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffMins < 1) {
            element.textContent = 'भर्खरै';
        } else if (diffMins < 60) {
            element.textContent = `${diffMins} मिनेट अघि`;
        } else if (diffHours < 24) {
            element.textContent = `${diffHours} घण्टा अघि`;
        } else {
            element.textContent = `${diffDays} दिन अघि`;
        }
    });
}

// Initialize Widgets
function initializeWidgets() {
    // Initialize both widget containers
    document.querySelectorAll('.widgets-container').forEach(container => {
        const tabs = container.querySelectorAll('.widget-tab');
        const widgets = container.querySelectorAll('.widget');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs in this container
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all widgets in this container
                widgets.forEach(widget => widget.classList.remove('active'));
                
                // Show selected widget
                const widgetId = this.getAttribute('data-widget') + '-widget';
                const targetWidget = container.querySelector(`#${widgetId}`);
                if (targetWidget) {
                    targetWidget.classList.add('active');
                }
            });
        });
    });
}

// Enhanced Number Converter
function convertNumber() {
    const numberInput = document.getElementById('numberInput').value;
    const numberResult = document.getElementById('numberResult');
    
    if (!numberInput) {
        numberResult.textContent = "कृपया संख्या प्रविष्ट गर्नुहोस्!";
        return;
    }
    
    const number = parseInt(numberInput);
    
    if (isNaN(number)) {
        numberResult.textContent = "कृपया वैध संख्या प्रविष्ट गर्नुहोस्!";
        return;
    }
    
    const nepaliNumbers = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    
    const nepaliNumber = number.toString().split('').map(digit => {
        return nepaliNumbers[parseInt(digit)] || digit;
    }).join('');
    
    numberResult.innerHTML = `
        <strong>अङ्कमा:</strong> ${number}<br>
        <strong>नेपाली अङ्कमा:</strong> ${nepaliNumber}<br>
        <strong>शब्दमा:</strong> ${convertNumberToWords(number)}
    `;
}

// Convert number to Nepali words
function convertNumberToWords(num) {
    const ones = ["", "एक", "दुई", "तीन", "चार", "पाँच", "छ", "सात", "आठ", "नौ", "दश"];
    const teens = ["", "एघार", "बाह्र", "तेह्र", "चौध", "पन्ध्र", "सोह्र", "सत्र", "अठार", "उन्नाइस"];
    const tens = ["", "दश", "बीस", "तीस", "चालीस", "पचास", "साठी", "सत्तरी", "असी", "नब्बे"];
    
    if (num < 11) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) {
        const ten = Math.floor(num / 10);
        const one = num % 10;
        return tens[ten] + (one ? " " + ones[one] : "");
    }
    if (num < 1000) {
        const hundred = Math.floor(num / 100);
        const remainder = num % 100;
        return ones[hundred] + " सय" + (remainder ? " " + convertNumberToWords(remainder) : "");
    }
    if (num < 100000) {
        const thousand = Math.floor(num / 1000);
        const remainder = num % 1000;
        return convertNumberToWords(thousand) + " हजार" + (remainder ? " " + convertNumberToWords(remainder) : "");
    }
    if (num < 10000000) {
        const lakh = Math.floor(num / 100000);
        const remainder = num % 100000;
        return convertNumberToWords(lakh) + " लाख" + (remainder ? " " + convertNumberToWords(remainder) : "");
    }
    return "धेरै ठूलो संख्या";
}

// Radio Player
function playRadio(streamUrl) {
    const audioPlayer = document.getElementById('radioPlayer');
    audioPlayer.src = streamUrl;
    audioPlayer.play()
        .then(() => console.log("Radio is playing"))
        .catch(e => console.error("Error playing radio:", e));
}

function playModalRadio(streamUrl) {
    const audioPlayer = document.getElementById('modalRadioPlayer');
    audioPlayer.src = streamUrl;
    audioPlayer.play()
        .then(() => console.log("Modal Radio is playing"))
        .catch(e => console.error("Error playing modal radio:", e));
}

// Translator Functions
function initializeTranslator() {
    const translateBtn = document.querySelector('#translator-widget .btn-primary');
    if (translateBtn) {
        translateBtn.onclick = translateText;
    }
}

// Google Translate API
async function translateText() {
    const englishText = document.getElementById('englishText').value;
    const translationResult = document.getElementById('translationResult');
    
    if (!englishText.trim()) {
        translationResult.textContent = "कृपया अङ्ग्रेजी टेक्स्ट प्रविष्ट गर्नुहोस्!";
        return;
    }
    
    translationResult.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div><p>अनुवाद गर्दै...</p></div>';
    
    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ne&dt=t&q=${encodeURIComponent(englishText)}`);
        const data = await response.json();
        
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            const translatedText = data[0][0][0];
            translationResult.innerHTML = `
                <div class="translation-result">
                    <h6>अनुवाद परिणाम:</h6>
                    <div class="p-3 bg-white rounded border">${translatedText}</div>
                    <div class="mt-2">
                        <button class="btn btn-sm btn-outline-secondary" onclick="copyTranslation()">
                            <i class="fas fa-copy"></i> प्रतिलिपि गर्नुहोस्
                        </button>
                        <button class="btn btn-sm btn-outline-primary ms-2" onclick="speakTranslation()">
                            <i class="fas fa-volume-up"></i> सुन्नुहोस्
                        </button>
                    </div>
                </div>
            `;
        } else {
            translationResult.textContent = "अनुवाद गर्न असफल भयो। कृपया पुनः प्रयास गर्नुहोस्।";
        }
    } catch (error) {
        console.error("Translation error:", error);
        translationResult.textContent = "अनुवाद सेवा अस्थायी रूपमा अनुपलब्ध छ।";
        
        const simpleTranslations = {
            "hello": "नमस्ते",
            "education": "शिक्षा",
            "teacher": "शिक्षक",
            "student": "विद्यार्थी",
            "school": "विद्यालय",
            "book": "किताब",
            "exam": "परीक्षा",
            "result": "नतिजा",
            "good": "राम्रो",
            "morning": "बिहान",
            "evening": "साँझ",
            "thank you": "धन्यवाद",
            "welcome": "स्वागत छ",
            "computer": "कम्प्युटर",
            "internet": "इन्टरनेट",
            "mobile": "मोबाइल",
            "website": "वेबसाइट",
            "news": "समाचार"
        };
        
        let translatedText = englishText;
        for (const [english, nepali] of Object.entries(simpleTranslations)) {
            translatedText = translatedText.replace(new RegExp(english, 'gi'), nepali);
        }
        translationResult.innerHTML = `<div class="p-3 bg-white rounded border">${translatedText}</div>`;
    }
}

function copyTranslation() {
    const translationText = document.querySelector('#translationResult .bg-white').textContent;
    navigator.clipboard.writeText(translationText)
        .then(() => showNotification("अनुवाद प्रतिलिपि गरियो!"))
        .catch(err => console.error("Copy failed:", err));
}

function speakTranslation() {
    const translationText = document.querySelector('#translationResult .bg-white').textContent;
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(translationText);
        speech.lang = 'ne-NP';
        window.speechSynthesis.speak(speech);
    } else {
        showNotification("वॉइस सेवा उपलब्ध छैन");
    }
}

// Like/Share Functionality
function initializePostStats() {
    for (let i = 1; i <= 3; i++) {
        const articleId = `article${i}`;
        
        const articleStats = socialDB.getArticleStats(articleId);
        
        document.getElementById(`viewCount${i}`).textContent = articleStats.views.toLocaleString('ne-NP');
        document.getElementById(`likeCount${i}`).textContent = articleStats.likes.toLocaleString('ne-NP');
        
        const userViewedKey = `${articleId}_viewed_${userId}`;
        if (!localStorage.getItem(userViewedKey)) {
            socialDB.incrementViews(articleId);
            localStorage.setItem(userViewedKey, 'true');
        }
        
        const userLikedKey = `${articleId}_liked_${userId}`;
        const isLiked = localStorage.getItem(userLikedKey) === 'true';
        if (isLiked) {
            document.getElementById(`likeBtn${i}`).classList.add('liked');
        }
        
        document.getElementById(`likeBtn${i}`).addEventListener("click", () => {
            const result = socialDB.toggleLike(articleId, userId);
            if (result) {
                document.getElementById(`likeCount${i}`).textContent = result.likes.toLocaleString('ne-NP');
                
                if (result.isLiked) {
                    document.getElementById(`likeBtn${i}`).classList.add("liked");
                    localStorage.setItem(userLikedKey, 'true');
                    showNotification('धन्यवाद! तपाईंले यो समाचार मनपराउनुभयो।');
                } else {
                    document.getElementById(`likeBtn${i}`).classList.remove("liked");
                    localStorage.removeItem(userLikedKey);
                }
            }
        });
        
        document.getElementById(`shareBtn${i}`).addEventListener("click", async () => {
            const shareData = {
                title: document.querySelector(`#news-section .news-with-small-image:nth-child(${i}) .news-with-small-image-title`).textContent,
                text: "shamser.info.np बाट यो समाचार हेर्नुहोस्!",
                url: window.location.href + `#article${i}`
            };
            
            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                    socialDB.incrementShares(articleId);
                    const updatedStats = socialDB.getArticleStats(articleId);
                    document.getElementById(`likeCount${i}`).textContent = updatedStats.likes.toLocaleString('ne-NP');
                    showNotification('धन्यवाद! तपाईंले यो समाचार सेयर गर्नुभयो।');
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                navigator.clipboard.writeText(shareData.url);
                showNotification('लिंक क्लिपबोर्डमा प्रतिलिपि गरियो! ✅');
                socialDB.incrementShares(articleId);
            }
        });
    }
    
    initializeSubscribeButton();
}

// Subscribe Button
function initializeSubscribeButton() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const status = document.getElementById('statusText');
    const counter = document.getElementById('counter');
    const badge = document.getElementById('badge');
    
    const subscriberCount = socialDB.getSubscriberCount();
    counter.textContent = subscriberCount.toLocaleString('ne-NP');
    
    const userSubscribedKey = `subscribed_${userId}`;
    const isSubscribed = localStorage.getItem(userSubscribedKey) === 'true';
    
    if (isSubscribed) {
        subscribeBtn.disabled = true;
        subscribeBtn.innerHTML = '<span class="bell-icon">🔔</span> <span>सदस्यता लिइसकेको</span>';
        if (subscriberCount > 0) {
            badge.style.display = 'flex';
            badge.textContent = subscriberCount > 9 ? '9+' : subscriberCount;
        }
        status.textContent = 'सदस्यता लिनुभएकोमा धन्यवाद!';
    }
    
    subscribeBtn.addEventListener('click', () => {
        if (socialDB.addSubscriber(userId)) {
            localStorage.setItem(userSubscribedKey, 'true');
            subscribeBtn.disabled = true;
            subscribeBtn.innerHTML = '<span class="bell-icon">🔔</span> <span>सदस्यता लिइसकेको</span>';
            
            const newCount = socialDB.getSubscriberCount();
            counter.textContent = newCount.toLocaleString('ne-NP');
            
            badge.style.display = 'flex';
            badge.textContent = newCount > 9 ? '9+' : newCount;
            status.textContent = 'सदस्यता लिनुभएकोमा धन्यवाद!';
            
            showNotification('धन्यवाद! तपाईंले सदस्यता लिनुभयो।');
        }
    });
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed notification';
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Quiz Functions
function initializeQuiz() {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentQuizQuestion = progress.currentQuestion || 0;
        quizScore = progress.score || 0;
        userQuizAnswers = progress.answers || Array(quizData.length).fill(null);
    }
    
    displayQuiz();
}

function displayQuiz() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";
    
    const questionsToShow = quizData.slice(0, 3);
    
    questionsToShow.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question-card mb-4 p-3";
        questionDiv.innerHTML = `
            <h6 class="mb-3">प्रश्न ${index + 1}: ${q.q}</h6>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="question${index}" value="${i}" 
                               ${userQuizAnswers[index] === i ? 'checked' : ''}
                               onclick="saveAnswer(${index}, ${i})">
                        <label class="form-check-label">${opt}</label>
                    </div>
                `).join('')}
            </div>
        `;
        quizDiv.appendChild(questionDiv);
    });
}

function saveAnswer(questionIndex, answerIndex) {
    userQuizAnswers[questionIndex] = answerIndex;
    
    const progress = {
        currentQuestion: currentQuizQuestion,
        score: quizScore,
        answers: userQuizAnswers
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
}

function displayModalQuiz() {
    const quizDiv = document.getElementById("modalQuiz");
    const question = quizData[currentQuizQuestion];
    
    quizDiv.innerHTML = `
        <div class="question-card p-4 border rounded">
            <h5>प्रश्न ${currentQuizQuestion + 1}/${quizData.length}: ${question.q}</h5>
            ${question.options.map((opt, i) => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="modalQuestion" value="${i}" 
                           ${userQuizAnswers[currentQuizQuestion] === i ? 'checked' : ''}
                           onclick="saveModalAnswer(${i})">
                    <label class="form-check-label">${opt}</label>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('currentQuestion').textContent = currentQuizQuestion + 1;
    document.getElementById('totalQuestions').textContent = quizData.length;
    
    const progressPercent = ((currentQuizQuestion + 1) / quizData.length) * 100;
    document.getElementById('quizProgress').style.width = `${progressPercent}%`;
    
    document.getElementById('prevBtn').disabled = currentQuizQuestion === 0;
    document.getElementById('nextBtn').style.display = currentQuizQuestion < quizData.length - 1 ? 'block' : 'none';
    document.getElementById('submitQuizBtn').style.display = currentQuizQuestion === quizData.length - 1 ? 'block' : 'none';
}

function saveModalAnswer(answerIndex) {
    userQuizAnswers[currentQuizQuestion] = answerIndex;
    
    const progress = {
        currentQuestion: currentQuizQuestion,
        score: quizScore,
        answers: userQuizAnswers
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
}

function nextQuestion() {
    if (currentQuizQuestion < quizData.length - 1) {
        currentQuizQuestion++;
        displayModalQuiz();
    }
}

function prevQuestion() {
    if (currentQuizQuestion > 0) {
        currentQuizQuestion--;
        displayModalQuiz();
    }
}

function startQuizTimer() {
    clearInterval(quizTimer);
    timeLeft = 300;
    
    quizTimer = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('quizTimer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const progressPercent = (timeLeft / 300) * 100;
        document.getElementById('quizProgress').style.width = `${progressPercent}%`;
        
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            submitModalQuiz();
            showNotification("समय सकियो! क्विज स्वतः सबमिट गरियो।");
        }
    }, 1000);
}

function submitModalQuiz() {
    clearInterval(quizTimer);
    
    quizScore = 0;
    quizData.forEach((q, index) => {
        if (userQuizAnswers[index] === q.answer) {
            quizScore++;
        }
    });
    
    const percentage = Math.round((quizScore / quizData.length) * 100);
    
    document.getElementById('modalQuiz').style.display = 'none';
    document.getElementById('modalQuizResult').style.display = 'block';
    document.getElementById('modalScore').textContent = quizScore;
    document.getElementById('modalCorrect').textContent = `${quizScore}/${quizData.length}`;
    document.getElementById('modalPercentage').textContent = `${percentage}%`;
    
    let message = '';
    if (percentage >= 80) {
        message = 'अत्युत्तम! तपाईं कम्प्युटर विशेषज्ञ हुनुहुन्छ! 🏆';
    } else if (percentage >= 60) {
        message = 'राम्रो! तपाईंसँग कम्प्युटरको राम्रो ज्ञान छ। 👍';
    } else if (percentage >= 40) {
        message = 'साधारण! थप अभ्यास गर्नुहोस्। 📚';
    } else {
        message = 'कमजोर! कम्प्युटर बारे थप सिक्नुहोस्। 💻';
    }
    
    document.getElementById('modalMessage').innerHTML = `
        <div class="alert ${percentage >= 60 ? 'alert-success' : 'alert-warning'}">
            <h5>${message}</h5>
        </div>
    `;
}

function resetModalQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    userQuizAnswers = Array(quizData.length).fill(null);
    localStorage.removeItem('quizProgress');
    
    document.getElementById('modalQuizResult').style.display = 'none';
    document.getElementById('modalQuiz').style.display = 'block';
    
    displayModalQuiz();
    startQuizTimer();
}

function shareQuizResult() {
    const percentage = Math.round((quizScore / quizData.length) * 100);
    const shareText = `मैले shamser.info.np मा कम्प्युटर क्विज खेलेर ${quizScore}/${quizData.length} (${percentage}%) स्कोर गरेँ! तपाईं पनि प्रयास गर्नुहोस्: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'कम्प्युटर क्विज परिणाम',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText);
        showNotification('परिणाम प्रतिलिपि गरियो! सेयर गर्नुहोस्।');
    }
}

function downloadCertificate() {
    const percentage = Math.round((quizScore / quizData.length) * 100);
    const certificateText = `
        प्रमाणपत्र
        shamser.info.np
        ------------------------
        नाम: उपयोगकर्ता
        स्कोर: ${quizScore}/${quizData.length}
        प्रतिशत: ${percentage}%
        मिति: ${new Date().toLocaleDateString('ne-NP')}
        ------------------------
        यो प्रमाणपत्रले कम्प्युटर ज्ञानको परीक्षणमा सफलताको प्रमाणित गर्दछ।
    `;
    
    const blob = new Blob([certificateText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'computer-quiz-certificate.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('प्रमाणपत्र डाउनलोड हुँदैछ...');
}

// Software purchase functions
function purchaseSoftware(plan, amount) {
    const confirmation = confirm(`तपाईं ${plan} को प्याकेज (रु ${amount}) खरिद गर्न चाहनुहुन्छ?`);
    if (confirmation) {
        showNotification(`रु ${amount} को भुक्तानीको लागि eSewa QR कोड देखाइएको छ।`);
    }
}

function requestTrial() {
    showNotification("ट्रायल अनुरोध प्राप्त भयो। तपाईंको ईमेलमा ट्रायल लाइसेन्स पठाइनेछ।");
}

function downloadTrialVersion() {
    showNotification("ट्रायल संस्करण डाउनलोड सुरु भयो।");
}

// Unicode Converter
function convertToUnicode() {
    const preetiText = document.getElementById('preetiText').value;
    const unicodeResult = document.getElementById('unicodeResult');
    
    if (!preetiText) {
        unicodeResult.textContent = "कृपया प्रीटी टेक्स्ट प्रविष्ट गर्नुहोस्!";
        return;
    }
    
    const conversions = {
        "laal": "लाल",
        "Namaste": "नमस्ते",
        "Nepal": "नेपाल",
        "kasto": "कस्तो",
        "cha": "छ",
        "hajur": "हजुर",
        "ma": "म",
        "timro": "तिम्रो",
        "naam": "नाम",
        "ke": "के",
        "ho": "हो",
        "shiksha": "शिक्षा",
        "vidhyarthi": "विद्यार्थी",
        "shikshak": "शिक्षक"
    };
    
    let convertedText = preetiText;
    for (const [preeti, unicode] of Object.entries(conversions)) {
        convertedText = convertedText.replace(new RegExp(preeti, 'gi'), unicode);
    }
    
    unicodeResult.textContent = convertedText || "रूपान्तरण परिणाम यहाँ देखिने";
}

function convertModalToUnicode() {
    const preetiText = document.getElementById('modalPreetiText').value;
    const unicodeResult = document.getElementById('modalUnicodeResult');
    
    if (!preetiText) {
        unicodeResult.textContent = "कृपया प्रीटी फोन्ट प्रविष्ट गर्नुहोस्!";
        return;
    }
    
    const conversions = {
        "laal": "लाल",
        "Namaste": "नमस्ते",
        "Nepal": "नेपाल",
        "kasto": "कस्तो",
        "cha": "छ",
        "hajur": "हजुर",
        "ma": "म",
        "timro": "तिम्रो",
        "naam": "नाम",
        "ke": "के",
        "ho": "हो",
        "shiksha": "शिक्षा",
        "vidhyarthi": "विद्यार्थी",
        "shikshak": "शिक्षक"
    };
    
    let convertedText = preetiText;
    for (const [preeti, unicode] of Object.entries(conversions)) {
        convertedText = convertedText.replace(new RegExp(preeti, 'gi'), unicode);
    }
    
    unicodeResult.textContent = convertedText || "रूपान्तरण परिणाम यहाँ देखिने";
}





// UPDATED JavaScript - fix modal issues

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components first
    initializePostStats();
    initializeQuiz();
    updateNepaliDateTime();
    updateTimeAgo();
    initializeWidgets();
    initializeTranslator();
    
    // Show welcome modal with delay (after everything is initialized)
    setTimeout(() => {
        const welcomeModalElement = document.getElementById('welcomeModal');
        if (welcomeModalElement) {
            const welcomeModal = new bootstrap.Modal(welcomeModalElement, {
                backdrop: 'static',
                keyboard: false
            });
            welcomeModal.show();
        }
    }, 1000);
    
    // Update time every second
    setInterval(updateNepaliDateTime, 1000);
    setInterval(updateTimeAgo, 60000);
    
    // Make navbar sticky
    const navbar = document.querySelector('.main-nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky-top');
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.classList.remove('sticky-top');
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize carousel
    const carouselElement = document.getElementById('headerCarousel');
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            wrap: true,
            pause: 'hover',
            ride: 'carousel'
        });
    }
    
    // Initialize all modals
    initializeModals();
});

// Initialize all Bootstrap modals
function initializeModals() {
    const modalElements = document.querySelectorAll('.modal');
    modalElements.forEach(modalEl => {
        // Initialize each modal
        new bootstrap.Modal(modalEl);
    });
}

// Tour function
function showTour() {
    const welcomeModal = bootstrap.Modal.getInstance(document.getElementById('welcomeModal'));
    if (welcomeModal) {
        welcomeModal.hide();
    }
    
    showNotification("Welcome to shamser.info.np! Let's explore the site...");
    
    // Scroll to features section
    setTimeout(() => {
        const featuresSection = document.getElementById('news-section');
        if (featuresSection) {
            window.scrollTo({
                top: featuresSection.offsetTop - 100,
                behavior: 'smooth'
            });
            showNotification("This is our news section with latest educational updates!");
        }
    }, 1000);
}


