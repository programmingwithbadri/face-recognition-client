import React from 'react';

const ImageLink = () => {
    return(
        <div>
            <p>
                {'This Magic Brain will detect faces in your picture. Give it a try!'}
            </p>
            <div>
                <input type = "text" />
                <button>Detect</button>
            </div>
        </div>
    )
}

export default ImageLink;