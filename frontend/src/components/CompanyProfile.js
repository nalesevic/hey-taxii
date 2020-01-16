import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import ChangePassword from './ChangePassword'
import config from '../config'


class CompanyProfile extends Component {

    constructor(props) {
        super(props);
        this.state.company = props.company;
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        //alert(JSON.stringify(this.state.company, null, 4));
    }


    state = {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let jwtToken = window.localStorage.getItem("jwtToken");

        const headers = {
            'Authorization': jwtToken
        }
        
        axios.put(`${config.BASE_URL}/company/profile`, this.state.company, { headers: headers })
            .then(res => {
            })
        alert("Profile updated");

    }

    handleNameChange = (e) => {
        this.state.company.name = e.target.value;
    }

    handleAddressChange = (e) => {
        this.state.company.address = e.target.value;

    }

    handlePhoneChange = (e) => {
        this.state.company.phone = e.target.value;

    }

    render() {
        return (
            <div className="company-info">
                <Row className='justify-content-center'>
                    <Form onSubmit={this.handleSubmit}>
                        <br></br>
                        <Container className="border">
                            <h3> Basic company information </h3>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Name:
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control name="name" onChange={this.handleNameChange} plaintext defaultValue={this.state.company.name} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Email:
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control name="email" onChange={this.handleEmailChange} plaintext readOnly defaultValue={this.state.company.email} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Address:
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control name="address" onChange={this.handleAddressChange} plaintext defaultValue={this.state.company.address} />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Phone:
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control name="phone" onChange={this.handlePhoneChange} plaintext defaultValue={this.state.company.phone} />
                                </Col>
                            </Form.Group>
                        </Container>
                    </Form>
                </Row>
                <br></br>
                <Button variant="warning" type="submit" onClick={this.handleSubmit}>
                    Update
                            </Button>
                <br></br><br></br><br></br>
                <h3> Change password </h3>
                <ChangePassword email={ this.state.company.email } />
                <br></br><br></br>
            </div>
        )
    }

}

export default CompanyProfile