//Ship factory function

const ship = (length) =>{
    let sunk = false;
    let state = [];
    for(let i = 0; i < length; i++){
        state.push(0);
    }
    function hit(number){
        //Invalid index
        if(number < 0 || number >= length){
            return false;
        }
        // Success
        if(state[number] === 0){
            state[number] = 1;
            if(state.filter(x=>x===1).length === length){
                sunk = true;
            }
            return true;
        }
        // Already hit
        else{
            return false;
        }
    }

    function isSunk(){
        return sunk;
    }

    return {
        hit,
        isSunk,
    }

}


export {ship};