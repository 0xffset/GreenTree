import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
//firebase import 
import FIREBASE_CONFIG from '../auth/firebase';
//withRouter import 
import {withRouter} from 'react-router';
//bootstrap framework
import { Button, FormGroup, FormControl } from 'react-bootstrap';
//styles
import '../App.css'
import render from 'react-dom'
//handler to db firebase
import  {firebaseHandler} from'../auth/handlerFirebase';

const instance = new firebaseHandler();

//function to build a oject with the dates
const saveTo = (name, email, uid) => {
    //get the current date
    var CurrentDate = new Date();
   //split date
    var date = CurrentDate.getDate();
    var mouth = CurrentDate.getMonth();
    var year = CurrentDate.getFullYear();
    var hoursAndMinutes = CurrentDate.toLocaleTimeString();
  //build a new date
  var formated_date = hoursAndMinutes  + " ~ " +(mouth+1) + "/" + date + "/" + year;
 
   
    const state = {
        code: Math.floor(Math.random() * 10000),
        name: name,
        email: email,
        created_at: formated_date,
        uid: uid
    }
    instance.saveTo(state);
}





const SignUp = ({ history }) => {
    //Arrow function to handler Sign up dates
    const handlerSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password, name } = event.target.elements;
        try {
       const userAuth =  await FIREBASE_CONFIG
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(function(data) {
                return data.user.uid
               console.log()
            })
    
            //setting the dates to db
            console.log(userAuth)
            saveTo(name.value, email.value, userAuth)
            history.push('/') 
            
           
           
           
           


        }
        catch(e) {
            const error = String(e)
            console.log(error)
            render.render(<div className="custom-alert alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Oops!</strong> {error}
            </div>, document.getElementById("alerts"))
            
            
        }
    }, []);

    return (
        <div className="d-flex container justify-content-center">
            <div className="col-md-6 container-signin">
            <div className="text-center">
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={handlerSignUp}>
            <FormGroup className="form" controlId="signin" size="large">
                 <label>Full name</label>
                    <FormControl id="input" className="form-control" autoFocus
                        type="text"
                        name="name"
    
                        
                         />
                </FormGroup>
                <FormGroup className="form" controlId="signin" size="large">
                 <label>Email</label>
                    <FormControl id="input" className="form-control" autoFocus
                        type="text"
                        name="email"
    
                        
                         />
                </FormGroup>
                <FormGroup className="form" controlId="signin" size="large">
                 <label>Password</label>
                    <FormControl id="input"  className="form-control" 
                        type="password"
                        name="password"
                         />
                </FormGroup>
                
                <Link to="/" className="link" id="href">I have an account</Link>
                <Button className="btn btn-light btn-outline-dark" block size="large" type="submit">Sign Up</Button>
            </form>
            </div>
        </div>
      );
    };
export default withRouter(SignUp);
