import React, {Component} from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap'
import axios from 'axios';
import config from '../config'

class AddVehicle extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        manufacturer: '',
        model: '',
        year: '',
        type: '',
        registrationNumber: '',
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.password);
        const Vehicle = {...this.state};
        let jwtToken = window.localStorage.getItem('jwtToken');
        
        const headers = {
            'Authorization': jwtToken
        }
        axios.post(`${config.BASE_URL}/company/vehicles`, this.state, { headers: headers } )
        .then(res => {
            console.log("Dobio od servera " + res.data._id);
            Vehicle._id = res.data._id;
            this.props.addToList(Vehicle);
        })

        this.setState({
            manufacturer: '',
            model: '',
            year: '',
            type: '',
            registrationNumber: '',
        })

    }

    render() {
        return (

            <div className = "admin-panel">

            <div className = "addvehicle-form">
                <Container>
                    <Row className='justify-content-center'>
                    
                        <Form onSubmit={this.handleSubmit}>
                        <br></br>
                            <Form.Group>
                                <Form.Label>Manufacturer:</Form.Label>
                                <Form.Control name='manufacturer' type="text" onChange = { this.handleChange } placeholder="Enter Vehicle Manufacturer" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Model:</Form.Label>
                                <Form.Control name='model' type="text" onChange = { this.handleChange } placeholder="Enter Vehicle Model" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Year:</Form.Label>
                                <Form.Control name='year' type="number" onChange = { this.handleChange } placeholder="Enter Vehicle year" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Registration Number:</Form.Label>
                                <Form.Control name="registrationNumber" type="text" onChange = { this.handleChange } placeholder="Enter Vehicle reg number" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Vehicle Type:</Form.Label>
                                <Form.Control name='type' type="text" onChange = { this.handleChange } placeholder="Enter Vehicle type" />
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

export default AddVehicle;