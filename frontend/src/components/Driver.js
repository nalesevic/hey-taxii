import React, {Component} from 'react';

class Driver extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicle: 'Volkswagen'
        }
    }

    componentDidMount = () => {
        console.log("Driver component mounted");
    }

    componentWillUnmount = () => {
        console.log("Driver component unmounted");
    }

}

export default Driver