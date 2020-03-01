
import FIREBASE from './firebase'





export class firebaseHandler {
   

    async saveTo(object) {
        return  await FIREBASE.database().ref('users/' + object.uid).push(object);
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