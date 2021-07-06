
import { ship } from "./ship";
//IMPLEMENTATION
/* 10x10 array
0 -> not hit, 1 -> hit, if its a ship -> reference to the ship object.

weakmap of ships: stores object reference as keys and coordinate of top-left as value.

 */


const gameboard = () =>{
    let state = [];
    for(let i = 0; i < 10; i++){
        let tmp = [];
        for(let j = 0; j < 10; j++){
            tmp.push(0);
        }
        state.push(tmp);
    }
    let ships = new Map();
    
    function placeShip(length, axis, x, y){

        //Out of boundary starting
        if((x < 0 || x > 9) || (y < 0 || y > 9)) return false;

        //Ship will be out of boundary
        if(axis === 'x'){
            if(y + length > 10) return false;
        }
        else{
            if(x + length > 10) return false;
        }

        //Checking if squares are free
        for(let i = 0; i < length; i++){
            if(axis === 'x'){
                if(state[x][y+i] != 0){
                    return false;
                }
            }
            else{
                if(state[x+i][y] != 0){
                    return false;
                }
            }
            
        }
        //New ship
        const new_ship = ship(length);

        //Populating state
        for(let i = 0; i < length; i++){
            if(axis === 'x'){
                state[x][y+i] = new_ship;
            }
            else{
                state[x+i][y] = new_ship;
            }
        }
        //Populating Map
        ships.set(new_ship, x*10 + y);

        return true;

    }

    function receiveAttack(x, y){
        if((x < 0 || x > 9)||(y<0 || y > 9)) return false;
        if(state[x][y] === 0){
            state[x][y] = 1;
            //HANDLE UPDATE DOM TO REFLECT MISS
            return "miss";
        }
        else if (state[x][y] === 1){
            return "repeat";
        }
        else{
            let index = ships.get(state[x][y]);
            let x_coord = Math.floor(index / 10);
            let y_coord = index % 10;
            if(x_coord === x){
                let result = state[x][y].hit(y-y_coord);
                if(result) return "hit";
                else return "repeat";
            }
            else if(y_coord === y){
                let result = state[x][y].hit(x-x_coord);
                if(result) return "hit";
                else return "repeat";
            }
        }
    }

    function isGameOver(){
        for(let i of ships.keys()){
            if(!i.isSunk()) return false;
        }
        return true;
    }

    return {
        placeShip,
        receiveAttack,
        isGameOver,
        
    }

}

export {
    gameboard
};
