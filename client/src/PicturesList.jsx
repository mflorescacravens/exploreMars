import React, {useState} from 'react'
import './App.css';
// import axios from 'axios';

function PicturesList({rover, handleRoverChange}) {
    
    const [pictures] = useState([]);

    // useEffect(() => {
    //     axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=1&api_key=lwwON4lcFqWw0zXubbcETbUPjgEtP3st0LT6d2no`).then((response) => {
    //         setPictures(response.data.photos);
    //     }) 
    // }, [rover])

    let content;
    if (pictures.length) {
        content = pictures.map((picture, id) => {
            return  <div>
                        <img alt='roverPicture' 
                            className='rover-pictures' 
                            src={picture.img_src} 
                            onClick={() => handleRoverChange(picture.img_src)} 
                            key={id} />
                    </div>
        })
        // content = <p>pictures are here</p>

    } else {
    // there is no data, show a placeholder
        content = <p>Click a rover to see pictures!</p>
    }
    return (
        <div>
            <h3>Rover Pictures</h3>
            {content}
        </div>
    )
}



export default PicturesList;