import React, {Componet} from 'react'
//HEADER
import UIHeader from './components/header'
import ProfileUser from './components/totalPoints'


export default class App extends React.Component {
    
    render() {
        return (
            <>
            <UIHeader />
            <ProfileUser />
            
            </>
        )
    }
}

