import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap'
import DriverInfo from './DriverInfo'

class ListDrivers extends Component {

    constructor(props) {
        super(props);
        this.state.drivers = props.drivers;
        this.collapseInfo = this.collapseInfo.bind(this);
    }

    state = {
        showDriverInfo: false,
        driverID: ''
    }

    driverInfo = (driverID) => {
        if (this.state.showDriverInfo === false) {
            this.setState({ showDriverInfo: true })
            this.setState({ driverID: driverID });
        }
        else
            this.setState({ showDriverInfo: false })
    }

    collapseInfo = (s) => {
        this.setState({ showDriverInfo: s });
    }

    render() {
        const driverList = this.props.drivers.length ? (
            this.props.drivers.map(driver => {
                return (
                    <div className="collection-item" key={driver._id}>
                        <br></br> <br></br>
                        <Container className="border">
                            <span onClick={() => { this.driverInfo(driver._id) }}>{driver.first_name} </span>
                            {this.state.showDriverInfo && this.state.driverID === driver._id ? <DriverInfo showInfo={this.collapseInfo} driverID={this.state.driverID} drivers={this.state.drivers} /> : null}
                        </Container>
                      </div>
                )
            })
        ) : (
                <p className="center">No registered drivers</p>
            );
        return (
            <div className="drivers collection">
                {driverList}
            </div>
        )

    }

}
export default ListDrivers;