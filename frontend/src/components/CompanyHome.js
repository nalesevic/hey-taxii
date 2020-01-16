import React, { Component } from 'react';
import axios from 'axios';
import Background from './../img/bckgrnd.jpg'
import Charts from './Charts'
import Social from './../img/social.png'

class CompanyHome extends Component {

  render() {
    return (
      <div className="home">
        <div className="justify-content-center">
            <Charts />
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <div className="footer" style={{background: "#24202b"}} >
          <div className="thank"  >
            <h3 style={{color: "white"}}>Thank you for purchasing Hey<span style={{ color: '#ffff00' }}>Taxi</span> </h3>
          </div>
          <div className="contact">
            <h4 style={{color: "white"}}>You can reach us by</h4>
            <img
              src={Social}
              height={55}
              className="d-inline-block align-top"
            />
          </div>
        </div>
        </div>
      </div>
    )

  }

}

export default CompanyHome