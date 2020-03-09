import React, {useState} from 'react';
// import axios from 'axios';

function Edit({comment, edit, onSubmit}) {

    const [editComment, setEditComment] = useState(comment);
    const [editToggle, setEditToggle] = useState(false);
    
    const handleEditComment = (e) => {
        e.preventDefault();
        setEditComment(e.target.value)
    }
    const toggleEdit = (e) => {
        e.preventDefault();
        setEditToggle(!true);
        console.log(editToggle);
    }

    return(
        <div>
            <textarea name="edit" id="" cols="30" rows="1">{editComment}</textarea>
            <button onClick={toggleEdit}>Edit</button>
        </div>
    )
}

export default Edit