const { test, expect, beforeAll } = require('@jest/globals');
import { sum } from './index';
import { ship } from './ship';


const length = 5;
let test_ship = null;

beforeEach(()=>{
    test_ship = ship(length);
});

test('adds 1 + 2 to equal 3', ()=>{
    expect(sum(1, 2)).toBe(3);
});



test('hit returns true on valid number', ()=>{
    expect(test_ship.hit(length-1)).toBe(true);
});

test('hit returns false on already hit position', ()=>{
    test_ship.hit(length-1);
    expect(test_ship.hit(length-1)).toBe(false);
})

test('hit returns false on invalid number', ()=>{
    expect(test_ship.hit(length)).toBe(false);
})


test('isSunk returns false when ship is still alive', ()=>{
    expect(test_ship.isSunk()).toBe(false);
})

test('isSunk returns false when ship is still alive 2', ()=>{
    for(let i = 0; i < length - 1; i++){
        test_ship.hit(i);
    }
    expect(test_ship.isSunk()).toBe(false);
})

test('isSunk returns true when ship is sunk', ()=>{
    for(let i = 0; i < length; i++){
        test_ship.hit(i);
    }
    expect(test_ship.isSunk()).toBe(true);
})