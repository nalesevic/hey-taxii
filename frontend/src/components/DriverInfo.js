import React, {Component} from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

class DriverInfo extends Component {
    
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        vehicle: '',
        address: '',
        phone: ''
    }

    handleFirstNameChange = (e) => {
        this.setState({
            first_name: e.target.value,
        })
    }

    handleLastNameChange = (e) => {
        this.setState({
            last_name: e.target.value,
        })
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

    handlePhoneChange = (e) => {
        this.setState({
            phone: e.target.value,
        })
    }

    handleAddresChange = (e) => {
        this.setState({
            address: e.target.value,
        })
    }


    render() {
        return (

            <div className = "admin-panel">

            <div className = "DriverInfo-form">
                <Container>
                    <Row className='justify-content-center'>
                    
                        <Form onSubmit={this.handleSubmit}>
                        <br></br>
                            <Form.Group>
                                <Form.Label>Driver first name:</Form.Label>
                                <Form.Control name='driverName' type="text" onChange = { this.handleFirstNameChange } placeholder="Enter driver name" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver last name:</Form.Label>
                                <Form.Control type="text" onChange = { this.handleLastNameChange } placeholder="Enter driver last name" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver Email:</Form.Label>
                                <Form.Control name='driverEmail' type="text" onChange = { this.handleEmailChange } placeholder="Enter driver email" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver phone:</Form.Label>
                                <Form.Control type="number" onChange = { this.handleEmailChange } placeholder="Enter driver phone" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver vehicle:</Form.Label>
                                <Form.Control name='driverName' type="text" onChange = { this.handleVehicleChange } placeholder="Enter driver vehicle" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver address:</Form.Label>
                                <Form.Control name='driverName' type="text" onChange = { this.handleAddressChange } placeholder="Enter driver address" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver Password:</Form.Label>
                                <Form.Control name='driverPassword' type="text" onChange = { this.handlePasswordChange } placeholder="Enter driver password" />
                            </Form.Group>

                            <Button variant="warning" type="submit">
                                Update
                            </Button>
                            <br></br> <br></br>
                        </Form>

                    </Row>

                    <Row>
                        <span className="card-text"><Button onClick={() => { this.handleDeleteDriver() }} >Delete</Button></span>
                    </Row>
                </Container>
               
            </div>

            </div>
        )
    }
}

export default DriverInfo;