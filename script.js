document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get("level");

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-button");

    let questions = [];
    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    fetch("quizzes.json")
        .then(response => response.json())
        .then(data => {
            questions = getRandomQuestions(data[level], 5);
            showQuestion();
        })
        .catch(error => console.error("Error loading quiz data:", error));

    function getRandomQuestions(array, count) {
        return array.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option-button");
            button.addEventListener("click", () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });

        nextButton.style.display = "none";
    }

    function checkAnswer(selectedOption) {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            correctAnswers++;
        }
        nextButton.style.display = "block";
    }

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            location.href = `result.html?score=${correctAnswers}`;
        }
    });
});
