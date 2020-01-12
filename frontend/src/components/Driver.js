import React, { Component } from 'react';
import axios from 'axios'
import { Form, Button, Container, Row } from 'react-bootstrap'
import AddDriver from './AddDriver'
import ListDrivers from './ListDrivers'
import DriverInfo from './DriverInfo';

class Driver extends Component {

  constructor(props) {
    super(props);
    this.state.drivers = props.drivers;
    this.handleAddDriver = this.handleAddDriver.bind(this);
  }

  state = {
    drivers: {},
    showDriverForm: false,
    showDriverInfo: false
  }

  addToList = (driver) => {
    console.log("ADDING TO LIST " + driver);
    let d = this.state.drivers;
    d.push(driver)
    this.setState({ drivers: d });
    alert(JSON.stringify(this.state.drivers, null, 4));
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
    this.setState({
      drivers
    });
  }

  handleAddDriver() {
    if (this.state.showDriverForm === false)
      this.setState({ showDriverForm: true })
    else
      this.setState({ showDriverForm: false })
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
          {this.state.showDriverForm ? <AddDriver addToList={this.addToList} /> : null}
        </Container>
        <div className="container">
          <ListDrivers drivers={this.state.drivers} deleteDriver={this.deleteDriver} />
        </div>
      </div>
    )
  }

}

export default Driver