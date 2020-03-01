import React from 'react'

//Tensorflow 
//import * as tf from '@tensorflow/tfjs'
import * as coco from '@tensorflow-models/coco-ssd'

class AI extends React.Component {
    videoREF = React.createRef();
    canvasREF = React.createRef();

    styles = {
        position: 'fixed',
        top: 150,
        left: 150
    }

    detectVideoFrame = (model, video) => {
        model.detect(video).then((predict) => {
            this.getDetections(predict);

            requestAnimationFrame(() => {
                this.detectVideoFrame(model, video);
                this.getDetections(predict)
            }, 300);
        }, (error) => {
            console.log("Error")
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
            context.fillText(predict.score.toFixed(2), x, y + height - textHeight);
        })

    }

    componentDidMount() {
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
                    console.log("Error")
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