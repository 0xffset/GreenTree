import React from 'react';
import ReactDom from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import SignUp from './views/signUp';
import SignIn from './views/signIn';
import Home from './views/home';
import AI from './accions/AI'
import  MapContainer from './views/components/maps'


import * as server from './serviceWorker';
const ROUTING = (
    <Router>
        <div>
            <Route path="/" exact component= {SignIn} />
            <Route path="/signup" component= {SignUp} />
            <Route path="/home/:code" component= {Home} />
            <Route path="/test" component={MapContainer} />
            
        </div>
    </Router>
)

ReactDom.render(ROUTING, document.getElementById('app'));

server.unregister();