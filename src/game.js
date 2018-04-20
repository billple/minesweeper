// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`




import {Board} from './board';

//Where we instantiated a game and played a move
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);

  }
  playMove(rowIndex, columnIndex){
      this._board.flipTile(rowIndex, columnIndex);

      //If there is a bomb at the flipped location, telllplayer they lost
      if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){

        console.log('BOOM! GAME OVER! here was your final board: ');
        this._board.print();

      } else if(this._board.hasSafeTiles()){

        console.log('Current Board: ');
        this._board.print();

      } else {

        console.log('Congrats you have won! winning board: ');
        this._board.print();

      }
  }
}
