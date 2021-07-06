import { player } from './player';
import { gameboard } from './gameboard';
import { addPlayerListeners, removePlayerListeners, updateColor } from './domhandler';

const gameloop = (() => {
    let computergb = null;
    let usergb = null;
    let computer = null;
    let user = null;

    function startGame(){
        computergb = gameboard();
        usergb = gameboard();
        computer = player(true, usergb);
        user = player(false, computergb);
        populateGameboard(computergb);
        populateGameboard(usergb);
        addPlayerListeners();
    }

    function populateGameboard(gameboard){
        // gameboard.placeShip(1, 'x', 0, 0);
        gameboard.placeShip(5, 'y', 0, 0);
        gameboard.placeShip(3, 'x', 0, 5);
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
        console.log(winner + " won");
    }

    function resetGame(){
        computergb = null;
        usergb = null;
        computer = null;
        user = null;
        startGame();
    }

    return {
        playerAttack,
        startGame,
        resetGame,
    };

})();

export { gameloop };