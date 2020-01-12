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
            address: '',
            phone: '',
            password: '',
            name: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Update company");
        let jwtToken = window.localStorage.getItem("jwtToken");
        console.log(jwtToken);
        const data = {
            name: this.state.name,
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phone
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
            name: e.target.value,
        })
    }

    handleAddressChange = (e) => {
        this.setState({
            address: e.target.value,
        })
    }

    handlePhoneChange = (e) => {
        this.setState({
            phone: e.target.value,
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
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
                                <Form.Control name='name' type="text" onChange = { this.handleNameChange }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Company address:</Form.Label>
                                <Form.Control name='address' type="text" onChange = { this.handleAddressChange }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Company phone:</Form.Label>
                                <Form.Control name='phone' type="text" onChange = { this.handlePhoneChange }  />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name='password' type="password" onChange = { this.handlePasswordChange } />
                            </Form.Group>

                            <Button variant="success" type="submit">
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