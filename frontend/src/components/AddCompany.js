import React, {Component} from 'react'
import { Form, Button, Container, Row } from 'react-bootstrap'
import axios from 'axios'

class AddCompany extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    state = {
        name: '',
        email: '',
        password: ''
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.registerCompany(this.state);
    }

    render() {
        return (

            <div className = "admin-panel">

            <div className = "addCompany-form">
                <Container>
                    <Row className='justify-content-center'>
                    
                        <Form onSubmit={this.handleSubmit}>
                        <br></br>
                            <Form.Group>
                                <Form.Label>Company name:</Form.Label>
                                <Form.Control name='name' type="text" onChange = { this.handleChange } placeholder="Enter company name" value = { this.state.companyName } />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control name='email' type="email" onChange = { this.handleChange } placeholder="Enter company email" value = { this.state.companyEmail }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name='password' type="password" onChange = { this.handleChange } placeholder="Enter company password" value = { this.state.companyPassword } />
                            </Form.Group>

                            <Button variant="success" type="submit" onClick={this.registerCompany}>
                                Register
                            </Button>
                            <br></br> <br></br>
                        </Form>

                    </Row>
                </Container>
               
            </div>

            </div>
        )
    }
}

export default AddCompany;