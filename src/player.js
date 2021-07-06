import { updateColor } from "./domhandler";

const player = (isCpu, enemygameboard) =>{

    function isComputer(){
        return isCpu;
    }

    function attack(x, y){
        let result = enemygameboard.receiveAttack(x, y);
        // console.log(result);
        // console.log(enemygameboard.isGameOver());
        updateColor(!isCpu, x, y, result);
        if(enemygameboard.isGameOver()) return "won"
        else{
            return result;
        }
    }

    function randomAttack(){
        let result = null;
        do{
            let x = Math.floor(Math.random()*10);
            let y = Math.floor(Math.random()*10);
            console.log(x, y);
            result = enemygameboard.receiveAttack(x,y);
            updateColor(!isCpu, x, y, result);
            console.log(result);
        }
        while(result === 'repeat')
        if(enemygameboard.isGameOver()) return "won";
        return result;
    }

    return{
        isComputer,
        attack,
        randomAttack,
    }
}

export {player};