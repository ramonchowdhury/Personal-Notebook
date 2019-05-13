import React, { Component, Fragment }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { fetchPosts, deletePost } from '../actions/postActions';
import  Postform from './Postform';

class Posts extends Component{
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          ItemId: null
        };
      }

    toggle = (e) =>{
       this.setState({
            modal: !this.state.modal,
            ItemId: e.target.id
        });
    }
    dosomething = () =>{
        this.props.deletePost(this.state.ItemId);
        this.setState({
        ...this.state,
         modal: !this.state.modal,
         ItemId: null
       });
      }
    componentDidMount(){
        this.props.fetchPosts();
        setTimeout(() => {
            const token = localStorage.getItem('token');
            if (token === null) {
                this.props.history.push('/login');
            }
        }, 100);        
    } 
    componentWillReceiveProps(nextPorps) {
        if(nextPorps.newPost){
            this.props.posts.unshift(nextPorps.newPost);
        }
    }
    render () {
        return (
            <Fragment>
                <Postform /> 
                <Container>
                    <Row>
                        <Col className="text-left" sm={{ size: 10, offset: 1 }}>                
                           {
                            this.props.posts.map(post => (
                                <Card key={post.id} className="mb-1">
                                    <Col className="text-right ml-3">
                                    <button className="btn btn-danger" onClick={this.toggle} id={post.id}>Delete </button>
                                    </Col>
                                    <CardBody>
                                    <CardTitle><Link to={`/post/${post.id}`} style={{color:"#17a2b8", textDecoration: "none"}}>{post.title}</Link></CardTitle>
                                    <CardSubtitle>{post.body.substr(0, 100) + "..."}</CardSubtitle>
                                    <CardText className="mt-1 mb-1">{Date(post.create_at)}</CardText>
                                    </CardBody>
                                </Card>
                            ))
                           }
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Are You Sure?</ModalHeader>
                                <ModalFooter>
                                    <button  className="btn btn-danger"onClick={this.dosomething}>Delete</button>{' '}
                                    <button className="btn" onClick={this.toggle}>Cancel</button>
                                </ModalFooter>
                            </Modal>   
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    posts: state.myarticles.items,
    newPost: state.myarticles.item
});
 
export default connect(mapStateToProps, {fetchPosts, deletePost })(Posts);