
function numberbetween1_100() 
{
    var randnum;
    randnum = Math.floor(Math.random() * 100) + 1;
    return randnum
}

var numberofattempts = 0;

function updateAttempts() {
    numberofattempts++;
    document.getElementById("attemptCounter").textContent = "Attempts: " + numberofattempts;
}
function handleGuess() {
    var guessnumber = document.getElementById("userinput").value;
   
  
    if (guessnumber == randomNumber) {
        document.getElementById("playermessage").textContent = "Congratulations! You guessed it!";
      
    } else if (guessnumber < randomNumber) {
        document.getElementById("playermessage").textContent = "Too low. Try again!";
    
    } else {
        document.getElementById("playermessage").textContent = "Too high. Try again!";
      
    }

    if (guessnumber == randomNumber) {

        playermessage.style.backgroundColor = "lightgreen";
       
       
    } 
    else if (guessnumber < randomNumber) {
     
        playermessage.style.backgroundColor = "orange";
     
    } 
    else {
       
        playermessage.style.backgroundColor = "gray";
       
    }

    if (guessnumber == randomNumber) {
        playSound(true);
    } 
    else if (guessnumber < randomNumber) 
    {
        playSound(false); 
    } 
    else {
        
    
        playSound(false); 
    }
    
     if (guessnumber < randomNumber) 
    {
        messagevibration();
     
    } 
    else {
        
        messagevibration();
       
    }

  
    updateAttempts();
    document.getElementById("resetbtn").style.display = "block";

    
    displayGuessHistory(guessnumber, document.getElementById("playermessage").textContent);
}


function displayGuessHistory(guess, feedback) {
    var records = document.getElementById("records");
    var items = document.createElement("li");
    items.textContent = "Guess: " + guess + ", Feedback: " + feedback;
    records.appendChild(items);
}

function resetbtn() {
    randomNumber = numberbetween1_100();
    document.getElementById("userinput").value = "";
    document.getElementById("attemptCounter").textContent = "";
    document.getElementById("playermessage").textContent = "";
    document.getElementById("records").textContent = "";
    numberofattempts = 0;

}





function messagevibration() {
    var playermessage = document.getElementById("playermessage");
    playermessage.classList.add("vibration");

    playermessage.addEventListener("animationend", function () {
        playermessage.classList.remove("vibration");
    });
}




var correctsong = new Audio("http://soundbible.com/grab.php?id=1647&type=wav");
var incorrectsong = new Audio("http://soundbible.com/grab.php?id=1003&type=wav");

function playSound(isCorrect) {
    if (isCorrect) {
        correctsong.play();
    } else {
        incorrectsong.play();
    }
}

document.getElementById("submit").addEventListener("click", function () {
    handleGuess();
});
document.getElementById("resetbtn").addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", null);
});

document.getElementById("droparea").addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.getElementById("droparea").addEventListener("drop", function (event) {
    resetbtn();
    event.preventDefault();
});


var randomNumber = numberbetween1_100();



