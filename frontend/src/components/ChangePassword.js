import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state.email = props.email;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //alert(JSON.stringify(this.state.email, null, 4));

    }

    state = {
        password: '',
        rePassword: '',
        currPassword: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let jwtToken = window.localStorage.getItem("jwtToken");
        axios.get('http://localhost:4000/company/profile', { headers: { Authorization: jwtToken } } )
        .then(res => {
            let currentPassword = res.data.password;
            if(this.state.currPassword === currentPassword) {
                if (this.state.password === this.state.rePassword) {
                    let jwtToken = window.localStorage.getItem("jwtToken");
                    const headers = {
                        'Authorization': jwtToken
                    }
                    let data = {
                        password: this.state.password,
                        email: this.state.email
                    }
    
                    axios.put('http://localhost:4000/company/password', data, { headers: headers })
                        .then(res => {
                        })
                    alert("Password changed");
                } else {
                    alert("Please enter same value");
                }
            } else {
                alert("Please enter correct current password");
            }
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Container className="border">
                <Form onSubmit={this.handleSubmit}>
                    <br></br><br></br>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Current Password:
                                </Form.Label>
                        <Col sm="10">
                            <Form.Control name="currPassword" onChange={this.handleChange} type="password" placeholder="Current Password" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Password:
                                </Form.Label>
                        <Col sm="10">
                            <Form.Control name="password" onChange={this.handleChange} type="password" placeholder="New Password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Repeat Password:
                                </Form.Label>
                        <Col sm="10">
                            <Form.Control name="rePassword" onChange={this.handleChange} type="password" placeholder="Repeat Password" />
                        </Col>
                    </Form.Group>
                    <br></br>
                    <Button variant="danger" type="submit">
                        Change Password
        </Button>
                    <br></br><br></br>
                </Form >
            </Container>

        )
    }

}

export default ChangePassword;
