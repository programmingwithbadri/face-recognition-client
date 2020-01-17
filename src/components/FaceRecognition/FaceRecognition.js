import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ boxes, imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 pa2'>
                <img id='inputImage'
                    alt=''
                    src={imageUrl}
                    width="500px"
                    height="auto" />
                {
                    boxes.map(box => (
                        <div key={box.topRow} className='bounding-box' style={{ top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol }} ></div>
                    ))
                }
            </div>
        </div> 
    )
}

export default FaceRecognition;