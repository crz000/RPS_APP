import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'reactstrap';

class EmperorView extends Component {
    static propTypes = {
        emperor: PropTypes.string,
        resetGame: PropTypes.func
    };


  render() {
    return (<Col sm={{offset: 3, size: 6}}>
        <h3>We have a WINNER!</h3>
        <h1>{this.props.emperor} is the new EMPEROR!</h1>
        <Col sm={{ size: 4, offset: 4 }}>
            <Button type="button" onClick={this.props.resetGame} block>Play Again</Button>
        </Col>
    </Col>
    );
  }
}

export default EmperorView;