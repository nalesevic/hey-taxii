import React, {Component} from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap'
import axios from 'axios'

class CompanyProfile extends Component {

    constructor(props) {
        super(props);
        this.state.company = props.company;
        //alert(JSON.stringify(this.state.company, null, 4));
      }
    

    state = {
        company: {
            companyAddress: '',
            companyPhone: '',
            companyPassword: '',
            companyName: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Update company");
        let jwtToken = window.localStorage.getItem("jwtToken");
        console.log(jwtToken);
        const data = {
            name: this.state.companyName,
            password: this.state.companyPassword,
            address: this.state.companyAddress,
            phone: this.state.companyPhone
        }
        const headers = {
            'Authorization': jwtToken
        }

        axios.post('http://localhost:4000/company/profile', data, { headers: headers } )
        .then(res => {
            this.setState({
                company: res.data
            })
        })

    }

    handleNameChange = (e) => {
        this.setState({
            companyName: e.target.value,
        })
    }

    handleAddressChange = (e) => {
        this.setState({
            companyAddress: e.target.value,
        })
    }

    handlePhoneChange = (e) => {
        this.setState({
            companyPhone: e.target.value,
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            companyPassword: e.target.value,
        })
    }


    render() {
        return (
            <div className = "company-info">
                
                <Container>
                    <Row className='justify-content-center'>
                    
                        <Form onSubmit={this.handleSubmit}>
                        <br></br>
                            <Form.Group>
                                <Form.Label>Company name:</Form.Label>
                                <Form.Control name='companyName' type="text" onChange = { this.handleNameChange }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Company address:</Form.Label>
                                <Form.Control name='companyAddress' type="text" onChange = { this.handleAddressChange }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Company phone:</Form.Label>
                                <Form.Control name='companyPhone' type="text" onChange = { this.handlePhoneChange }  />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name='companyPassword' type="password" onChange = { this.handlePasswordChange } />
                            </Form.Group>

                            <Button variant="success" type="submit" onClick = {this.updateCompany}>
                                Update
                            </Button>
                            <br></br> <br></br>
                        </Form>

                    </Row>
                </Container>
               
            </div>

        )
    }

}

export default CompanyProfile