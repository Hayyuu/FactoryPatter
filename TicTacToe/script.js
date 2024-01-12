const gameBoard=(function(){
    let board=[];
    const row=3;
    const column=3;
    
    for(let i=0;i<row;i++){
        board[i]=[];
        for(let j=0;j<column;j++){
            board[i].push(0);
        }
    }
    
    const getboard=function(){return {board:board};}
    const addToken=function(token,index){
       console.log(token);
    }
    const printBoard=function(){
        console.log(getboard());
    }
    console.log(getboard());
    return {getboard,addToken,printBoard}
})();

 const element= function(){
    let value=0;
    if(!playing) {
        return value;
    }
    else {
        value=playertoken;
    }
    return value;
 }

 const player=function(){
    const player1={
        name:"One",
        token:"1"
    }
    const player2={
        name:"Two",
        token:"2"
    }
    const getPlayerToken=function(player){
        return player.token;
    }
    const getPlayerName=function(player){}
    return {player1,player2,getPlayerName,getPlayerToken};
 }
 const gameController=function(){
    let playing=false;
    let playerTurn="playerOne";
    const players=player();
    let player1=players.player1;
    let playerOneToken=players.getPlayerToken(player1);
    let player2=players.player2;
    let playerTwoToken=players.getPlayerToken(player2);
    let game_board=gameBoard;
   
 }
 gameController();