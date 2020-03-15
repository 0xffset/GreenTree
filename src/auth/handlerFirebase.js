
import FIREBASE from './firebase'
import {Redirect} from 'react-dom';
import React from 'react'



export class firebaseHandler {
   

    async saveTo(object) {
        return  await FIREBASE.database().ref('users/' + object.uid).push(object);
 }

 async saveBottler(object)
 {  
     const response =  await FIREBASE.database().ref('bottles/' + object.uid).push(object);
     console.log(response)
 }

 async savePoints(object)
 {
     return await FIREBASE.database().ref('points/' + object.uid).push(object);
 }

getCode(uid) {
       
    
    const ref = FIREBASE.database().ref();
    const refChild = ref.child('users/' + uid);
    return   refChild.once("value", function(snapshot) {
        
    });
}

createdNewUser(code, created_at, email, name) {
   
    const ref = FIREBASE.firestore().collection('users');
    ref.add({
        code,
        created_at,
        email,
        name,

    }).then(() => console.log("New user"));
}

 saveBottler(code, latitude, longitude, codeUser)
{  
    const ref = FIREBASE.firestore().collection('bottles');
    ref.add({
        code, 
        latitude,
        longitude,
        codeUser


    }).then(() => {
     return   <Redirect to={"/home/" + code} />
    })
   
}


}