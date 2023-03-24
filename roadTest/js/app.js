const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions =[];
let  availableOptions=[];
let correctAnswers = 0;
let attempt = 0;

//push questions into availableQuestions array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

//set question number and question and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
   
   //set question text
   //get random question
   const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion =  questionIndex;
    questionText.innerHTML = currentQuestion.q; 
    //get the position of 'questionIndex' from the availableQuestin array
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the questionIndex from the array so that the question does not repeat
    availableQuestions.splice(index1,1);

    //show question image if 'img' property exists
    if(currentQuestion.hasOwnProperty("img")){
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }


    //set options
    //get the lenght of options
    const optionLen = currentQuestion.options.length
    //push options into availableOptions array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)

    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    //create options in html
    for(let i=0; i<optionLen; i++){ 
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //het the posistion of 'optionIndex' from the availableOptions
        const index2 = availableOptions.indexOf(optionIndex);
        //remove the 'optionIndex' from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");

    }
    questionCounter++
}
function getResult(element){
    const id = parseInt(element.id);
    //get the answer by comparing the id of the clicked option
    if(id === currentQuestion.answer){
        //set the green option to the correct answer
        element.classList.add("correct");
        updateAnswersIndicator("correct");
        correctAnswers++;

    }else{
        //set the red option to the wrong answer
        element.classList.add("wrong");
        updateAnswersIndicator("wrong")

        //if answer is wrong then show the correct one
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
    }
    }
}

attempt++;



    unclikableOptions();
}
//make all the options unclickable once the user clicks their answer
 
function unclikableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");

    }

}

function answersIndicator(){

    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);

        
}
}

function updateAnswersIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)

}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
        
}else{
    getNewQuestion();
}

}
function quizOver(){
    //hide quizBox
    quizBox.classList.add("hide");
    //show result box
    resultBox.classList.remove("hide");
    quizResult();

    
}
//get the quiz Result
function quizResult(){
    resultBox.querySelector(".total-questions").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers +" / " + quiz.length;

}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){

    //hide the result Box
    resultBox.classList.add("hide");
    //Show result Box
    quizBox.classList.remove("hide");

    resetQuiz();
    startQuiz();
}
function goToHome(){

    //hide result box
    resultBox.classList.add("hide");
    //show home box
    homeBox.classList.remove("hide");
    resetQuiz();

}
// ####### Starting Point ######

function startQuiz(){
    //hide home box
    homeBox.classList.add("hide");
    //show home box
    quizBox.classList.remove("hide");

    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    //second we will call getNewQuestion function
    getNewQuestion();
    //to create indicators of answers
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}