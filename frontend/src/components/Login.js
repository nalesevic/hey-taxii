import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import {Button, Row} from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Company from './Company';
import Admin from './Admin'

class Login extends Component {

    state = {
        email: '',
        password: '',
        userType: ''
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log("handling submit");
        
        axios.post('http://localhost:4000/login', this.state).then(response => {
            window.localStorage.setItem('jwtToken', response.data[0]);
            this.setState({ userType: response.data[1] });
            if(this.state.userType == 'company')
                this.props.history.push('/company');
            else if(this.state.userType == 'admin')
                this.props.history.push('/admin');        
          }).catch((error) => {
              console.log(error);
          })

    }

    render() {
        return (
            <Form onSubmit = {this.handleSubmit} >
                <Row className='justify-content-md-center'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange = {this.handleEmailChange} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Row className='justify-content-md-center'>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange = {this.handlePasswordChange} type="password" placeholder="Password" />
                    </Form.Group>
                </Row>

                <Row className='justify-content-md-center'>
                    <Button variant="primary" type="submit" onClick = {this.handleLogin}>
                        Login
                    </Button>
                </Row>
            </Form>
                //  <Button variant="primary" type="submit" onClick = {this.handleLogin}>
                //     Login
                // </Button>
            
        );
    }
}

export default Login;