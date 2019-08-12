const rules = {
    Rock: "Paper",
    Paper: "Scissors",
    Scissors: "Rock"
};
module.exports ={
    calculateWinners : (game) => {
        if(!game || !game.rounds || game.rounds.length === 0) return [];
        let result = game.rounds.map((round, inx) => {
            let winner;
            if(round.player1 === round.player2){
                winner = {
                    name: "--",
                    field: "player1"
                }
            }
            else if(round.player2 === rules[round.player1]){
                winner = {
                    name: game.player2,
                    field: "player2"
                }
            }else{
                winner = {
                    name: game.player1,
                    field: "player1"
                }
            }
            return {...round, winner: winner, inx: inx+1};
        });
        return result;
    },

    calculateEmperor: (rounds) => {
        
        let p1 = 0, p2 = 0;
        for(let i = 0; i < rounds.length; i++){
            if(rounds[i].winner.name === "--") continue;
            if(rounds[i].winner.field === "player1"){
                p1++
                if(p1 === 3) {return rounds[i].winner.name}
            }else{
                p2++
                if(p2 === 3) {return rounds[i].winner.name}
            }
        }
        return null;
    }
}