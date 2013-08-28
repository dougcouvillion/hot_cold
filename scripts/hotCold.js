/*
    Generate a random number between 1 and the given parameter.
 */
function genNumber(largest)
{
    var x = 10;

    if (typeof Number(largest) == "number")
    {
        x = largest;
    }

    return Math.floor((Math.random()*x)+1);
}

/*
    Process the user's guess.  The correct answer is passed in as a parameter.
 */
function processGuess(answer)
{
    var guessText = $("#inputGuess").val();
    var guess = 0;  // we'll assume the user gave us bad data to start.

    // if the user gave us a non-numeric guess, we need to slap their wrist.
    if (isNaN(guessText) )
    {
        alert("You should only enter numbers as your guess.  What were you thinking?" +
                "  I'm going to treat your guess as zero.  That should teach you!");
    }
    else // they must have given us a number, so let's us that
    {
        guess = Number($("#inputGuess").val());
    }

    // hide any previous feedback given to the user.
    $(".feedback").hide();

    if (guess > answer)
    {
        $("#too_high").fadeIn();
    }
    else if (guess < answer)
    {
        $("#too_low").fadeIn();
    }
    else // they must have guessed right
    {
        $("#just_right").fadeIn();
        endOfGameHide();
    }
}

/*
    Return the largest number we should include in our range, based on the selected level of difficulty.
 */
function getLargestNumber()
{
    // get the selected level of difficulty
    var levelOfDifficulty = $("#difficulty").val();

    // default the largest number to 10
    var rv = 10;

    // set the largest number based on the user's selection
    if (levelOfDifficulty == "hard")
    {
        rv = 50;
    }
    else if (levelOfDifficulty == "medium")
    {
        rv = 25;
    }

    // return the largest number we should use based on the level of difficulty selected by the user
    return rv;
}


/*
    At the end of a game we want to hide some of the elements and reset some values so it's clear the user needs to
    select a new level of difficulty to start over.
*/
function endOfGameHide()
{
    $("#range").hide();
    $("#guess").hide();
    $("#inputGuess").val("");
    $("#btnGuess").hide();
    $("#difficulty").val("null");
}

/*
    At the beginning of a game we need to hide the feedback from the last game and display the range and guessing
    elements so the user can continue with their blissful experience.
 */
function startOfNewGameShow()
{
    $("#just_right").hide();
    $("#range").show();
    $("#guess").show();
    $("#btnGuess").show();
}
/*
    Define our local variables.
 */
var largestNumber = 10;                         // the largest number to be used in our random number generation
var secretNumber = genNumber(largestNumber);    // the number the user is trying to guess

/*
    When the document is finished loading we want to hide the elements that shouldn't be displayed until a
    level of difficulty is selected.
 */
jQuery(document).ready(function() {
    $("#LODSelected").hide();
});

/*
    When the user clicks on the "Guess" button, we should process their guess.  Actually this and the corresponding
    div in the HTML should probably be removed since anytime the input textbox loses focus it seems to file the next
    event.  Having them both fire causes the feedback to fadeIn twice, which is kind of wonkie.
 */
$("#btnGuess").click(function() {
    processGuess(secretNumber);
});

/*
    When the user changes their guess we should process it.
 */
$("#inputGuess").change(function() {
    processGuess(secretNumber);
});

/*
    When the user changes the level of difficulty the game should start over.
 */
$("#difficulty").change(function() {
    startOfNewGameShow();
    largestNumber = getLargestNumber();
    secretNumber = genNumber(largestNumber);
    $("#max").text(String(largestNumber));
    $("#LODSelected").show();
});