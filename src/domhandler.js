
import { gameloop } from "./gameloop";

const userContainer = document.getElementById("user-container");
const cpuContainer = document.getElementById("computer-container");
const resetButton = document.getElementById("reset-button");
const axisButton = document.getElementById("change-axis-button");
const status = document.getElementById("status-update");
const MISS_COLOR = "grey";
const HIT_COLOR = "crimson";
const DEFAULT_COLOR = "black";
const HOVER_COLOR = "teal";
const SHIP_COLOR = "cornflowerblue";
let axis = 'x';
let selectionStatus = 0;

function init(){
    //generate grid
    for(let i = 0; i < 10; i++){
        const row = document.createElement("div");
        row.classList.add("row");
        const row2 = document.createElement("div");
        row2.classList.add("row");
        for(let j = 0; j < 10; j++){
            const sqwrapper = document.createElement("div");
            sqwrapper.classList.add("wrapper");
            const sq = document.createElement("div");
            sq.classList.add("content");
            //sq.textContent = "t";
            sqwrapper.appendChild(sq);
            row.appendChild(sqwrapper);

            const sqwrapper2 = document.createElement("div");
            sqwrapper2.classList.add("wrapper");
            const sq2 = document.createElement("div");
            sq2.classList.add("content");
            //sq2.textContent = "t";
            sqwrapper2.appendChild(sq2);
            row2.appendChild(sqwrapper2);
        }
        userContainer.appendChild(row);
        cpuContainer.appendChild(row2);
    }
    
}

function addToAllUser(listener, event){
    for(let i of userContainer.children){
        for(let j of i.children){
            j.addEventListener(event, listener);
        }
    }
}

function removeFromAllUser(listener, event){
    for(let i of userContainer.children){
        for(let j of i.children){
            j.removeEventListener(event, listener);
        }
    }
}


//SELECTION PHASE
function hoverListener(element, axis){
    let length = 5 - selectionStatus;
    
    let y = Array.from(element.parentElement.children).indexOf(element);
    let x = Array.from(element.parentElement.parentElement.children).indexOf(element.parentElement);
    // console.log(length);
    // console.log(axis);
    if(axis === 'x'){
        if(y + length <= 10){
            for(let i = 0; i < length; i++){
                let ele = element.parentElement.children[y+i];
                if(ele.style.backgroundColor != SHIP_COLOR) ele.style.backgroundColor = HOVER_COLOR;
            }
        }
    }
    else{
        if(x + length <= 10){
            for(let i = 0; i < length; i++){
                let ele = element.parentElement.parentElement.children[x+i].children[y];
                if(ele.style.backgroundColor != SHIP_COLOR) ele.style.backgroundColor = HOVER_COLOR;
            }
        }
    }
}

function exitListener(){
    for(let i of userContainer.children){
        for(let j of i.children){
            if(j.style.backgroundColor === HOVER_COLOR) j.style.backgroundColor = DEFAULT_COLOR;
        }
    }
}

function placeListener(){
    let element = this;
    let y = Array.from(element.parentElement.children).indexOf(element);
    let x = Array.from(element.parentElement.parentElement.children).indexOf(element.parentElement);
    let result = gameloop.attemptPlace(x, y, axis);
    if(result){
        for(let i of userContainer.children){
            for(let j of i.children){
                if(j.style.backgroundColor === HOVER_COLOR) j.style.backgroundColor = SHIP_COLOR;
            }
        }

        removeFromAllUser(function(){
            hoverListener(this, axis);
        }, "mouseenter");
        selectionStatus += 1;
        if(selectionStatus === 5){
            endSelectionPhase();
            return;
        }
        addToAllUser(function(){
            hoverListener(this, axis);
        }, "mouseenter");
}
}


function selectionPhaseInit(){
    selectionStatus = 0;
    addToAllUser(exitListener, "mouseleave");
    addToAllUser(function(){
        hoverListener(this, axis);
    }, "mouseenter");
    addToAllUser(placeListener, "click");
}

function endSelectionPhase(){
    removeFromAllUser(exitListener, "mouseleave");
    removeFromAllUser(placeListener, "click");
    axisButton.classList.add("invisible");
    gameloop.startGame();
}

function switchAxis(){
    removeFromAllUser(function(){
        hoverListener(this, axis);
    }, "mouseenter");
    if(axis === 'x') axis = 'y';
    else axis = 'x';
    addToAllUser(function(){
        hoverListener(this, axis);
    }, "mouseenter");
}

axisButton.onclick = switchAxis;


//GAME Listeners

function attackEventListener(){
    let y = Array.from(this.parentElement.children).indexOf(this);
    let x = Array.from(this.parentElement.parentElement.children).indexOf(this.parentElement);
    gameloop.playerAttack(x, y);
}

function addPlayerListeners(){
    for(let i = 0; i < 10; i++){
        const row = cpuContainer.children[i];
        for(let j = 0; j < 10; j++){
            row.children[j].addEventListener("click", attackEventListener);
        }
    }
}

function removePlayerListeners(){
    for(let i = 0; i < 10; i++){
        const row = cpuContainer.children[i];
        for(let j = 0; j < 10; j++){
            row.children[j].removeEventListener("click", attackEventListener);
        }
    }
}

function updateColor(iscpu, x, y, result){
    let to_update = null;
    if(iscpu) to_update = cpuContainer.children[x].children[y];
    else to_update = userContainer.children[x].children[y];

    console.log(to_update);
    if(result === 'hit'){  
        to_update.style.backgroundColor = HIT_COLOR;
        to_update.firstChild.textContent = 'X';
    }
    else if (result === 'miss'){
        to_update.style.backgroundColor = MISS_COLOR;
        //to_update.firstChild.textContent = 'o';
    }
}


function resetAll(){
    userContainer.innerHTML = "";
    cpuContainer.innerHTML ="";
    if(axisButton.classList.contains("invisible")) axisButton.classList.remove("invisible");
    init();
}


resetButton.addEventListener("click", ()=>{
    gameloop.resetGame();
    updateStatus("Selection Phase - Position your battleships!")
    resetAll();
    selectionPhaseInit();
});


function updateStatus(message){
    status.textContent = message;
}


export {init, addPlayerListeners, removePlayerListeners, updateColor, selectionPhaseInit, updateStatus};