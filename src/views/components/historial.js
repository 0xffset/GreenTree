import React from 'react'
import { localstorage } from './../../accions/localstorege'
import FIREBASE from './../../auth/firebase'
const ls = new localstorage()
export default class Historial extends React.Component {
    constructor(props) {
        super(props)
        this.code = ls.getItemLocalStorege("codeUser")
        this.ref = FIREBASE.firestore().collection("bottles").where("codeUser", "==", parseInt(this.code))
        this.val = null;
        this.state = {
            historial: []
        }
    }

    onShowCollection = (querySnapshot) => {
        const historial = []
        querySnapshot.forEach(function (values) {
            const { code, latitude, longitude } = values.data();
            historial.push({
                code,
                latitude,
                longitude,
            });
        });
        this.setState({
            historial
        })
    }

    componentDidMount() {
        this.val = this.ref.onSnapshot(this.onShowCollection)
    }

    render() {

        return (
            <>
                <h3>Historial</h3>

                {this.state.historial.map(historial =>
                    <ul className="historial">
                        <li className="historial-li">Code: {historial.code} | Latitude: {historial.latitude} | Longitude: {historial.longitude}</li>

                    </ul>

                )}


            </>
        );
    }
}