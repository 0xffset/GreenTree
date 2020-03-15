
import React from 'react'
import {localstorage} from '../accions/localstorege'
import {firebaseHandler} from '../auth/handlerFirebase'
import {Redirect} from 'react-dom'
import * as coco from '@tensorflow-models/coco-ssd'
import { Alert } from 'react-bootstrap'
const instance = new firebaseHandler();


const getCode = new localstorage();
//Tensorflow 
//import * as tf from '@tensorflow/tfjs'


class AI extends React.Component {
    constructor()
    {
        super()
        this.state = {
            position: []
        }
    }
    videoREF = React.createRef();
    canvasREF = React.createRef();
    
   
    styles = {
        position: 'relative',
        display: 'flex',
        top: '150',
        left: '150',
        
    }

    

    detectVideoFrame = (model, video) => {
        model.detect(video).then((predict) => {
            this.getDetections(predict);

            requestAnimationFrame(() => {
                this.detectVideoFrame(model, video);
                this.getDetections(predict)
            }, 1000);
        }, (error) => {
            //console.log("Error")
            console.error(error)
        });

    }

    getDetections = predict => {
        const context = this.canvasREF.current.getContext("2d");
        context.clearRect(0, 0, context.width, context.height);
        let font = "20px arial";
        context.font = font;
        context.textBaseline = "top";

        predict.forEach(predict => {
            let x = predict.bbox[0];
            let y = predict.bbox[1];
            let width = predict.bbox[2];
            let height = predict.bbox[3];

            //Draw
            context.strokeStyle = "#0026ff";
            context.lineWidth = 1;
            context.strokeRect(x, y, width, height);

            context.fillStyle = "#0026ff";
            let textWidth = context.measureText(predict.class).width;
            let textHeight = parseInt(font, 10);

            context.fillRect(x, y, textWidth + 10, textHeight + 10);
            context.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

            context.fillStyle = "#000000";
            context.fillText(predict.class, x, y)
            this.checkBottle(predict.class)
            console.log(predict.class);
            context.fillText(predict.score.toFixed(2), x, y + height - textHeight);
        })

    }

    //Funtion to check the bottles 
    checkBottle = (nameBottle) => {
        if (nameBottle === 'bottle') {
        this.pushBottles()
            return true
        } else  {
            
            return false
        }

    }


     pushBottles() {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(position => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let code = "B" + Math.floor(Math.random() * 10000);
                let userCode = getCode.getItemLocalStorege("codeUser");

                const state = {
                    Latitude: latitude,
                    Longitude: longitude,
                    code: code,
                    code_user: parseInt(userCode)
                }
                console.log(state)

                instance.saveBottler(state.code, state.Latitude, state.Longitude, state.code_user);
                return  <Redirect to={"/home/" + state.code} />
            });
        }

        else {
            alert("Active the API location, reload...");
        }
    }

    showDetection() {
        if (navigator.mediaDevices.getUserMedia) {
            const webCam = navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: false
            })
            .then(stream => {
                window.stream = stream
                this.videoREF.current.srcObject = stream;

                return new Promise(resolve => {
                    this.videoREF.current.onloadedmetadata = () => {
                        resolve();
                    };
                });
            }, (error) => {
                // console.log("Error")
            });

        //Start with AI
        const loadModel = coco.load();
        Promise.all([loadModel, webCam])
        .then(values => {
            this.detectVideoFrame(values[0], this.videoREF.current);
            
        })
        .catch(err => {
            console.error(err)
        });
        
        
        
    
}  
    }
    componentDidMount() {
       this.timer = setInterval(
       () => this.showDetection(),
       5000,
       );
             
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <>
                <div>
                    <video
                        style={this.styles}
                        autoPlay
                        muted
                        ref={this.videoREF}
                        width="720"
                        height="600"
                    />

                    <canvas style={this.styles} ref={this.canvasREF} width="720" height="650" />
                </div>
            </>
        )
    }
}




export default AI