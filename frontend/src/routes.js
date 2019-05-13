import React from'react';
import { Route, Switch } from 'react-router-dom';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import Login from './components/Login';
import Signup from './components/Signup';

const BaseRouter = () => (
    <Switch>
        <Route exact path='/' component={Posts}/>
        <Route path='/post/:post_id/' component={PostDetails}/>
        <Route path='/login/' component={Login}/>
        <Route path='/signup/' component={Signup}/>
    </Switch>
);
export default BaseRouter;
