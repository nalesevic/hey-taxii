import React, { Component } from 'react';
import axios from 'axios';
import Background from './../img/bckgrnd.jpg'
import Social from './../img/social.png'

class CompanyHome extends Component {

  render() {
    return (
      <div className="home">
        <div className="justify-content-center">
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <div className="thank" >
            <h1 style={{color: "black"}}>Thank you for purchasing Hey<span style={{ color: '#ffff00' }}>Taxi</span> </h1>
          </div>
          <div className="contact">
            <h3 style={{color: "black"}}>You can reach us by</h3>
            <img
              src={Social}
              height={255}
              className="d-inline-block align-top"
            />
          </div>
        </div>
      </div>
    )

  }

}

export default CompanyHome