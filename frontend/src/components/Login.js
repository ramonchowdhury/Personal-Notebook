import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import * as actions from '../actions/authActions';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    componentWillMount() {
        const token = localStorage.getItem('token');
        if (token === null) {
           this.props.history.push('/login');
        }
        else{
            this.props.history.push('/')
        }
    }    
    componentWillReceiveProps(nextProps){
        if(nextProps.tryLogin.token !== null){
            this.props.history.push('/');
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();        
        this.props.onAuth(this.state.username, this.state.password);
      }
    SignupPage = () => {
        this.props.history.push('/signup');
    }
    render() {
        let errorMessage = null;
        if (this.props.tryLogin.error) {
            errorMessage = "username and password doesn't match.";
        }       
        const customStyle = {
            border: "1px solid #e4e4e4", 
            padding: "20px", 
            borderRadius: "1%" 
        }         
        return (
            <Container>
                <Row>
                    <Col sm={{ size: 4, offset: 4 }} className="mt-5 stylee" style={customStyle}>
                        <h3 className="text-left mb-2">Sign in</h3>
                        {   
                            this.props.tryLogin.loading ?
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
                                <Input type="text" name="username" onChange={this.handleOnChange} placeholder="Username" value={this.state.username} />
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Col>
                                <Label>Password</Label>
                                <Input type="password" name="password" onChange={this.handleOnChange} placeholder="Password" value={this.state.password}/>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Button color="info" block>Sign in</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        <FormGroup row>
                                <Col>
                                    <Button color="secondary" block onClick={this.SignupPage}>Create Account</Button>
                                </Col>
                            </FormGroup>
                    </Col>
                </Row>
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        tryLogin: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);