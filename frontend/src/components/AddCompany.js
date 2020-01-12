import React, {Component} from 'react'
import { Form, Button, Container, Row } from 'react-bootstrap'

class AddCompany extends Component {
    
    state = {
        companyName: '',
        companyEmail: '',
        companyPassword: ''
    }

    handleNameChange = (e) => {
        this.setState({
            companyName: e.target.value,
        })
    }

    handleEmailChange = (e) => {
        this.setState({
            companyEmail: e.target.value,
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            companyPassword: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.companyPassword)
        this.props.registerCompany(this.state);
        this.setState({
            companyName: '',
            companyEmail: '',
            companyPassword: ''
        })

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
                                <Form.Control name='companyName' type="text" onChange = { this.handleNameChange } placeholder="Enter company name" value = { this.state.companyName } />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control name='companyEmail' type="text" onChange = { this.handleEmailChange } placeholder="Enter company email" value = { this.state.companyEmail }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name='companyPassword' type="text" onChange = { this.handlePasswordChange } placeholder="Enter company password" value = { this.state.companyPassword } />
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