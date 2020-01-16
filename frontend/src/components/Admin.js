import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import AddCompany from './AddCompany'
import { Button, Container, Row } from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'
import Logout from './Logout'
import axios from 'axios'
import config from '../config'

class Admin extends Component {

    state = {
        companies: {}
    }

    componentDidMount = () => {

        let jwtToken = window.localStorage.getItem("jwtToken");
        
        axios.get(`${config.BASE_URL}/admin/company`, { headers: { Authorization: jwtToken } } )
        .then(res => {
            this.setState({
                companies: res.data
            })
        })

    }

    registerCompany = (company) => {
        let jwtToken = window.localStorage.getItem("jwtToken");
        axios.post(`${config.BASE_URL}/admin/company`, company, { headers: { Authorization: jwtToken } } )
        .then(res => {
            company._id = res.data._id;
            let companies = [...this.state.companies, company];
            this.setState({
                companies
            })
        })
    }

    deleteCompany = (id) => {
        console.log("Deleting company " + id);
        let jwtToken = window.localStorage.getItem("jwtToken");
        axios.delete(`${config.BASE_URL}/admin/company/${id}`, { headers: { Authorization: jwtToken } })
            .then(res => {
                const companies = this.state.companies.filter(company => {
                    return company._id !== id
                })
                this.setState({
                    companies
                })
            })

    }

    render() {

        const companyList = this.state.companies.length ? (
            this.state.companies.map(company => {
                
                
                return (
                    <div className = "collection-item" key = { company._id }>
                        <span style={{margin: "40px"}}>{ company.name }</span>
                         <Button variant = "danger" onClick = { () => { this.deleteCompany(company._id) } }> Delete </Button>
                         <br></br><br></br>
                    </div>
                )
            })
        ) : (
            <p className = "center"> You have no companies registered. </p>
        );

        return(
            <BrowserRouter>
                <div className="App">
                    <AdminNavbar />
                    <br></br>
                    <Route exact path='/logout' component={Logout} />
                    </div>

                    <div className = "admin-panel">
                    <Container>
                        <Row className='justify-content-center'>
                            <div className = "center">
                                { companyList }
                            </div>
                        </Row>
                    </Container>
                    <br></br>
                    <AddCompany registerCompany = {this.registerCompany} />
            </div>
            </BrowserRouter>
           
        )
    }

}

export default Admin;