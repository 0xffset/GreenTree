import React, { Component } from "react";
//Modals
import Modal from 'react-awesome-modal';


//Modlas Component 
export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <section>
                <h1>Oops!</h1>
                <input type="button" value="Open" onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1>Oops!</h1>
                        <p>This account already exist</p>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
            </section>
        );
    }



}