import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {  Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import * as actions from '../actions/authActions';

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
    }
    componentWillMount() {
        const token = localStorage.getItem('token');
        if (token !== null) {
           this.props.history.push('/');
        }
    }
    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })            
        
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.tryReg.error === null){
            this.props.history.push('/login');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        this.props.onAuth(this.state.username, this.state.email, this.state.password, this.state.password);       
      }

  render() {
    const customStyle = {
        border: "1px solid #e4e4e4", 
        padding: "20px", 
        borderRadius: "1%" 
    }    
    let errorMessage = null;
    if (this.props.tryReg.error) {
        errorMessage = "username and password doesn't match.";
    }
    return (
    <Container>
        <Row>
            <Col sm={{ size: 4, offset: 4 }} className="mt-5 stylee" style={customStyle}>
                <h3 className="text-left mb-2">Create Account</h3>

                {   
                    this.props.tryReg.loading ?
                    <h4>Loading...</h4>                 
                    :
                    errorMessage &&
                    <Alert color="danger" style={{fontSize:"13px"}}>
                        {errorMessage}
                    </Alert>
                }
                <Form className="text-left" onSubmit={this.handleSubmit}>
                    <FormGroup row>
                    <Col>
                    <Label>Username</Label>
                        <Input type="text" name="username" onChange={this.handleChange} value={this.state.username}  placeholder="Username" required/>
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col>
                        <Label>Email</Label>
                        <Input type="email" name="email" onChange={this.handleChange} value={this.state.email}  placeholder="Email" required/>
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col>
                        <Label>Password</Label>
                        <Input type="password" name="password" onChange={this.handleChange} value={this.state.password}  placeholder="Password" required/>
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col>
                            <Button color="info" block>Create Account</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Link to="/login">Have already an account</Link>
            </Col>
        </Row>
    </Container>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        tryReg: state.auth,
        loading: state.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password) => dispatch(actions.authSignup(username, email, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);