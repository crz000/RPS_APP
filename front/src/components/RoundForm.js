import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class RoundForm extends Component {

    static propTypes = {
        playerName: PropTypes.string,
        round: PropTypes.number,
        onMoveSelection: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.selectedMove = this.selectedMove.bind(this);
        this.state = {
            move : "Rock"
        }
    }

    selectedMove(e){
        e.persist();
        this.props.onMoveSelection(this.props.playerName, this.state.move);
        this.setState({move: "Rock"})
    }

    render() {
        return (<Col sm={{offset: 1, size: 6}}>
            <Form>
                <h5>Round {this.props.round}</h5>
                <h3>{this.props.playerName}<span> is playing</span></h3>
                <FormGroup row>
                    <Label for="move" sm={3}>Select Move</Label>
                    <Col sm={9}>
                        <Input value={this.state.move} type="select" name="move" id="move" onChange={(e)=>{this.setState({move: e.target.value})}}>
                            <option>Rock</option>
                            <option>Paper</option>
                            <option>Scissors</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={12}>
                        <Button type="button" onClick={this.selectedMove} block>Ok</Button>
                    </Col>
                </FormGroup>
            </Form>
        </Col>
        );
    }
}

export default RoundForm;