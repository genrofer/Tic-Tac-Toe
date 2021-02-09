const selectBox = document.querySelector(".select-box"),
      selectXBtn = selectBox.querySelector(".playerX"),
      selectOBtn = selectBox.querySelector(".playerO"),
      playBoard = document.querySelector(".play-board"),
      allBox = document.querySelectorAll("section span"),
      players = document.querySelector(".players"),
      white = document.querySelector(".white"),
      resultBox = document.querySelector(".result-box"),
      winner = document.querySelector(".winner-text"),
      wontext = document.querySelector(".won-text"),
      replay = document.querySelector(".replay");


window.onload = () => { //window first load

    for(var i = 0; i < allBox.length; i++){ //add onclick attribute
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide") //hide the selected box
        playBoard.classList.add("show") //show the selected box
    }

    selectOBtn.onclick = () => {
        selectBox.classList.add("hide") //hide the selected box
        playBoard.classList.add("show") //show the selected box
        players.setAttribute("class", "players active player")

    }
}

let playerXIcon = "fas fa-times"  //font awesome X icon
let playerOIcon = "fas fa-circle"  //font awesome O icon
let playerSign = "X";

// user click function
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `O <i class="${playerOIcon}"></i>`
        players.classList.add("active");
        playerSign = "O"
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `X <i class="${playerXIcon}"></i>`
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner()
    playBoard.style.pointerEvents = "none"
    element.style.pointerEvents = "none"
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed()
    setTimeout(() => {
        bot();
    }, randomDelayTime)
}

// bot click function

function bot(){
    playerSign = "O"
    let array = [];
    for(let i = 0; i < allBox.length; i++){
        if(allBox[i].childElementCount == 0){
            array.push(i);
            // console.log(i + " " + "has no children")
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]
    console.log(randomBox)
    if(array.length > 0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = `X <i class="${playerXIcon}"></i>`
            players.classList.remove("active");
            playerSign = "X"
            allBox[randomBox].setAttribute("id", playerSign);
        } else {
            allBox[randomBox].innerHTML = `O <i class="${playerOIcon}"></i>`
            players.classList.remove("active")
            allBox[randomBox].setAttribute("id", playerSign);
        } 
    } 
    selectWinner()
    playerSign = "X"
    allBox[randomBox].style.pointerEvents = "none"
    playBoard.style.pointerEvents = "auto"
}

// Replay button 
replay.addEventListener("click", function(){
    window.location.reload();
})

// Select the winner
function getClass(idname){
    return document.querySelector(".box" + idname).id //returning id
}

function checkClasses(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true
    }
}

function selectWinner(){
    if( checkClasses(1,2,3, playerSign) || checkClasses(4,5,6, playerSign) || checkClasses(7,8,9, playerSign) || checkClasses(1,4,7, playerSign) || checkClasses(2,5,8, playerSign) || checkClasses(3,6,9, playerSign) || checkClasses(1,5,9, playerSign) || checkClasses(3,5,7, playerSign)){
        setTimeout(() => {
            winner.textContent = playerSign;
            playBoard.classList.remove("show")
            resultBox.classList.add("show")
        }, 500)
    } else {
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            setTimeout(() => {
                playBoard.classList.remove("show")
                resultBox.classList.add("show")
            }, 777);
            wontext.textContent = "Match end with draw"
        }
    }
}