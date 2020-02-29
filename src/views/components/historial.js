import React from 'react'


export default class Historial extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            id: 1,
            date: 'Mondey, Febrary 29,2010 ',
            location: 'Santo Domingo, Invimosa'
        }


        
    }

    




    render() {
        
        return (
            <>
            <h3>Historial</h3>
              <ul className="historial"><li className="historial-li">Holas</li></ul>
            </>
        );
    }
}