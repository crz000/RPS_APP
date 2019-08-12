import React, { Component } from 'react';
import NamesForm from './components/NamesForm';
import RoundForm from './components/RoundForm';
import ScoreTable from './components/ScoreTable';
import EmperorView from './components/EmperorView';
import 'bootstrap/dist/css/bootstrap.css'
import './css/styles.css'
import * as dbUtils from './utils/dbUtils'
import { Col, Row, Container} from 'reactstrap';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      player1: null,
      player2: null,
      currentPlayer: null,
      rounds: [],
      currentRound: 0,
      player1Moved: null,
      gameId: null,
      emperor: null
    };
    this.advanceRound = this.advanceRound.bind(this);
    this.savePlayers = this.savePlayers.bind(this);
    this.onMoveSelection = this.onMoveSelection.bind(this);
    this.resetGame = this.resetGame.bind(this);
}

  savePlayers(player1, player2){
    this.setState({ player1, player2, currentPlayer: player1});
    dbUtils.putDataToDB({player1, player2}, this.advanceRound, ()=>{});
  }

  advanceRound(a){
    this.setState(
      { currentRound: this.state.currentRound+1,
        player1Moved: null,
        gameId: a.data.id,
        rounds: a.data.rounds ? a.data.rounds : this.state.rounds,
        currentPlayer: this.state.player1,
        emperor: a.data.emperor
      });
  }

  onMoveSelection(player, move){
    if(player === this.state.player1){
      this.setState({ currentPlayer: this.state.player2, player1Moved: move})
    }else{
      let rounds = this.state.rounds;
      rounds.push( {
        player1: this.state.player1Moved, player2: move, inx: this.state.currentRound
      });
      dbUtils.updateDB(this.state.gameId, {player1: this.state.player1, player2: this.state.player2, rounds}, this.advanceRound, ()=>{});
    }
  }


  getView(){
    if(this.state.emperor){
      return(<Col sm={12}>
        <Row>
          <EmperorView emperor={this.state.emperor} resetGame={this.resetGame}/>
          <div style={{height: "50px", width: "100%"}}></div>
          <ScoreTable rounds = {this.state.rounds} smLayout={{size:4, offset: 4}}/>
        </Row>
      </Col>
      )
    }
    if(this.state.currentRound === 0){
      return(<NamesForm savePlayers={this.savePlayers}/>);
    }
    return(<Col sm={12}>
      <Row>
        <RoundForm playerName={this.state.currentPlayer} round={this.state.currentRound} onMoveSelection={this.onMoveSelection}/>
        <ScoreTable rounds = {this.state.rounds} smLayout={{size:4}}/>
      </Row>
    </Col>)
  }

  resetGame(){
    this.setState(
      { player1: null,
        player2: null,
        currentPlayer: null,
        rounds: [],
        currentRound: 0,
        player1Moved: null,
        gameId: null,
        emperor: null
      });
  }

  render() {
    return (
      <Container className={"main-container"}>
        <Row>
            {this.getView()}
        </Row>
      </Container>
    );
  }
}

export default App;