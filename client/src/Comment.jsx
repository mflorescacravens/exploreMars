import React, {useState, useEffect} from 'react';
// import _ from 'lodash';
import axios from 'axios';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    commentBox: {
        display: 'absolute',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(36),
            height: theme.spacing(16),
        },
    },
    commentContent: {
        marginTop: theme.spacing(2),
    }
}));
const curDate = moment().format('MMMM Do YYYY, h:mm:ss a');

function Comment(props) {
    const classes = useStyles();
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

    const handleEditComment = (id) => (e) => {
        e.preventDefault();
        // var fieldVal = document.getElementById('')
        axios.put(`/comments/${comments[id]._id}`, {
            comment: 'hey',
            date: curDate,
        }).then(axios.get('/comments').then((response) => {
            setComments(response.data);
        }));
    }
    useEffect(() => {
        if (newComment !== "") {
            axios.post('/comments', {
                comment: newComment,
                user: props.user
            })
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
                return  <div className={classes.commentBox}>
                            <Paper elevation={3}>
                                <p  alt='roverComments' 
                                    className={classes.commentContent}
                                    key={comments.id_}>{comments.comment}</p>
                                <p>{comments.date}</p>
                                <p>User: {comments.user.name}</p>
                                <Button onClick={handleEditComment(id)}>edit</Button>
                                <Button onClick={handleDeleteComment(id)}>delete</Button>
                            </Paper>
                        </div>
            })}
        </CommentForm>
    )
}


export default Comment;
