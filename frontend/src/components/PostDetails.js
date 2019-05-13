import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { fetchPosts } from '../actions/postActions';

class PostDetails extends Component {
    componentDidMount(){
        this.props.fetchPosts();
    } 
    render() {
        const post = this.props.postData ? (
            <Card className="mb-1 mt-4">
                <CardBody>
                    <CardTitle style={{color: "#17a2b8"}}>{this.props.postData.title}</CardTitle>
                    <CardSubtitle>{this.props.postData.body}</CardSubtitle>
                    <CardText className="mt-1 mb-1">{Date(this.props.postData.create_at)}</CardText>
                </CardBody>
            </Card>
        ) : (
            <div className="center">Loading Post...</div>
        )
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col className="text-left" sm={{ size: 10, offset: 1 }}>                
                        {post}
                        </Col>
                    </Row>
                </Container>
             </Fragment>            
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        postData: state.myarticles.items.find(post => {
            return post.id.toString() === ownProps.match.params.post_id
        })
    }
};

 
export default connect(mapStateToProps, {fetchPosts})(PostDetails);
