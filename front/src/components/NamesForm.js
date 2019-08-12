import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class NamesForm extends Component {

    static propTypes = {
        savePlayers: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            player1: null,
            player2: null,
            visibleAlert: false
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.savePlayers = this.savePlayers.bind(this);
    }

    onChangeInput(e){
        e.persist();
        let updatedState = {};
        updatedState[e.target.id] = e.target.value;
        this.setState(updatedState);
    }

    savePlayers(){
        if(this.state.player1 && this.state.player2 && this.state.player1 !== this.state.player2){
            this.props.savePlayers(this.state.player1, this.state.player2);
        }else{
            this.setState({visibleAlert: true});
        }
    }

    render() {
        return (<Col sm={{offset: 3, size: 6}}>
            <h1>Enter players' names</h1>
            <Alert color="danger" isOpen={this.state.visibleAlert} toggle={this.onDismiss}>
                Both fields are mandatory and should have different values
            </Alert>
            <Form>
                <FormGroup row>
                    <Label for="name1" sm={3}>Player 1</Label>
                    <Col sm={9}>
                        <Input type="text" name="player1" id="player1" placeholder="Write a name" onChange={this.onChangeInput} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="name2" sm={3}>Player 2</Label>
                    <Col sm={9}>
                        <Input type="text" name="player2" id="player2" placeholder="Write a name" onChange={this.onChangeInput} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={12}>
                        <Button type="button" onClick={this.savePlayers} block>Start</Button>
                    </Col>
                </FormGroup>
            </Form>

        </Col>
        );
    }
}

export default NamesForm;