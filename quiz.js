var triviaQuestions = [
    //Question 1
    {
        question: "What is UFC an abbreviation for?",
        choices: ["Unlimited Fried Chicken", "Ultimate Fighting Championship", "Ultra Fighting Contest", "Universal Fighter Championship"],
        correctAnswer: "Ultimate Fighting Championship"
    },
    //Question 2
    {
        question: "Who was the first female UFC fighter signed?",
        choices: ["Ronda Rousey", "Holly Holm", "Rose Numajunes", "Paige VanZant"],
        correctAnswer: "Ronda Rousey"
    },
    //Question 3
    {
        question: "Where was the first UFC event held outside of the United States?",
        choices: ["Moscow", "Hong Kong", "Puerto Rico", "London"],
        correctAnswer: "Puerto Rico"
    },
    //Question 4
    {
        question: "Who coined the phrase 'Champ Champ?",
        choices: ["Conor McGregor", "Randy Couture", "Nick Diaz", "Dana White"],
        correctAnswer: "Conor McGregor"
    },
    //Question 5
    {
        question: "What is the shape of the cage used in the UFC?",
        choices: ["Pentagon", "Decagon", "Heptagon", "Octogon"],
        correctAnswer: "Octogon"
    },
    //Question 6
    {
        question: "What year was the UFC founded?",
        choices: ["1995", "1993", "1987", "1999"],
        correctAnswer: "1993"
    },
    //Question 7
    {
        question: "Who is the youngest champion in UFC history?",
        choices: ["Jon Jones", "Forrest Griffin", "Anderson Silva", "Lyota Machida"],
        correctAnswer: "Jon Jones"
    },
    //Question 8
    {
        question: "Who most commonly announces the fighters when they step into the Octogon?",
        choices: ["John McCarthy", "Joe Rogan", "Eddie Bravo", "Bruce Buffer"],
        correctAnswer: "Bruce Buffer"
    },
    //Question 9
    {
        question: "Which former WWE Star signed with the UFC and holds a 0-2 record?",
        choices: ["Brock Lesnar", "Sting", "Hulk Hogan", "CM Punk"],
        correctAnswer: "CM Punk"
    },
    //Question 10
    {
        question: "Which city had the highest attendest at a single UFC event?",
        choices: ["Melbourne", "Las Vegas", "Miami", "Dublin"],
        correctAnswer: "Melbourne"
    },
    //Question 11
    {
        question: "Who is ranked as the best Pound-for-Pound fighter in history?",
        choices: ["Conor McGregor", "Nate Diaz", "Demetrious Johnson", "TJ Dillashaw"],
        correctAnswer: "Demetrious Johnson"
    },
    //Question 12
    {
        question: "Which fighter has a brother who has also fought in the UFC?",
        choices: ["Brock Lesnar", "Tito Ortiz", "Cody Garbrandt", "Nick Diaz"],
        correctAnswer: "Nick Diaz"
    },
    //Question 13
    {
        question: "Who is the current women's Bantamweight Champion?",
        choices: ["Holly Holm", "Amanda Nunes", "Cyborg", "Zhang Weili"],
        correctAnswer: "Amanda Nunes"
    },
    //Question 14
    {
        question: "Who is the current Heavyweight Champion?",
        choices: ["Jon Jones", "Daniel Cormier", "Stipe Miocic", "Frank Mir"],
        correctAnswer: "Stipe Miocic"
    },
    //Question 15
    {
        question: "What sport did Henry Cejudo win an Olympic Gold Medal for?",
        choices: ["Wrestling", "Boxing", "Swimming", "Curling"],
        correctAnswer: "Wrestling"
    },
    //Question 16
    {
        question: "Which fighter is currently under a two-year suspension for failing a USADA drug test?",
        choices: ["Kamaru Usman", "TJ Dillashaw", "Cody Garbrandt", "Ben Askren"],
        correctAnswer: "TJ Dillashaw"
    },
    //Question 17
    {
        question: "Where is the current UFC Headquarters",
        choices: ["Miami", "Las Vegas", "Los Angeles", "New York City"],
        correctAnswer: "Las Vegas"
    },
    //Question 18
    {
        question: "When was the first UFC Hall of Fame Induction?",
        choices: ["UFC 100", "UFC 150", "UFC 45", "UFC 75"],
        correctAnswer: "UFC 45"
    },
    //Question 19
    {
        question: "Which fighter has had the most succesful title defenses",
        choices: ["Anderson Silva", "Israel Adesanya", "Carlos Condit", "Derrick Lewis"],
        correctAnswer: "Anderson Silva"
    },
    //Question 20
    {
        question: "Which fighter has the most wins in title fights?",
        choices: ["Yoel Romero", "Jorge Masvidal", "Frankie Edgar", "GSP"],
        correctAnswer: "GSP"
    },
    //Question 21
    {
        question: "How many fighters from Ireland are currently signed to the UFC?",
        choices: ["1", "2", "3", "4"],
        correctAnswer: "2"
    },
    //Question 22
    {
        question: "As of March 2014, how many countries have the UFC held events in?",
        choices: ["9", "12", "13", "15"],
        correctAnswer: "13"
    },
    //Question 23
    {
        question: "What UFC event was recently infamously cancelled?",
        choices: ["100", "124", "151", "265"],
        correctAnswer: "151"
    },
    //Question 24
    {
        question: "Who won the first series of The Ultimate Fighter at Light Heavyweight?",
        choices: ["Tony Ferguson", "Forrest Griffin", "Thiago Santos", "Rafael dos Anjos"],
        correctAnswer: "Forrest Griffin"
    },
    //Question 25
    {
        question: "Which of the following organisations have the UFC not bought over?",
        choices: ["Pride", "Bellator", "WEC", "Strikeforce"],
        correctAnswer: "Bellator"
    },

]

var counter = 15;
var score = 0;
var missed = 0;
var currentQuestion = 0;
var timer;

//On-click function to make game start when start button is pressed
$(document).on('click', '#start', function () {
    $('#start').remove();
    $('#time').html(counter);
    showQuestion();
});



//function needed to put the questions and options list on the screen
function showQuestion() {
    counter = 15;
    timer = setInterval(countDown, 1000);

    var question = triviaQuestions[currentQuestion].question;
    var choices = triviaQuestions[currentQuestion].choices;

    $('#time').html('Seconds Left: ' + counter);
    $('#questionSection').html(`
    <h2>${question}</h2>
    ${showChoices(choices)}
    `);
}

//function to itterate through the choices of each question 
function showChoices(choices) {
    var result = '';
    for (var i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}

//function to make timer count down to 0 and do something if the timer counts to 0
function countDown() {
    counter--;
    $('#time').html('Seconds Left: ' + counter);
    if (counter === 0) {
        timeOver()
    }
}

//function to be called by the countdown when time runs out
function timeOver() {
    missed++;
    clearInterval(timer);
    nextQuestion();

}

//function to move on to next question if time is over and stop when there are no questions left
function nextQuestion() {
    var questionsOver = (triviaQuestions.length - 1) === currentQuestion;
    if (questionsOver) {
        showResults();
    } else {
        currentQuestion++;
        showQuestion();
    }
}

//on-click function to determine if choice selected is right or wrong based on data-answer
$(document).on('click', '.choice', function () {
    clearInterval(timer);
    var rightAnswer = triviaQuestions[currentQuestion].correctAnswer;
    var buttonClicked = $(this).attr('data-answer');
    if (rightAnswer === buttonClicked) {
        score++;
        nextQuestion();
    } else {
        missed++;
        nextQuestion();
    }
})

//function to show the results of the game once all questions are answered
function showResults() {
    var results = `
    <h4> Question(s) Correct: ${score}</h4>
    <h4> Question(s) Incorrect: ${missed}</h4>
    <button class='btn btn-primary' id='reset'>Reset Triva Game</button
    `;
    $('#questionSection').html(results);

    if (score <= 5){
        alert("You suck!")
    }
    else if (score >= 6 && score <= 10){
        alert("That was pretty bad")
    }
    else if (score >= 11 && score <= 15){
        alert("You must be a casual fan")
    }
    else if (score >= 16 && score <= 20){
        alert("You have potential to be the champion, keep pushing!")
    }
    else if (score >= 21 && score <= 25){
        alert("You are the world Champion!")
    }
}

//on-click function to add functionality to the reset button
$(document).on('click', '#reset', function () {
    counter = 15;
    score = 0;
    missed = 0;
    currentQuestion = 0;
    timer; null;
    showQuestion();
})