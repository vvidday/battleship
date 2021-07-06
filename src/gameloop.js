import { player } from './player';
import { gameboard } from './gameboard';
import { addPlayerListeners, removePlayerListeners, updateStatus } from './domhandler';

const gameloop = (() => {
    let computergb = null;
    let usergb = null;
    let computer = null;
    let user = null;
    let selectionstatus = 0;

    function startGame(){
        computergb = gameboard();
        computer = player(true, usergb);
        user = player(false, computergb);
        populateGameboard(computergb);
        addPlayerListeners();
        updateStatus("Game on! Choose a square to attack!");
    }

    function startSelection(){
        usergb = gameboard();
    }

    function attemptPlace(x, y, axis){
        console.log(x, y, axis);
        if(usergb.placeShip(5-selectionstatus, axis, x, y)){
            selectionstatus += 1;
            return true;
        }
        else{
            return false;
        }
        }
    

    function populateGameboard(gameboard){
        let result = null;
        for(let i = 1; i <= 5; i++){
            do{
                let x = Math.floor(Math.random()*10);
                let y = Math.floor(Math.random()*10);
                if(Math.random() < 0.5){
                    result = gameboard.placeShip(i, 'x', x, y);
                }
                else{
                    result = gameboard.placeShip(i, 'y', x, y);
                }
            }
            while(!result)
        }
    }

    function playerAttack(x, y){
        let result = user.attack(x, y);
        if(result === 'repeat') return;
        removePlayerListeners();
        
        if(result === 'won'){
            //END GAME, player won.
            endGame("player");
            return;
        }
        let cpuresult = computer.randomAttack();
        
        if(cpuresult === 'won'){
            //END GAME, computer won.
            endGame("computer");
            return;
        }
        addPlayerListeners();
    }

    function endGame(winner){
        removePlayerListeners();    
        if(winner === "computer") updateStatus("You lose! Better luck next time.")
        else updateStatus("Congratulations, you win!");
    }

    function resetGame(){
        computergb = null;
        usergb = null;
        computer = null;
        user = null;
        selectionstatus = 0;
        startSelection();
    }

    return {
        playerAttack,
        startGame,
        resetGame,
        attemptPlace,
        startSelection,
    };

})();

export { gameloop };