import React, { Component } from 'react';
import axios from 'axios'
import { Form, Button, Container, Row } from 'react-bootstrap'
import AddVehicle from './AddVehicle'
import ListVehicles from './ListVehicles'

class Vehicle extends Component {

  constructor(props) {
    super(props);
    this.state.vehicles = props.vehicles;
    this.handleAddVehicle = this.handleAddVehicle.bind(this);
  }

  state = {
    vehicles: {},
    showVehicleForm: false,
    showVehicleInfo: false
  }

  addToList = (vehicle) => {
    console.log("ADDING TO LIST " + vehicle);
    let d = this.state.vehicles;
    d.push(vehicle)
    this.setState({ vehicles: d });
    //alert(JSON.stringify(this.state.vehicles, null, 4));
  }

  handleAddVehicle() {
    if (this.state.showVehicleForm === false)
      this.setState({ showVehicleForm: true })
    else
      this.setState({ showVehicleForm: false })
  }

  render() {
    const { vehicles } = this.state
    const VehiclesList = vehicles.length ? (
      vehicles.map(vehicle => {
        return (
          <div className="vehicle card" key={vehicle._id}>
            <div className="card-content">
              <span className="card-title">{vehicle.first_name} {vehicle.last_name} {vehicle.vehicle} {vehicle.phone} </span>
            </div>
          </div>
        )
      })
    ) : (
        <div className="center">No registered vehicles</div>
      );

    return (
      <div>
        <Button variant="success" onClick={this.handleAddVehicle} >Add vehicle</Button>
        <Container className="addVehicle-form">
          {this.state.showVehicleForm ? <AddVehicle addToList={this.addToList} /> : null}
        </Container>
        <div className="container">
          <ListVehicles vehicles={this.state.vehicles} deleteVehicle={this.deleteVehicle} />
        </div>
      </div>
    )
  }

}

export default Vehicle