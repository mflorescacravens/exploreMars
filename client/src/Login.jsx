import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import liftToken from './App.jsx'


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    message: {
        backgroundColor: 'purple'
    }
}));

export default function Login(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    function handleEmailChange() {
        setEmail(document.getElementById('outlined-required').value);
    }
    function handlePasswordChange() {
        setPassword(document.getElementById('filled-password-input').value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/auth/login', {
            email: email,
            password: password
        }).then(res => {
            if (res.data.type === 'error') {
                setMessage(res.data.message);
                // console.log(res.data.type)
            } else {
                localStorage.setItem('mernToken', res.data.token);
                props.liftToken(res.data)
            }
        }).catch(err => {
            setMessage("Something went wrong. Try again later")
            console.log('the error is', err)
        })
    }

    return (
        <div className="Login">
                <h3>Log into your account:</h3>
                <form onSubmit={handleSubmit}>
                    <TextField
                        // required
                        id="outlined-required"
                        label="Email"
                        // className={classes.textField}
                        margin="normal"
                        variant="filled"
                        onChange={handleEmailChange}
                        name="email"
                        type="email"
                        placeholder="enter your email"
                        />
                    <TextField
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="filled"
                        onChange={handlePasswordChange}
                        // className={classes.textField}
                        name="password"
                        placeholder="enter your password"
                        />
                    <Button variant='contained' color='primary' type="submit">Login</Button>
                </form>
                <p className={classes.message}>{message}</p>
            </div>
    )
}