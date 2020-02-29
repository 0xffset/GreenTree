import React from 'react'
import Historial from './historial.js'


export default class profileUser extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            POINTS: 100,
            BOTTLES: 100,

        }
    }


    render() {
        return (
            <>
             <div className="inc-profile-container">
                 <div>
                     <h4>Points</h4>
                        <p className="points">{this.state.POINTS}</p>
                 </div>
                 <div>
                     <h4>Bottles</h4>
                     <p className="bottles">{this.state.BOTTLES}</p>
                 </div>
            </div>
            <Historial />
            </>

        );
    }
}