import React, {Component} from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

class AddDriver extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        vehicleRegistrationNumber: '',
        address: '',
        phone: '',
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.password);
        const driver = {...this.state};
        let jwtToken = window.localStorage.getItem('jwtToken');
        
        const headers = {
            'Authorization': jwtToken
        }
        axios.post('http://localhost:4000/company/drivers', this.state, { headers: headers } )
        .then(res => {
            console.log("Dobio od servera " + res.data._id);
            driver._id = res.data._id;
            this.props.addToList(driver);
        })

        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            vehicleRegistrationNumber: '',
            address: '',
            phone: ''
        })

    }

    render() {
        return (

            <div className = "admin-panel">

            <div className = "addDriver-form">
                <Container>
                    <Row className='justify-content-center'>
                    
                        <Form onSubmit={this.handleSubmit}>
                        <br></br>
                            <Form.Group>
                                <Form.Label>Driver first name:</Form.Label>
                                <Form.Control name='first_name' type="text" onChange = { this.handleChange } placeholder="Enter driver name" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver last name:</Form.Label>
                                <Form.Control name='last_name' type="text" onChange = { this.handleChange } placeholder="Enter driver last name" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver Email:</Form.Label>
                                <Form.Control name='email' type="text" onChange = { this.handleChange } placeholder="Enter driver email" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver phone:</Form.Label>
                                <Form.Control name="phone" type="number" onChange = { this.handleChange } placeholder="Enter driver phone" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver Vehicle Registration Number:</Form.Label>
                                <Form.Control name='vehicleRegistrationNumber' type="text" onChange = { this.handleChange } placeholder="Enter driver vehicle" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver address:</Form.Label>
                                <Form.Control name='address' type="text" onChange = { this.handleChange } placeholder="Enter driver address" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Driver Password:</Form.Label>
                                <Form.Control name='password' type="password" onChange = { this.handleChange } placeholder="Enter driver password" />
                            </Form.Group>

                            <Button variant="success" type="submit">
                                Register
                            </Button>
                            <br></br> <br></br>
                        </Form>

                    </Row>
                </Container>
               
            </div>

            </div>
        )
    }
}

export default AddDriver;