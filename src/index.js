import React from 'react';
import ReactDom from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import SignUp from './views/signUp';

import * as server from './serviceWorker';
const ROUTING = (
    <Router>
        <div>
            <Route path="/" exact component= {SignUp} />
           
        </div>
    </Router>
)

ReactDom.render(ROUTING, document.getElementById('app'));

server.unregister();