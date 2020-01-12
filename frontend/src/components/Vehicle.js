import React, { Component } from 'react'

class Vehicle extends Component {
    
  constructor(props) {
    super(props);
    this.state.vehicles = props.vehicles;
  }

  state = {
      vehicles: []
  }
  
  render() {
      const { vehicles } = this.state
      const vehiclesList = vehicles.length ? (
        vehicles.map(vehicle => {
          return (
            <div className="vehicle card" key={vehicle._id}>
              <div className="card-content">
                <span className="card-title">{vehicle.model}</span>
                <p>{vehicle.body}</p>
              </div>
            </div>
          )
        })
      ) : (
        <div className="center">No registered vehicles</div>
      );
  
      return (
        <div>
          <div className="container">
            {vehiclesList}
          </div>
        </div>
      )
  }
}

export default Vehicle