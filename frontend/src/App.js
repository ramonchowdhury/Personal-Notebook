import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from'./routes';
import * as actions from './actions/authActions';
import Layout from './containers/Layout';


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSingup();
  } 
  render() {
    return (
        <div>
          <Router>
            <Layout> 
              <BaseRouter />
            </Layout>
          </Router>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSingup: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);

