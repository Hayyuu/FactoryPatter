
let running=false;
let isdraw=false;
const player1={
    name:"One",
    token:"1"
}
const player2={
    name:"Two",
    token:"2"
}
let activePlayer=player2;

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
    const addToken=function(token,row,col){
        console.log("inside addtoken"+token);
        board[row][col]=token;
      
    }
    const setboard=function(newBoard){
          board=newBoard;
    }
    const printBoard=function(){
        console.log(getboard());
    }
    console.log(getboard());
    return {board,setboard,getboard,addToken,printBoard}
})();

 

 const Game=function(){
    running=true;
    let game_board=gameBoard;
    let winner="";
    const setActivePlayer=(player)=>{
         activePlayer=player;
    }
    const switchPlayerTurn=function(){
        activePlayer=(activePlayer==player1)?player2:player1;
        return activePlayer;
    }
    const getActivePlayer=function(){
        return activePlayer;
    }
    let printPlayRound=function(){
        game_board.printBoard();
        console.log(`${activePlayer.name}'s Turn`);
    }
    let play=function(row,col){
        console.log("inside play");
        if(game_board.board[row][col]!=0 || !running){
            return;
        }
        game_board.addToken(activePlayer.token,row,col);
        checkWinner();
        printPlayRound();
    }
    let checkWinner=function(){
        let roundWon=false;
        let msg="";
                game_board.board.forEach((element,index,arr)=>{
                    if(arr[index].every((x)=>x==arr[index][0] && x!=0)){
                        msg="row tie";
                        roundWon=true;
                        return;
                    }
                    
                    if(arr.every(x=>x[index]==arr[0][index] && x[index]!=0)){
                     msg="col tie";
                     roundWon=true;
                     return;
                    }
                    if(arr.every(innerArray=>innerArray.every(el=>el!==0))){
                        msg="Its a draw";
                        isdraw=true;
                        return;
                    }
                    
                    
                });
                if(isdraw){
                    console.log(`${msg}`);
                    running=false;
                }
                if (roundWon){
                    console.log(`${msg} player ${activePlayer.name} won`);
                    running=false;
                }
               else{
               switchPlayerTurn();
               }
               return roundWon;
            }
        
            
    return {running,getActivePlayer,play,game_board,printPlayRound,setActivePlayer,switchPlayerTurn};

 }

 

  const displayController=function(){
       let game=Game();
       game.printPlayRound();
       let boardDiv=document.querySelector(".board");
       let playerTurnText=document.querySelector('.turn');
       let resetBtn=document.querySelector('.restart');
       let boardRow,cell;
      
       
       const updateScreen = function(){
        boardDiv.textContent="";
        if(!running && !isdraw){
            playerTurnText.textContent=`Player ${activePlayer.name} won`;
            return;
            
        }
        if(isdraw){
            playerTurnText.textContent=`It's a draw`;
            return;

        }
       
        let board=gameBoard.board;
        resetBtn.addEventListener('click',resetClickHandler);
        playerTurnText.textContent=activePlayer.name;
      
        board.forEach((element,rowIndex,arr)=>{
            
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
        updateScreen();
      }
      const resetClickHandler=function(){
       location.reload();
      }
      
      updateScreen();
  }

 
  displayController();