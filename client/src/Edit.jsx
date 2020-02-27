import React, {useState} from 'react';
// import axios from 'axios';

function Edit({comment, edit, onSubmit}) {

    const[editComment, setEditComment] = useState(comment);
    
    const handleEditComment = (e) => {
        e.preventDefault();
        setEditComment(e.target.value)
    }

    return(
        <div>
            {/* <form onSubmit={onSubmit(edit)}> */}
                <textarea name="edit" id="" cols="30" rows="10">{editComment}</textarea>
                {/* <button onClick={onSubmit(edit)}>submit edit</button> */}
            {/* </form> */}
        </div>
    )
}

export default Edit