
var wins = 0;

var Hangman =
{
    initializeGame: function()
    {
        this.guess = "";
        this.guessCount = 10;
        this.answer = moviesData[Math.floor(Math.random() * moviesData.length)];
        this.guessHistory = [];
        this.gameOver = false;
        this.gameAnswer = this.answer.title.toLowerCase().split("");
        this.display = this.answer.title.split("");
        for (var i=0; i<this.display.length; i++)
        {
            var currentLetter = this.display[i];
            if (currentLetter.match(/[a-z]/i))
            {
                this.display[i] = "_";
            }
            else if (this.display[i] === " ")
            {
                this.display[i] = "~~~"; 
                this.gameAnswer[i] = "~~~"; 
            }
        }

        this.display = this.display.join(" ").replace(/~/gi, "&nbsp;");
        this.gameAnswer = this.gameAnswer.join(" ").replace(/~/gi, "&nbsp;");
        this.renderResults();
    },

    processGuess: function()
    {   
        this.display = this.display.split("");
        this.gameAnswer = this.gameAnswer.split("");

        for(var i=0; i < this.gameAnswer.length; i++)
        {
            if (this.guess == this.gameAnswer[i].toLowerCase())
            {
                this.display[i] = this.display[i].replace('_', this.gameAnswer[i]);
            }
        }

        this.display = this.display.join("");
        this.gameAnswer = this.gameAnswer.join("")

        return this.display;
    },

    renderResults: function()
    {
        document.getElementById("result").innerHTML = this.display;
        document.getElementById("pastGuesses").innerHTML = this.guessHistory.join(" ");
        document.getElementById("guessesRemaining").innerHTML = this.guessCount;

        
        if (this.display.indexOf("_") < 0) 
        {
            wins++;
            document.getElementById("status").innerHTML = "YOU WIN!";
            this.gameOver = true;
        }
         
        else if (this.guessCount <= 0)
        {
            document.getElementById("status").innerHTML = "Game Over! Sorry, Try Again!";
            this.gameOver = true;
        }
        else
        {
            document.getElementById("status").innerHTML = "Good Luck!";
        }

        if (this.gameOver)
        {
            document.getElementById("winTotal").innerHTML = "# of Wins: " + wins;
            document.getElementById("movieClip").src = this.answer.clip;
            document.getElementById("movieTitle").textContent = this.answer.title;
            document.getElementById("movieText").textContent = this.answer.year + ". Tom Hanks played " + this.answer.thCharacter + ".";
            document.getElementById("resultCard").style.visibility = "visible";
        }
    },

    gameControl: function(event)
    {
        var isWordCharacter = event.key.length === 1;
        var isBackspaceOrDelete = event.keyCode === 8 || event.keyCode === 46;
    
        if (this.guessCount >= 0)
        {
            if (!isWordCharacter || isBackspaceOrDelete)
            {
                document.getElementById("status").innerHTML = "That key was not a letter. Please enter a letter A-Z."
            }
            else
            {
                this.guess = event.key;
                if (this.guessHistory.indexOf(this.guess.toUpperCase()) < 0) 
                {
                    this.guessHistory.push(this.guess.toUpperCase());
                    this.guess = this.guess.toLowerCase();

                    this.display = this.processGuess();

                    if (this.gameAnswer.indexOf(this.guess) < 0)
                        this.guessCount--;
                    
                    this.renderResults();
                }
                else 
                {
                    document.getElementById("status").innerHTML = "You already guessed that letter - try again."
                }
            }
        }
    }
}

