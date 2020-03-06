import React, {useState, useEffect} from 'react';
// import _ from 'lodash';
import axios from 'axios';
import './App.css';
// import Edit from './Edit'
import TextField from '@material-ui/core/TextField';

function Comment() {
    
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState('');
    
    const handleDeleteComment = (id) => (e) => {
        e.preventDefault();
        axios.delete(`/comments/${comments[id]._id}`, () => {}).then(axios.get('/comments').then((response) => {
            setComments(response.data);
        }));
    }
    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        var fieldVal = document.getElementById('outlined-multiline-static').value;
        if (fieldVal !== "") {
            setNewComment(fieldVal)
        }
    }

    // const handleEditComment = (id) => (e) => {
    //     e.preventDefault();
    //     // axios.put(`/comments/${comments[id]._id}`, () => {})
    //     console.log(e.target)
    // }
    
    useEffect(() => {
        if (newComment !== "") {
            axios.post('/comments', {
                comment: newComment
            })
            console.log('newComment is !blank')
        }
    }, [newComment]);

    useEffect(() => {
        axios.get('/comments').then((response) => {
            setComments(response.data);
        })
    }, [newComment])




    function CommentForm({children}) {
        return(
            <div>
                <h3>enter a comment below</h3>
                <form onSubmit={handleCommentSubmit} action="POST">
                    <TextField
                        id="outlined-multiline-static"
                        label="Add Comment..."
                        multiline
                        rows="4"
                        variant="outlined"
                        placeholder="Insert comment here..."
                        onSubmit={setNewComment}/>
                    <br/>
                    <button>Submit</button>
                </form>
                {children}
            </div>
        )
    }

    if (!comments) {
        return (<CommentForm><p>Click a rover to see pictures!</p></CommentForm>)
    }

    return (
        <CommentForm>
            {comments.map((comments, id) => {
                return  <div onClick={handleDeleteComment(id)}>
                            <p alt='roverComments' 
                                className='rover-comments' 
                                key={comments.id_}>{comments.comment}</p>
                            {/* <button action="PUT">edit</button> */}
                            <button action="DELETE">delete</button>
                        </div>
            })}
        </CommentForm>
    )
}


export default Comment;
