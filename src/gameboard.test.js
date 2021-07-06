import { expect, test } from "@jest/globals";
import { gameboard } from "./gameboard";
import { ship } from "./ship";

const gb = gameboard();

test('placeship returns false on out of bounds coordinates', ()=>{
    expect(gb.placeShip(1, 'x', -1, 0) || gb.placeShip(1, 10, 10)).toBe(false);
});

test('placeship successfully places ship on correct coordinates', ()=>{
    expect(gb.placeShip(3, 'x', 2, 2)).toBe(true);
});

test('placeship returns false on occupied coordinates', ()=>{
    expect(gb.placeShip(1, 'x', 2, 3)).toBe(false);
});


test('receiveattack returns true on ship hit', ()=>{
    expect(gb.receiveAttack(2, 2) && gb.receiveAttack(2, 4)).toBe(true);
});

test('receiveattack returns false on ship miss', ()=>{
    expect(gb.receiveAttack(1, 1)).toBe(false);
});

test('receiveattack returns false on out of bounds coordinates', ()=>{
    expect(gb.receiveAttack(0, -1) || gb.receiveAttack(10, 10)).toBe(false);
});


test('isgameover returns false if not all ships have been sunk', ()=>{
    expect(gb.isGameOver()).toBe(false);
});

test('isgameover returns true if all ships are sunk', ()=>{
    gb.receiveAttack(2, 3);
    expect(gb.isGameOver()).toBe(true);
})