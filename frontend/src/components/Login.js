import React, { Component } from 'react';
import { Row, Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import config from '../config'

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        email: '',
        password: '',
        userType: ''
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    handleLogin = (e) => {
        e.preventDefault();
        console.log("handling submit");

        axios.post(`${config.BASE_URL}/login`, this.state).then(response => {
            window.localStorage.setItem('jwtToken', response.data[0]);
            this.setState({ userType: response.data[1] });
            if (this.state.userType === 'company')
                this.props.history.push('/company');
            else if (this.state.userType === 'admin')
                this.props.history.push('/admin');
        }).catch((error) => {
            console.log(error);
        })

    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit} >
                    <FormGroup controlId="email" >
                        <FontAwesomeIcon icon={faEnvelope} /> <span><FormLabel>Email</FormLabel></span>
                        <FormControl
                            autoFocus
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <FontAwesomeIcon icon={faUserLock} /> <span><FormLabel>Password</FormLabel></span>
                        <FormControl
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                        />
                    </FormGroup>

                    <Row className='justify-content-md-center'>
                        <Button variant="primary" type="submit" onClick={this.handleLogin}>
                            Login
                    </Button>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Login;