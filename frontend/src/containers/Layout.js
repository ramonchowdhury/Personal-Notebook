import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
import * as actions from '../actions/authActions';

class Layout extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token === null) {
           this.props.history.push('/login');
        }
    }
    handleLogout = () => {
        this.props.logout();
        this.props.history.push('/login');
    }

    render() {
        const token = localStorage.getItem('token');
        return (
            <div>
                { token !== null &&
                        <Navbar color="dark" dark expand="md">
                        <NavbarBrand href="/">NoteBook</NavbarBrand>
                        <Collapse  navbar>
                          <Nav className="ml-auto" navbar>
                            <NavItem>
                              <NavLink to="/" style={{color: "#fff"}}>{localStorage.getItem('username')}</NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink style={{cursor: "pointer", color: "#fff"}} onClick={this.handleLogout}>Logout</NavLink>
                            </NavItem>
                          </Nav>
                        </Collapse>
                      </Navbar>
                }
                {this.props.children}
            </div>
        )
    }
}
/*
const mapStateToProps = (state) => {
    return {
        tryLogin : state.auth
    }
}
*/
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}
export default withRouter(connect(null, mapDispatchToProps)(Layout));