import React from 'react'
import Historial from './historial.js'
import { localstorage } from './../../accions/localstorege'
import FIREBASE from './../../auth/firebase';
const ls = new localstorage();
var bottles_GLOBAL = window.$bottles_GLOBAL;
var poinst_GLOBAL = window.$bottles_GLOBAL;
// asdad
export default class ProfileUser extends React.Component {
  
    constructor(props) {
        super(props)
        this.code = ls.getItemLocalStorege("codeUser")
        this.ref = FIREBASE.firestore().collection("bottles").where("code_user", '==', parseInt(this.code))
        this.refPoints = FIREBASE.firestore().collection("points").where("code_user", "==", parseInt(this.code))
        this.bottles = null
        this.points = null
        this.state = {
            points: [],
            bottles: [],
        };

    }

    async counterBottles() {
        var bottles = []

        const a = await this.ref.get()

            .then(querySnapshot => {
                let count = 0;

                querySnapshot.forEach(doc => {
                    count += 1;
                    bottles_GLOBAL = count



                });
                return bottles
            });

        this.setState({
            points: a,
            bottles: 0

        })
        return a;
    }

    async counterPoints() {
        var points = []
        const p = await this.refPoints.get()

            .then(querySnapshot => {
                var count = 1.5;
                querySnapshot.forEach(doc => {
                    count += 0.0500;
                    poinst_GLOBAL = count
                });
                return points

            });
        this.setState({
            bottles: p,
            points: 0
        })


        return p



    }
    async componentDidMount() {

        this.bottles = await this.counterBottles()
        this.points = await this.counterPoints()
        //  console.log(typeof this.bottles["count"] == "undefined")

    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="inc-profile-container">
                        <div>
                            <h4>Points</h4>
                            <p className="points">{poinst_GLOBAL ? poinst_GLOBAL : "0"}</p>
                        </div>
                        <div>
                            <h4>Bottles</h4>
                            <p className="bottles">{bottles_GLOBAL ? bottles_GLOBAL : "0"}</p>

                        </div>
                    </div>
                    <Historial />
                </div>
            </>


        );
    }
}