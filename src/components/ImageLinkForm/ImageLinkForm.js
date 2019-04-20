import React from 'react';
import './ImageLinkForm.css'

const ImageLink = (props) => {
    return(
        <div className="f3">
            <p>
                {'This Magic Brain will detect faces in your picture. Give it a try!'}
            </p>
            <div className="center">
             <div className="center form pa4 br3 shadow-5">
                <input className = "f4 pa2 w-70 center" type = "text" onChange = {props.onInputChange} />
                <button className="w-30 link grow dib white ph3 pa2 bg-light-purple" onClick = {props.onButtonSubmit}>Detect</button>
             </div>
            </div>
        </div>
    )
}

export default ImageLink;