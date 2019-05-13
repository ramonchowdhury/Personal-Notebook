import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { createPost } from '../actions/postActions';


class Postform extends Component{
    state = {
        title: '',
        body: ''
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            title: this.state.title,
            body: this.state.body
        }
       // this.props.createPost(postData);
        this.props.onPost(postData);
        this.setState({title:'', body:''});
        
    } 

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={{ size: 10, offset: 1 }} className="mt-4">
                        <Form className="text-left" onSubmit={this.handleSubmit}>
                            <FormGroup>
                            <Input type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Title"/>
                            </FormGroup>
                            <FormGroup>
                            <Input type="textarea" name="body" onChange={this.handleChange} value={this.state.body} placeholder="Your Post"/>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={2}>
                                    <Button color="info" block>Post</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>             
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPost: (postData) => dispatch(createPost(postData)) 
    }
}

export default connect(null, mapDispatchToProps)(Postform);
//export default connect(null, {createPost})(Postform);