import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import CompanyNavbar from './CompanyNavbar';
import Driver from './Driver'
import Vehicle from './Vehicle'
import CompanyProfile from './CompanyProfile'
import axios from 'axios'
import CompanyHome from './CompanyHome'

class Company extends Component {

    state = {
        company: {},
        drivers: {},
        vehicles: {}
    }

    componentDidMount = () => {

        let jwtToken = window.localStorage.getItem("jwtToken");
        
        axios.get('http://localhost:4000/company/profile', { headers: { Authorization: jwtToken } } )
        .then(res => {
            this.setState({
                company: res.data
            })
        })

        axios.get('http://localhost:4000/company/drivers', { headers: { Authorization: jwtToken } } )
        .then(res => {
            this.setState({
                drivers: res.data
            })
            
            
        })

        axios.get('http://localhost:4000/company/vehicles', { headers: { Authorization: jwtToken } } )
        .then(res => {
            this.setState({
                vehicles: res.data
            })
        })

    }
    
    render() {
        return (
            <BrowserRouter>
                <div className = "App">
                    <CompanyNavbar />
                    <Route path='/company' component = { CompanyHome } />
                    <Route path='/profile' render={(props) => <CompanyProfile {...props} company = { this.state.company} />}/>
                    <Route path='/drivers' render={(props) => <Driver {...props} drivers = { this.state.drivers} />}/>
                    <Route path='/vehicles' render={(props) => <Vehicle {...props} vehicles = { this.state.vehicles} />}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default Company;