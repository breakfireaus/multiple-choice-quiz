function printHighscores() {
    //retrieve the score from local storage or set to an empty array
    var highscores = JSON.parse(window.localStorage.getItem('highscores'))|| [];

// Sort highscores by score property
    highscores.sort(function(a, b) {
        return b.score - a.score
    });
    highscores.forEach(function(score) {
        // create li tag each high score
        var litag = document.createElement("li");
        litag.textContent = score.initials + " - " + score.score;
        
        
        //dispay on page
        var o1e1 = document.getElementById("highscores")
        o1e1.appendChild(litag);
    });
}

function clearHighscore() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighscore;


//run function when page loads
printHighscores();