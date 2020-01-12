import React, { Component } from 'react';
import axios from 'axios'
import { Form, Button, Container, Row } from 'react-bootstrap'
import AddDriver from './AddDriver'

class Driver extends Component {

  constructor(props) {
    super(props);
    this.state.drivers = props.drivers;
    this.handleAddDriver = this.handleAddDriver.bind(this);
    this.handleDeleteDriver = this.handleDeleteDriver.bind(this);
  }

  state = {
    drivers: {},
    showDriverForm: false
  }

  handleAddDriver() {
    if (this.state.showDriverForm == false)
      this.setState({ showDriverForm: true })
    else
      this.setState({ showDriverForm: false })
  }

  handleDeleteDriver(id) {
    //alert(JSON.stringify(this.state.drivers, null, 4));
    let jwtToken = window.localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': jwtToken
    }
    axios.delete(`http://localhost:4000/company/driver/${id}`, { headers: headers })
      .then(res => {
        console.log("Izbrisao sam");
      })
  }

  render() {
    const { drivers } = this.state
    const driversList = drivers.length ? (
      drivers.map(driver => {
        return (
          <div className="driver card" key={driver._id}>
            <div className="card-content">
              <span className="card-title">{driver.first_name} {driver.last_name} {driver.vehicle} {driver.phone} </span>
              <span className="card-text"><Button onClick={() => { this.handleDeleteDriver(driver._id) }} >Delete</Button></span>
            </div>
          </div>
        )
      })
    ) : (
        <div className="center">No registered drivers</div>
      );

    return (
      <div>
        <Button onClick={this.handleAddDriver} >Add Driver</Button>
        <Container className="addDriver-form">
          {this.state.showDriverForm ? <AddDriver /> : null}
        </Container>
        <div className="container">
          {driversList}
        </div>
      </div>
    )
  }

}

export default Driver