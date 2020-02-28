//import react 
import React, {useCallback} from 'react'
//import bootstrap componets
import { Button, FormGroup, FormControl } from 'react-bootstrap';
//import Link 
import {Redirect, Link } from 'react-router-dom';
//withRouter import 
import {withRouter} from 'react-router';
//call our firebase config
import FIREBASE_CONFIG from '../auth/firebase';
//import localstorege accions
import {localstorage} from '../accions/localstorege'
//Import firebase accions
import  {firebaseHandler} from'../auth/handlerFirebase';

import render from 'react-dom';

//localstorege intance
const intanceLocalStorege = new localstorage();
//firebase intance
const intance = new firebaseHandler();

//function to handler the signIn submit

const SignUp = ({ history }) => {

    

    const handleSignUp = useCallback(async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
      
     await    FIREBASE_CONFIG
          
          
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then(set => {
              
            
         })

        
           FIREBASE_CONFIG.auth().onAuthStateChanged(async function(user) {
             if(user) {
                 var useruid = user.uid;
                 intanceLocalStorege.setItemLocalStorege("authToken", String(useruid))
                 const code =  await intance.getCode(useruid);
                 code.forEach(function(child) {

                  const authToken = intanceLocalStorege.getItemLocalStorege("authToken")
        
                  const code = child.val().code;
                  history.push(`/home/${code}`)
                 })
                
             }

        })
          
        
      }

      
      
      
      catch (error) {
        const e = String(error)
        render.render(<div id="alert" className="custom-alert alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Oops!</strong> {e}
       
      </div>, document.getElementById("alerts"))
      
      }
    }, [history]);
  
    return (
      <div className="d-flex container justify-content-center">
          <div className="col-md-6 container-signin">
          <div className="text-center">
              <h1>Sign In</h1>
          </div>
          <form onSubmit={handleSignUp}>
              <FormGroup className="form" controlId="signin" size="large">
               <label>Email</label>
                  <FormControl className="form-control" id="input" autoFocus
                      type="text"
                      name="email"
  
                      
                       />
              </FormGroup>
              <FormGroup className="form" controlId="signin" size="large">
               <label>Password</label>
                  <FormControl  id="input"className="form-control" 
                      type="password"
                      name="password"
                       />
              </FormGroup>
              
              <Link to="/signup/" className="link" id="href">or create a account</Link>
              <Button  className="btn btn-light btn-outline-dark" block size="large" type="submit">Sign In</Button>
          </form>
          </div>
      </div>
    );
  };
  
  export default withRouter(SignUp);