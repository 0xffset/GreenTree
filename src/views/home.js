import React, {Componet} from 'react'
//HEADER
import UIHeader from './components/header'
import profileUser from './components/totalPoints'
import Historial from './components/historial'

export default class App extends React.Component {
    
    render() {
        return (
            <>
            <UIHeader />
            <profileUser />
            <Historial />
            </>
        )
    }
}

