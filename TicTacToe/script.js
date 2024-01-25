const gameBoard=(function(){
    let board=[];
    const row=3;
    const column=3;
    let index=0;
    for(let i=0;i<row;i++){
        board[i]=[];
        for(let j=0;j<column;j++){
            board[i].push(0);
        }
    }
   
    const getboard=function(){return {board};}
    const addToken=function(token,board,row,col){
        console.log("inside addtoken"+token);
        board.board.forEach((element,index,arr)=>{

            let innerElement=element.map((item,innerIndex,innerArray)=>{
                if(row==index && col==innerIndex){
                    arr[index][innerIndex]=token;
                }
                return arr;
            }
            );
          return innerElement;
            
            
        });
       return board;
      
    }
    const printBoard=function(){
        console.log(getboard());
    }
    console.log(getboard());
    return {getboard,addToken,printBoard}
})();

 

 const Game=function(){
   
    const player1={
        name:"One",
        token:"1"
    }
    const player2={
        name:"Two",
        token:"2"
    }
    let activePlayer=player1;
    let activePlayerToken=player1.token;
    let game_board=gameBoard.getboard();
    const getPlayerName=function(player){ return player.name}
    const getPlayerToken=function(player){
        return player.token;
    }
    const switchPlayerTurn=function(){
        activePlayer=activePlayer===player1?player2:player1;    
    }
    const getActivePlayer=function(){
        return activePlayer;
    }
    let printPlayRound=function(){
        gameBoard.printBoard();
        console.log(`${getPlayerName(activePlayer)}'s Turn`);
    }
    let play=function(row,col){
        gameBoard.addToken(activePlayerToken,game_board,row,col);
        updateScreen();
        // if(endGame){return;}
        switchPlayerTurn();
        printPlayRound();
       
    }
    return {play,game_board,printPlayRound};

 }

  const updateScreen = function(){
    let cells=document.querySelectorAll(".cell");
    let game_board=gameBoard.getboard();
    let row,col;
        game_board.board.forEach((element,rowIndex,arr)=>{
            cells.forEach(cell=>{
                row=cell.dataset.row;
                col=cell.dataset.column;
                cell.textContent=`${arr[row][col]}`;
                cell.addEventListener('click',handleClickListener);
              });
            });
 
  }
  const displayController=function(){
       let game=Game();
       game.printPlayRound();
       let board=gameBoard.getboard();
       let boardDiv=document.querySelector(".board");
       let boardRow,cell;
       board.board.forEach((element,rowIndex,arr)=>{
            boardRow=document.createElement('div');
            boardRow.classList.add('row');
            boardDiv.appendChild(boardRow);
            element.forEach((item,colIndex)=>{
                 cell=document.createElement('button');
                 cell.classList.add('cell');
                 cell.dataset.column=colIndex;
                 cell.dataset.row=rowIndex;
                 cell.textContent=item;
                 boardRow.appendChild(cell);
                 cell.addEventListener('click',handleClickListener);
            });
       });
       

  }

  const handleClickListener=function(e){
    let game=Game();
    let row=e.target.dataset.row;
    let col=e.target.dataset.column;
    game.play(row,col);  
  }
  displayController();