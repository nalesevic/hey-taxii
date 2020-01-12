import React, {Component} from 'react'

class Logout extends Component{

    constructor(props) {
        super(props);
        window.localStorage.clear();
        props.history.push('/');
    }

    render() {
        return(
            <div>
                <h1>GOODBYE</h1>
            </div>
        )
    }
}

export default Logout;