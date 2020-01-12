import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import AddCompany from './AddCompany'
import { Button, Container, Row } from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'
import Logout from './Logout'

class Admin extends Component {

    state = {
        companies : [
            { id: 1, companyName: "Crveni Taxi" },
            { id: 2, companyName: "Sarajevo Taxi" }
        ]
    }

    registerCompany = (company) => {
        company.id = Math.random(100);
        let companies = [...this.state.companies, company];
        this.setState({
            companies
        })
    }

    deleteCompany = (id) => {
        console.log("Deleting company " + id);
        
        const companies = this.state.companies.filter(company => {
            return company.id !== id
        })

        this.setState({
            companies
        })

    }

    render() {

        const companyList = this.state.companies.length ? (
            this.state.companies.map(company => {
                return (
                    <div className = "collection-item" key = { company.id }>
                        <span>{ company.companyName }</span>
                         <Button variant = "danger" onClick = { () => { this.deleteCompany(company.id) } }> Delete </Button>
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