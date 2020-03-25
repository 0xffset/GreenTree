import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {localstorage} from '../../accions/localstorege'
import FIREBASE from '../../auth/firebase'

import axios from 'axios'

const ls = new localstorage()


 class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.code = ls.getItemLocalStorege("codeUser")
        this.ref = FIREBASE.firestore().collection("bottles").where("codeUser", "==", parseInt(this.code))
        this.state = {
            data: []
        };
        this.val = null

        this.array = []
        

    }
    onShowCollection = (querySnapshot) => {
        const data = []
        querySnapshot.forEach(function (values) {
            const { latitude, longitude } = values.data();
            data.push({
               
                latitude,
                longitude,
            });
        });
        this.setState({
            data
        })
    }

    getDates = async () => {
       let res =  await axios.get(`https://greentree-1a2c0.firebaseio.com/bottles.json?code_user=${this.code}`)
        .then(res => {
            return res.data
        })
       this.array  =  Object.values(res);
        //this.array = res
       this.array.forEach(element => {
          
           console.log(`${element['Latitude']} and ${element['Longitude']}`)
       });
            
        
       // console.log(this.array)
      
      
        
    }


  componentDidMount() {
    this.val = this.ref.onSnapshot(this.onShowCollection)
 
  }
  render() {
      
    
  
    return (
        
        <Map google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={5}>
        {this.state.data.map(element =>
            <Marker
            
            position={{lat: element.latitude, lng: element.latitude}} />

          )}
     
      
    
    </Map>
        
        
    );
  }
}
 
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDFHj_OpSfe4ES-7IYCyMJwTu69E028tRI")
  })(MapContainer)