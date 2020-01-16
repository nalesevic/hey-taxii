import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

class DriverInfo extends Component {

    constructor(props) {
        super(props);
        this.state.drivers = props.drivers;
        this.state.driverID = props.driverID;
        this.handleChange = this.handleChange.bind(this);
        //alert(JSON.stringify(this.state.drivers, null, 4));

    }

    state = {
        driver: {},
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        vehicleRegistrationNumber: '',
        address: '',
        phone: ''
    }

    componentDidMount() {
        let currentDriver = {};
        for (let i = 0; i < this.state.drivers.length; i++) {
            if (this.state.drivers[i]._id == this.state.driverID) {
                currentDriver = this.state.drivers[i];
                this.setState({ driver: currentDriver });
            }
        }
        //alert(JSON.stringify(currentDriver, null, 4));
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            vehicleRegistrationNumber: this.state.vehicleRegistrationNumber,
            address: this.state.address,
            phone: this.state.phone
        }
        let id = this.state.driverID;
        axios.put(`http://localhost:4000/company/drivers/${id}`, data, { headers: headers })
            .then(res => {
                this.setState({ driver: res.data })
                for (let i = 0; i < this.state.drivers.length; i++) {
                    if (this.state.drivers[i]._id === id)
                        this.state.drivers[i] = this.state.driver;
                }
                console.log("driver after update " + this.state.driver.first_name);
            })
    }

    deleteDriver = (id) => {
        let jwtToken = window.localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': jwtToken
        }
        let index = this.state.drivers.findIndex(x => x._id === id);
        this.state.drivers.splice(index, 1);

        axios.delete(`http://localhost:4000/company/drivers/${id}`, { headers: headers })
            .then(res => {
            })
        const drivers = this.state.drivers.filter(driver => {
            return driver._id !== id
        });

        this.props.showInfo(true);

        this.setState({
            drivers
        });
    }

    render() {


        return (

            <div className="admin-panel">

                <div className="DriverInfo-form">
                    <Container>
                        <Row className='justify-content-center'>

                            <Form onSubmit={this.handleSubmit}>
                                <br></br>
                                <Form.Group>
                                    <Form.Label>Driver first name:</Form.Label>
                                    <Form.Control name='first_name' type="text" onChange={this.handleChange} defaultValue={this.state.driver.first_name} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Driver last name:</Form.Label>
                                    <Form.Control name='last_name' type="text" onChange={this.handleChange} defaultValue={this.state.driver.last_name} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Driver Email:</Form.Label>
                                    <Form.Control name='email' type="email" onChange={this.handleChange} defaultValue={this.state.driver.email} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Driver phone:</Form.Label>
                                    <Form.Control name='phone' type="phone" onChange={this.handleChange} defaultValue={this.state.driver.phone} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Driver vehicle registration number:</Form.Label>
                                    <Form.Control name='vehicleRegistrationNumber' type="text" onChange={this.handleChange} defaultValue={this.state.driver.vehicleRegistrationNumber} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Driver address:</Form.Label>
                                    <Form.Control name='address' type="text" onChange={this.handleChange} defaultValue={this.state.driver.address} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Driver Password:</Form.Label>
                                    <Form.Control name='password' type="password" onChange={this.handleChange} />
                                </Form.Group>

                                <Button variant="warning" type="submit">
                                    Update
                            </Button>
                                <br></br> <br></br>
                            </Form>

                        </Row>

                        <Row>
                            <span className="card-text"><Button variant="danger" onClick={() => { this.deleteDriver(this.state.driverID) }} >Delete</Button></span>
                        </Row>
                    </Container>

                </div>

            </div>
        )
    }
}

export default DriverInfo;