import './style.css';
import { init, selectionPhaseInit } from "./domhandler";
import { gameloop } from "./gameloop";

init();
gameloop.startSelection();
selectionPhaseInit();
//gameloop.startGame();