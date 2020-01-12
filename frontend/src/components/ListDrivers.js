import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import DriverInfo from './DriverInfo'

class ListDrivers extends Component {

    state = {
        showDriverInfo: false,
        driverID: ''
    }

    driverInfo = (driverID) => {
        console.log("bil vidio sta " + this.state.showDriverInfo);
        if (this.state.showDriverInfo === false) {
            this.setState({ showDriverInfo: true })
            this.setState({driverID: driverID});
        }
        else
            this.setState({ showDriverInfo: false })
        console.log("bil vidio sta poslije " + this.state.showDriverInfo);
    
      }

      render() {
          const driverList = this.props.drivers.length ? (
              this.props.drivers.map(driver => {
                  return (
                      <div className="collection-item" key={driver._id}>
                          <span onClick={() => { this.driverInfo(driver._id) }}>{driver.first_name} <Button variant="danger" onClick={() => { this.props.deleteDriver(driver._id) }}>DELETE</Button> </span>
                          {this.state.showDriverInfo && this.state.driverID === driver._id ? <DriverInfo driverID={this.state.driverID} /> : null}
                      </div>
                  )
              })
          ) : (
                  <p className="center">No registered drivers</p>
              );
          return (
              <div className="driverss collection">
                  {driverList}
              </div>
          )

      }

}
export default ListDrivers;