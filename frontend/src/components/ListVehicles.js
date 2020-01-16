import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import VehicleInfo from './VehicleInfo'

class ListVehicles extends Component {

    constructor(props) {
        super(props);
        this.state.vehicles = props.vehicles;
        this.collapseInfo = this.collapseInfo.bind(this);
    }

    state = {
        showVehicleInfo: false,
        vehicleID: ''
    }

    vehicleInfo = (vehicleID) => {
        if (this.state.showVehicleInfo === false) {
            this.setState({ showVehicleInfo: true })
            this.setState({vehicleID: vehicleID});
        }
        else
            this.setState({ showVehicleInfo: false })
      }

      collapseInfo = (s) => {
          this.setState({showVehicleInfo: s});
      }

      render() {
          const vehicleList = this.props.vehicles.length ? (
              this.props.vehicles.map(vehicle => {
                  return (
                      <div className="collection-item" key={vehicle._id}>
                          <span onClick={() => { this.vehicleInfo(vehicle._id) }}>{vehicle.manufacturer} </span>
                          {this.state.showVehicleInfo && this.state.vehicleID === vehicle._id ? <VehicleInfo showInfo={this.collapseInfo} vehicleID={this.state.vehicleID} vehicles={this.state.vehicles} /> : null}
                      </div>
                  )
              })
          ) : (
                  <p className="center">No registered vehicles</p>
              );
          return (
              <div className="vehicles collection">
                  {vehicleList}
              </div>
          )

      }

}
export default ListVehicles;