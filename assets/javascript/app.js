$(document).ready(function () {
    //Declaring Global Variables
    var rightAnswer = 0; //This will keep track of correct player answers
    var wrongAnswer = 0; //This will keep track of incorrect player answers
    var unanswered = 0; //This will keep track of unanswered questions from player- timer ran out
    var timer; //this is a variable to set a timer/interval
    var counter = 20;
    //below will be our questions. I have them as an array and then obejects to differentiate between the 
    //question that will be displayed, the choices available and teh solution to the question
    //I will have 8 total questions, I am starting with 2 sets, so I don't waste time typing if it doesn't work 
    var triviaItem = [{
        question: "What city is home of the NHL team the Blue Jackets?",
        choices: ["St. Louis", "Columbus", "San Jose", "Nashville"],
        answer: "Columbus",
    }, {
        question: "How many Olympic gold medals have the Men's and Women's USA Hockey teams won collectively?",
        choices: ["6", "2", "3", "4"],
        answer: "4",
    }]

    // initialize function to ready the game for play, set counters to 0 and display the start button
    // on click of start the first timer will begin, each question has 20 seconds to answer
    // the question and choices from the object will be displayed
    // we will check the answer to the playerGuess in our if statements, but it will not be displayed
    // the choice selected by the player will be the playerGuess 
    // if playerGuess === answer a new timer is started where their rightAnswer goes up by 1 and a congrats message is displayed
    // if playerGuess !== answer a new timer is started where the wrongAnswer goes up by 1 and a loser message displayed
    // if timer runs out before a choice has been made- timer starts, unanswered goes up by 1 and a timeout message displayed
    // after one of the if statement timer is complete, the next question is displayed and the 20 seconds/choices begins again
    // the "ifs" will be used for all 8 questions 
    // after the loop is complete the page will display the risghtAnswer, wrongAnswer and unanwered counts for the player as well 
    // as have the option to play again by clicking the "Play Again" button 
    // reset function to start the game over without reloading page by clicking on the "Play Again" button

    function startTimer() {
        counter = 20;
        clearInterval(timer);
        timer = setInterval(countDown, 1000)
    }

    function countDown() {
        counter--;
        $("#counter").text("Time Remaining: " + counter);
        if (counter === 0) {
            stopTimer();
            console.log('time over');
        }
    }

    function stopTimer() {
        clearInterval(timer);
        submit();
    }


    function addQuestions() {
        for (var i = 0; i < triviaItem.length; i++) {
            var question = $("<p>").text(triviaItem[i].question);
            $("#gameQuestion").append(question);
            for (var j = 0; j < triviaItem[i].choices.length; j++) {
                $("#gameQuestion").append("<input type= 'radio' value='" + triviaItem[i].choices[j] + "' name= 'question-" + i + "'>" + triviaItem[i].choices[j]);

            }
        }

    }

    function submit() {
        for (var i = 0; i < triviaItem.length; i++) {
            $.each($("input[name='question-" + i + "']:checked"), function () {
                console.log($(this).attr('value'));
                var userGuess = $(this).attr('value');
                if (userGuess === triviaItem[i].answer) {
                    rightAnswer++;
                } else {
                    wrongAnswer++;
                }
            });
        }
        $("#rightAnswer").text("Correct Answers: " + rightAnswer);
        $("#wrongAnswer").text("Incorrect Answers: " + wrongAnswer);
        $("#playAgain").show();
    }

    function startGame() {
        rightAnswer = 0;
        wrongAnswer = 0;
        startTimer();
        addQuestions();
        $("#playAgain").hide();
    }

    $("#start").click(function () {
        startGame();
        $("#start").hide();
    });

    $('#submitGame').click(function () {
        stopTimer();
    });

    $("#playAgain").click(function () {
        startGame();
    })

});