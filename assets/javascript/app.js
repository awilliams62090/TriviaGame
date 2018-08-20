$(document).ready(function () {
    //Declaring Global Variables
    var rightAnswer = 0; //This will keep track of correct player answers
    var wrongAnswer = 0; //This will keep track of incorrect player answers
    var unanswered = 0; //This will keep track of unanswered questions from player- timer ran out
    var timer; //this is a variable to set a timer/interval
    var counter = 60;
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
    }, 
    //UPDATE!- It works!! Adding all of my questions
    {
        question: "Which NHL Hockey team has won the most Stanley Cup Championships?",
        choices: ["Montreal Canadiens", "Detroit Red Wings", "Boston Bruins", "Vancouver Canucks"],
        answer: "Montreal Canadiens",
    }, {
        question: "Former DU Head Coach, Jim Mntgomery, is now with what NHL team?",
        choices: ["Colorado Avalanche", "Phoenix Coyotes", "Nashiville Predators", "Dallas Stars"],
        answer: "Dallas Stars",
    }, {
        question: "How many players between both teams can be onthe ice at one time",
        choices: ["16", "11", "12", "10"],
        answer: "12",
    }, {
        question: "What country did the USA Women's Hockey team beat to win their gold medal in the 2018 Winter Olympics?",
        choices: ["Russia", "Canada", "Korea", "Finland"],
        answer: "Canada",
    }, {
        question: "What NHL team had it's inagural season in the 2017-2018 NHL Season?",
        choices: ["Vegas Golden Knights", "Tampa Bay Lightning", "Orlando Blooms", "Quebec Nordiques"],
        answer: "Vegas Golden Knights",
    }, {
        question: "What current NHL team was formerly the Quebec Nordiques?",
        choices: ["Minnesota Wild", "New York Islanders", "Colorado Avalanche", "Los Angeles Kings"],
        answer: "Colorado Avalanche",
    }]
    

    //Timer functions to create a timer that counts down by one second for the duration of the game
    function startTimer() {
        counter = 60;
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
        $("#submitGame").hide();
    }

    //Adding questions/answers to the page from my trivaItem variable
    function addQuestions() {
        for (var i = 0; i < triviaItem.length; i++) {
            var question = $("<p>").text(triviaItem[i].question);
            $("#gameQuestion").append(question);
            for (var j = 0; j < triviaItem[i].choices.length; j++) {
                $("#gameQuestion").append("<input type= 'radio' value='" + triviaItem[i].choices[j] + "' name= 'question-" + i + "'>" + triviaItem[i].choices[j] + "<br>");

            }
            $("#gameQuestion").append('<br>');
        }
    }
    //When the user hits the submit button, OR if the timer runs out, we will need to check to see if the player guessed the right answer. If they did, it will up their wins counter, or if they didn't it will up their losses counter. We will also want to append the counters to the page and give them an option to play again.


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
        $("#gameQuestion").text("");
        addQuestions();
        $("#playAgain").hide();
        $("#submitGame").show();
    }

    // Runnig the game- when the player hits start, the game clock begins. We will then hide the start button 
    $("#start").click(function () {
        startGame();
        $("#titleBox").hide();
        $(".col").show();
    });

    //If the player finishes answering before the timer is done, they will hit submit and the timer will stop
    $('#submitGame').click(function () {
        stopTimer();
        $("#submitGame").hide();
    });

    //The player can paly again without having to reload the page by clicking the play again button
    $("#playAgain").click(function () {
        startGame();
    })

});