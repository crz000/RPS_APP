import React, { Component } from 'react';
import { Table, Col } from 'reactstrap';
import PropTypes from 'prop-types';

class ScoreTable extends Component {
    static propTypes = {
        rounds: PropTypes.array,
        smLayout: PropTypes.object
    };



  buildRow(round){
      return (<tr key={round.winner.name+round.inx}>
        <td>{round.inx}</td>
        <td>{round.winner.name}</td>
        <td>{round[round.winner.field]}</td>
      </tr>);
  }


  render() {
    if(this.props.rounds.length < 1) return null;
    return (<Col sm={this.props.smLayout} className={"score-table"}>
        <h1>Scores</h1>
        <Table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Winner</th>
            <th>Move</th>
          </tr>
        </thead>
        <tbody>
        {this.props.rounds.map(this.buildRow)}
        </tbody>
      </Table>
    </Col>
    );
  }
}

export default ScoreTable;