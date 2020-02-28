import React from 'react'

import connect from 'redux'

import {Redirect ,Link} from 'react-router-dom'


import {localstorage} from '../../accions/localstorege'
const getLocalStorage = new localstorage();

class UIHeader extends React.Component {

    constructor(props)
    {
        super(props)
        this.LogOut = this.LogOut.bind(this);
        const authToken = getLocalStorage.getItemLocalStorege("authToken")
        
        let loggedIn = true
        if (authToken == null) {
            loggedIn = false
        }

        this.state = {
            loggedIn
        }

    

    }

    LogOut(e) {
       
        getLocalStorage.removeItemLocalStorage("authToken")
       
    }


    render() {

        if (this.state.loggedIn === false) {
                return <Redirect to="/" />
        }
        return (
           <>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">GreenTree</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
    <div className="nav navbar-nav navbar-right">
      <a   className="nav-item nav-link" onClick={() => {this.LogOut()}}><Link to="/">Log Out</Link></a>
      
    </div>
  </div>
</nav>
          </>
        );
    }
}



export default UIHeader;