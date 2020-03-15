
import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import AI from '../../accions/AI';
// :smile 

import {Redirect ,Link} from 'react-router-dom'
import FIREBASE from './../../auth/firebase'

import {localstorage} from '../../accions/localstorege'
const getLocalStorage = new localstorage();
const getCode = new localstorage();

class UIHeader extends React.Component {

    constructor(props)
    {
        super(props)
        this.code = getCode.getItemLocalStorege("codeUser")
        this.LogOut = this.LogOut.bind(this);
        this.ref = FIREBASE.firestore().collection("users").where("code", "==", parseInt(this.code))
        this.val = null
        
      
       
       
        const authToken = getLocalStorage.getItemLocalStorege("authToken")
        
        let loggedIn = true
        if (authToken == null) {
            loggedIn = false
        }
        this.state = {
          users: [],
          loggedIn
        }
}
    

     onCollectionUpdate = (querySnapshot)=> {
      const users = []
      querySnapshot.forEach(function(doc) {
      const {code, created_at, email, name} = doc.data();
      users.push({
       key: doc.id,
       code: code,
       doc,
       created_at,
       email,
       name,
     });

    });
    this.setState({
      users
    })
  }

     
   

     componentDidMount()
     {
        this.val = this.ref.onSnapshot(this.onCollectionUpdate)
      
     }
    
    LogOut(e) {
       
        getLocalStorage.removeItemLocalStorage("authToken")
        getLocalStorage.removeItemLocalStorage("codeUser")
    }
    showModalClick() {
      return <AI />
    }
     

    render() {
      

     

        if (this.state.loggedIn === false) {
                return <Redirect to="/" />
        }
        return (
          
           <>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link> <a className="navbar-brand">GreenTree</a></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
    <div className="nav navbar-nav navbar-right">
      <a   className="nav-item nav-link" onClick={() => {this.LogOut()}}><Link to="/">Log Out</Link></a>
      
    </div>
  </div>
</nav>
<div className="button">
<button type="button"  className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Run</button>
</div>
<div className="user-profile">
 <div className="user">



<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Running...</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">  
      <AI />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>

  
 {this.state.users.map((users, i) =>
 <ul className="ul-user">
    <li className="date">Code: {users.code} </li>
    <li className="date">Name: {users.name} </li>
    <li className="date">Email: {users.email } </li>
    <li className="date">Created at: {users.created_at}</li>
    </ul>
    
   
    
    )}

 </div>






   
</div>

          </>
        );
    }
}




export default UIHeader;