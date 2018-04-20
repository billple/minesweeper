//All methods and functionality in Board class
export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard(){
    return this._playerBoard;
  }
  flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    }
    this._numberOfTiles--;
    if(this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }

  }

  //Creates and array of adjacent tiles to the flipped bomb.
  getNumberOfNeighborBombs (rowIndex, columnIndex){
    const neightborOffsets = [[-1,-1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neightborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

          //Check to see if row and column are valid tiles on board
          if(neighborRowIndex >= 0 && neighborRowIndex < this._numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < this._numberOfColumns){
            if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
                this._numberOfBombs++;
            };
          };
    });
  return this._numberOfBombs;
  }
//Informs the user that they have won the game and all non-bomb tiles have been flipped
  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
  }

  //This function will print our board by passing it as a value into the parameter.
  print(){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  //This arrow function creates our player's Board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
      for(let numRow = 0; numRow < numberOfRows; numRow++){
        let row = [];
          for(let numColumn = 0; numColumn < numberOfColumns; numColumn++){
            row.push(' ');
          }
          board.push(row);
      }
      return board;
  }

  //This arrow function creates our bomb board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
      for(let numRow = 0; numRow < numberOfRows; numRow++){
        let row = [];
          for(let numColumn = 0; numColumn < numberOfColumns; numColumn++){
            row.push(null);
          }
          board.push(row);
      }
      let numberOfBombsPlaced = 0;
      while(numberOfBombsPlaced < numberOfBombs){
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if(board[randomRowIndex][randomColumnIndex] !== 'B'){
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }

        /*
        The code in your While loop has the potential to place bombs on top of already
        existing bombs. This will be fixed when I learn about CONTROL FLOW.
        */
      }

      return board;
  }

}
