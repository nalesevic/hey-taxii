import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

class VehicleInfo extends Component {

    constructor(props) {
        super(props);
        this.state.vehicles = props.vehicles;
        this.state.vehicleID = props.vehicleID;
        this.handleChange = this.handleChange.bind(this);
        //alert(JSON.stringify(this.state.vehicles, null, 4));

    }

    state = {
        vehicle: {},
        manufacturer: '',
        model: '',
        year: '',
        type: '',
        registrationNumber: '',
    }

    componentDidMount() {
        let currentVehicle = {};
        for (let i = 0; i < this.state.vehicles.length; i++) {
            if (this.state.vehicles[i]._id == this.state.vehicleID) {
                currentVehicle = this.state.vehicles[i];
                this.setState({ vehicle: currentVehicle });
            }
        }
        //alert(JSON.stringify(currentVehicle, null, 4));
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let jwtToken = window.localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': jwtToken
        }
        let data = {
           manufacturer : this.state.manufacturer,
           model : this.state.model,
           year : this.state.year,
           registrationNumber : this.state.registrationNumber,
           type : this.state.type
        }
        let id = this.state.vehicleID;
        axios.put(`http://localhost:4000/company/vehicles/${id}`, data, { headers: headers })
            .then(res => {
                this.setState({ vehicle: res.data })
                for (let i = 0; i < this.state.vehicles.length; i++) {
                    if (this.state.vehicles[i]._id === id)
                        this.state.vehicles[i] = this.state.vehicle;
                }
                console.log("vehicle after update " + this.state.vehicle.manufacturer);
            })
    }

    deleteVehicle = (id) => {
        let jwtToken = window.localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': jwtToken
        }
        let index = this.state.vehicles.findIndex(x => x._id === id);
        this.state.vehicles.splice(index, 1);

        axios.delete(`http://localhost:4000/company/vehicles/${id}`, { headers: headers })
            .then(res => {
            })
        const vehicles = this.state.vehicles.filter(vehicle => {
            return vehicle._id !== id
        });

        this.props.showInfo(true);

        this.setState({
            vehicles
        });
    }

    render() {


        return (

            <div className="admin-panel">

                <div className="VehicleInfo-form">
                    <Container>
                        <Row className='justify-content-center'>

                            <Form onSubmit={this.handleSubmit}>
                                <br></br>
                                <Form.Group>
                                    <Form.Label>Manufacturer:</Form.Label>
                                    <Form.Control name='manufacturer' type="text" onChange={this.handleChange} defaultValue={this.state.vehicle.manufacturer} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Model:</Form.Label>
                                    <Form.Control name='model' type="text" onChange={this.handleChange} defaultValue={this.state.vehicle.model} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Vehicle Type:</Form.Label>
                                    <Form.Control name='type' type="text" onChange={this.handleChange} defaultValue={this.state.vehicle.type} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Year:</Form.Label>
                                    <Form.Control name='year' type="number" onChange={this.handleChange} defaultValue={this.state.vehicle.year} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Registration Number:</Form.Label>
                                    <Form.Control name='registrationNumber' type="text" onChange={this.handleChange} defaultValue={this.state.vehicle.registrationNumber} />
                                </Form.Group>

                                <Button variant="warning" type="submit">
                                    Update
                            </Button>
                                <br></br> <br></br>
                            </Form>

                        </Row>

                        <Row>
                            <span className="card-text"><Button variant="danger" onClick={() => { this.deleteVehicle(this.state.vehicleID) }} >Delete</Button></span>
                        </Row>
                    </Container>

                </div>

            </div>
        )
    }
}

export default VehicleInfo;