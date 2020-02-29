import React, { useState } from 'react'
import FIREBASE from './firebase'





export class firebaseHandler {
    constructor(){
    }

    async saveTo(object) {
        return  await FIREBASE.database().ref('users/' + object.uid).push(object);
 }

    async getId() {
        await FIREBASE.database().ref('users/' + 'FDBMhhP470ZRpKdFht9gIjGQgJ53').once("value", snapshot => {  
            console.log(snapshot.val().email)
            })
        
           
}


 getCode(uid) {
       
    
    const ref = FIREBASE.database().ref();
    const refChild = ref.child('users/' + uid);
    return   refChild.once("value", function(snapshot) {
        
    });
}

createdNewUser(code, created_at, email, name) {
    console.log("Hey")
    const ref = FIREBASE.firestore().collection('users');
    ref.add({
        code,
        created_at,
        email,
        name,

    }).then(() => console.log("New user"));
}

}