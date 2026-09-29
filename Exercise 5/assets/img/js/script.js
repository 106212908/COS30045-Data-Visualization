/* FAQ Accordian */

const questions = document.querySelectorAll(".faq-question");

questions.forEach(function(question){

    question.addEventListener("click", function(){

        const answer = question.nextElementSibling;

        answer.classList.toggle("show")

    });
});

/* Current Year */

const currentYear = new Date().getFullYear();

const yearElement = document.getElementById("current-year")

yearElement.textContent = currentYear;