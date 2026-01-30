/* ============================================
   CONFIGURATION PERSONNALISABLE
   ============================================ */

const CONFIG = {
    // QUESTIONS DU QUIZ - Personnalisez ici
    questions: [
        {
            icon: "💐",
            question: "Quelle est ma fleur préférée ?",
            answers: [
                { text: "Les roses rouges", correct: true },
                { text: "Les tulipes", correct: false },
                { text: "Les marguerites", correct: false },
                { text: "Les orchidées", correct: false }
            ]
        },
        {
            icon: "🎬",
            question: "Quel est notre film romantique préféré que nous avons regardé ensemble ?",
            answers: [
                { text: "Titanic", correct: false },
                { text: "The Notebook", correct: true },
                { text: "La La Land", correct: false },
                { text: "Pride & Prejudice", correct: false }
            ]
        },
        {
            icon: "🍕",
            question: "Quel est mon plat préféré ?",
            answers: [
                { text: "Pâtes carbonara", correct: false },
                { text: "Sushi", correct: false },
                { text: "Pizza margherita", correct: true },
                { text: "Burger frites", correct: false }
            ]
        },
        {
            icon: "🎵",
            question: "Quelle chanson était en fond lors de notre premier baiser ?",
            answers: [
                { text: "Perfect - Ed Sheeran", correct: true },
                { text: "All of Me - John Legend", correct: false },
                { text: "Thinking Out Loud - Ed Sheeran", correct: false },
                { text: "A Thousand Years - Christina Perri", correct: false }
            ]
        },
        {
            icon: "🌍",
            question: "Quelle est ma destination de voyage de rêve ?",
            answers: [
                { text: "Paris, France", correct: false },
                { text: "Bali, Indonésie", correct: false },
                { text: "Santorini, Grèce", correct: true },
                { text: "New York, USA", correct: false }
            ]
        },
        {
            icon: "☕",
            question: "Comment j'aime mon café ?",
            answers: [
                { text: "Noir sans sucre", correct: false },
                { text: "Avec du lait et deux sucres", correct: true },
                { text: "Cappuccino", correct: false },
                { text: "Je ne bois pas de café", correct: false }
            ]
        },
        {
            icon: "📚",
            question: "Quel est mon livre préféré ?",
            answers: [
                { text: "Pride and Prejudice", correct: false },
                { text: "The Great Gatsby", correct: false },
                { text: "Me Before You", correct: true },
                { text: "The Fault in Our Stars", correct: false }
            ]
        },
        {
            icon: "🎨",
            question: "Quelle est ma couleur préférée ?",
            answers: [
                { text: "Rose", correct: true },
                { text: "Bleu", correct: false },
                { text: "Violet", correct: false },
                { text: "Vert", correct: false }
            ]
        },
        {
            icon: "⏰",
            question: "À quelle heure préfères-tu que nous nous réveillions le week-end ?",
            answers: [
                { text: "6h - Tôt pour profiter", correct: false },
                { text: "8h - Raisonnable", correct: false },
                { text: "10h - Grasse matinée", correct: true },
                { text: "Midi - Maximum détente", correct: false }
            ]
        },
        {
            icon: "💕",
            question: "Qu'est-ce que je préfère que tu fasses pour me montrer ton amour ?",
            answers: [
                { text: "Des mots doux", correct: false },
                { text: "Des câlins spontanés", correct: true },
                { text: "Des cadeaux surprises", correct: false },
                { text: "Des moments de qualité ensemble", correct: false }
            ]
        }
    ],
    
    // MESSAGES DE RÉSULTATS selon le score
    resultMessages: [
        {
            minScore: 0,
            maxScore: 3,
            icon: "😅",
            title: "On Peut Mieux Faire !",
            message: "On dirait qu'il nous reste encore beaucoup à découvrir l'un sur l'autre ! Mais c'est ça qui rend notre histoire excitante. Chaque jour est une nouvelle découverte de qui nous sommes vraiment. Je t'aime quand même ! 💕"
        },
        {
            minScore: 4,
            maxScore: 6,
            icon: "😊",
            title: "Pas Mal du Tout !",
            message: "Tu me connais plutôt bien ! On a déjà créé de beaux souvenirs ensemble et tu as retenu l'essentiel. Notre complicité grandit chaque jour et j'adore ça ! Continuons à nous découvrir davantage. 💖"
        },
        {
            minScore: 7,
            maxScore: 8,
            icon: "🥰",
            title: "Très Bien !",
            message: "Wow ! Tu me connais vraiment bien ! Tu fais attention aux petits détails qui comptent. Notre connexion est forte et cela se voit. Je suis chanceux(se) de t'avoir dans ma vie ! 💗"
        },
        {
            minScore: 9,
            maxScore: 10,
            icon: "😍",
            title: "Score Parfait !",
            message: "Incroyable ! Tu es mon âme sœur ! Tu connais chaque détail de ce qui me rend heureux(se). Notre amour est profond, sincère et magnifique. Tu es la personne parfaite pour moi et je t'aime infiniment ! 💝✨"
        }
    ],
    
    // Messages de feedback pendant le quiz
    correctFeedback: [
        "Exact ! 🎉",
        "Bravo ! 💖",
        "Parfait ! ✨",
        "Tu me connais bien ! 😍",
        "C'est ça ! 💕"
    ],
    
    incorrectFeedback: [
        "Oups, pas tout à fait ! 😅",
        "Ce n'est pas ça, mais je t'aime quand même ! 💗",
        "Presque ! Continue ! 😊",
        "On en reparlera ! 😉"
    ]
};

/* ============================================
   VARIABLES GLOBALES
   ============================================ */

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = [];

/* ============================================
   INITIALISATION
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateQuestionCount();
    
    const startBtn = document.getElementById('startBtn');
    const retryBtn = document.getElementById('retryBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    
    if (retryBtn) {
        retryBtn.addEventListener('click', resetQuiz);
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
}

/* ============================================
   DÉMARRAGE DU QUIZ
   ============================================ */

function startQuiz() {
    const startScreen = document.getElementById('startScreen');
    const quizScreen = document.getElementById('quizScreen');
    
    if (startScreen) startScreen.classList.add('hidden');
    if (quizScreen) quizScreen.classList.add('active');
    
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = [];
    
    loadQuestion();
}

/* ============================================
   CHARGEMENT D'UNE QUESTION
   ============================================ */

function loadQuestion() {
    if (currentQuestionIndex >= CONFIG.questions.length) {
        showResults();
        return;
    }
    
    const question = CONFIG.questions[currentQuestionIndex];
    
    // Mettre à jour l'icône de la question
    const questionIcon = document.getElementById('questionIcon');
    if (questionIcon) {
        questionIcon.textContent = question.icon;
    }
    
    // Mettre à jour le texte de la question
    const questionText = document.getElementById('questionText');
    if (questionText) {
        questionText.textContent = question.question;
    }
    
    // Générer les réponses
    generateAnswers(question.answers);
    
    // Mettre à jour la progression
    updateProgress();
    
    // Nettoyer le feedback
    const feedbackMessage = document.getElementById('feedbackMessage');
    if (feedbackMessage) {
        feedbackMessage.classList.remove('show', 'correct', 'incorrect');
        feedbackMessage.textContent = '';
    }
}

/* ============================================
   GÉNÉRATION DES RÉPONSES
   ============================================ */

function generateAnswers(answers) {
    const answersArea = document.getElementById('answersArea');
    if (!answersArea) return;
    
    answersArea.innerHTML = '';
    
    answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.setAttribute('data-correct', answer.correct);
        button.setAttribute('data-index', index);
        
        button.addEventListener('click', function() {
            handleAnswer(this);
        });
        
        answersArea.appendChild(button);
    });
}

/* ============================================
   GESTION DE LA RÉPONSE
   ============================================ */

function handleAnswer(button) {
    const isCorrect = button.getAttribute('data-correct') === 'true';
    const feedbackMessage = document.getElementById('feedbackMessage');
    const allButtons = document.querySelectorAll('.answer-btn');
    
    // Désactiver tous les boutons
    allButtons.forEach(btn => btn.classList.add('disabled'));
    
    // Marquer la réponse
    if (isCorrect) {
        button.classList.add('correct');
        score++;
        
        if (feedbackMessage) {
            feedbackMessage.textContent = getRandomFeedback(CONFIG.correctFeedback);
            feedbackMessage.classList.add('show', 'correct');
        }
        
        // Vibration courte si disponible
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    } else {
        button.classList.add('incorrect');
        
        // Montrer la bonne réponse
        allButtons.forEach(btn => {
            if (btn.getAttribute('data-correct') === 'true') {
                btn.classList.add('correct');
            }
        });
        
        if (feedbackMessage) {
            feedbackMessage.textContent = getRandomFeedback(CONFIG.incorrectFeedback);
            feedbackMessage.classList.add('show', 'incorrect');
        }
        
        // Vibration double si disponible
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }
    
    // Sauvegarder la réponse
    answeredQuestions.push({
        questionIndex: currentQuestionIndex,
        correct: isCorrect
    });
    
    // Passer à la question suivante après un délai
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

/* ============================================
   MISE À JOUR DE LA PROGRESSION
   ============================================ */

function updateProgress() {
    const currentQuestion = document.getElementById('currentQuestion');
    const totalQuestions = document.getElementById('totalQuestions');
    const progressBarFill = document.getElementById('progressBarFill');
    
    if (currentQuestion) {
        currentQuestion.textContent = currentQuestionIndex + 1;
    }
    
    if (totalQuestions) {
        totalQuestions.textContent = CONFIG.questions.length;
    }
    
    if (progressBarFill) {
        const progress = ((currentQuestionIndex + 1) / CONFIG.questions.length) * 100;
        progressBarFill.style.width = progress + '%';
    }
}

/* ============================================
   AFFICHAGE DES RÉSULTATS
   ============================================ */

function showResults() {
    const quizScreen = document.getElementById('quizScreen');
    const resultsScreen = document.getElementById('resultsScreen');
    
    if (quizScreen) quizScreen.classList.remove('active');
    if (resultsScreen) resultsScreen.classList.add('active');
    
    // Calculer le pourcentage
    const percentage = Math.round((score / CONFIG.questions.length) * 100);
    
    // Trouver le message approprié
    const resultMessage = getResultMessage(score);
    
    // Mettre à jour l'affichage
    updateResultsDisplay(score, percentage, resultMessage);
    
    // Animations
    animateScore(score, percentage);
    createConfetti();
}

function getResultMessage(score) {
    for (let result of CONFIG.resultMessages) {
        if (score >= result.minScore && score <= result.maxScore) {
            return result;
        }
    }
    return CONFIG.resultMessages[0];
}

function updateResultsDisplay(score, percentage, resultMessage) {
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreTotalDisplay = document.getElementById('scoreTotalDisplay');
    const scorePercentage = document.getElementById('scorePercentage');
    const resultsIcon = document.getElementById('resultsIcon');
    const resultsMessageTitle = document.getElementById('resultsMessageTitle');
    const resultsMessageText = document.getElementById('resultsMessageText');
    
    if (scoreNumber) scoreNumber.textContent = score;
    if (scoreTotalDisplay) scoreTotalDisplay.textContent = CONFIG.questions.length;
    if (scorePercentage) scorePercentage.textContent = percentage;
    if (resultsIcon) resultsIcon.textContent = resultMessage.icon;
    if (resultsMessageTitle) resultsMessageTitle.textContent = resultMessage.title;
    if (resultsMessageText) resultsMessageText.textContent = resultMessage.message;
}

/* ============================================
   ANIMATIONS DES RÉSULTATS
   ============================================ */

function animateScore(score, percentage) {
    // Animation du cercle de score
    const scoreFillCircle = document.getElementById('scoreFillCircle');
    if (scoreFillCircle) {
        const circumference = 2 * Math.PI * 90; // rayon = 90
        const offset = circumference - (percentage / 100) * circumference;
        scoreFillCircle.style.setProperty('--score-offset', offset);
    }
    
    // Animation du love meter
    const loveMeterFill = document.getElementById('loveMeterFill');
    if (loveMeterFill) {
        setTimeout(() => {
            loveMeterFill.style.width = percentage + '%';
        }, 500);
    }
    
    // Animation du nombre
    animateNumber(scoreNumber, 0, score, 1500);
    animateNumber(scorePercentage, 0, percentage, 1500);
}

function animateNumber(element, start, end, duration) {
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

/* ============================================
   CONFETTIS
   ============================================ */

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#6fcf97', '#f2c94c'];
    const confettiCount = 80;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            container.appendChild(confetti);
            
            const fallDuration = 3000 + Math.random() * 2000;
            const swing = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(${window.innerHeight + 50}px) translateX(${swing}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration,
                easing: 'cubic-bezier(.25, .46, .45, .94)'
            }).onfinish = () => confetti.remove();
        }, i * 20);
    }
}

/* ============================================
   RÉINITIALISER LE QUIZ
   ============================================ */

function resetQuiz() {
    const resultsScreen = document.getElementById('resultsScreen');
    const startScreen = document.getElementById('startScreen');
    
    if (resultsScreen) resultsScreen.classList.remove('active');
    if (startScreen) startScreen.classList.remove('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = [];
    
    // Nettoyer les confettis
    const confettiContainer = document.getElementById('confettiContainer');
    if (confettiContainer) {
        confettiContainer.innerHTML = '';
    }
}

/* ============================================
   PARTAGER LES RÉSULTATS
   ============================================ */

function shareResults() {
    const percentage = Math.round((score / CONFIG.questions.length) * 100);
    const resultMessage = getResultMessage(score);
    
    const shareText = `J'ai obtenu ${score}/${CONFIG.questions.length} (${percentage}%) au Quiz de l'Amour ! ${resultMessage.title} 💕`;
    
    // Essayer l'API Web Share si disponible
    if (navigator.share) {
        navigator.share({
            title: 'Quiz de l\'Amour',
            text: shareText,
        }).catch(err => console.log('Erreur de partage:', err));
    } else {
        // Fallback: copier dans le presse-papier
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Résultat copié dans le presse-papier ! 💕');
            }).catch(err => {
                console.log('Erreur de copie:', err);
                alert(shareText);
            });
        } else {
            alert(shareText);
        }
    }
}

/* ============================================
   UTILITAIRES
   ============================================ */

function updateQuestionCount() {
    const questionCount = document.getElementById('questionCount');
    if (questionCount) {
        questionCount.textContent = CONFIG.questions.length;
    }
}

function getRandomFeedback(feedbackArray) {
    return feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
}

/* ============================================
   RACCOURCIS CLAVIER
   ============================================ */

document.addEventListener('keydown', function(e) {
    const quizScreen = document.getElementById('quizScreen');
    if (!quizScreen || !quizScreen.classList.contains('active')) return;
    
    const answerButtons = document.querySelectorAll('.answer-btn:not(.disabled)');
    
    if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (answerButtons[index]) {
            answerButtons[index].click();
        }
    }
});