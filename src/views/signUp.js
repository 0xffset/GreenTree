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





const SignUp = ({ history }) => {
    //Arrow function to handler Sign up dates
    const handlerSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await FIREBASE_CONFIG
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(res => {
                render.render(<div className="alertSuccess">The account was created successfully</div>, document.getElementById("alerts"))
                
            })


        }
        catch(e) {
            const error = String(e)
            console.log(error)
            render.render(<div className="alertError">{error}</div>, document.getElementById("alerts"))
            
            
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
                 <label>Email</label>
                    <FormControl className="form-control" autoFocus
                        type="text"
                        name="email"
    
                        
                         />
                </FormGroup>
                <FormGroup className="form" controlId="signin" size="large">
                 <label>Password</label>
                    <FormControl  className="form-control" 
                        type="password"
                        name="password"
                         />
                </FormGroup>
                
                
                <Button className="btn btn-light btn-outline-dark" block size="large" type="submit">Sign Up</Button>
            </form>
            </div>
        </div>
      );
    };
export default withRouter(SignUp);
