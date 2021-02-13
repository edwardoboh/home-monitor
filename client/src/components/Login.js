import React, { Component } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'

class Login extends Component {
    
    state = {
        email: "",
        password: ""
    }

    handleInput = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    submitForm = () => {

    }

    render(){
        return(
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter email address" onChange={this.handleInput} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="enter password" onChange={this.handleInput} />
                </FormGroup>
                <Button onClick={this.submitForm} color="danger">Login</Button>
            </Form>
        )
    }
}

export default Login