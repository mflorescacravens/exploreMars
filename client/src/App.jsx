import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Comment from './Comment'
import PicturesList from './PicturesList';
import Login from './Login';
import Signup from './Signup';
import Button from '@material-ui/core/Button';
// import { set } from 'mongoose';

// todo: get comments to be editable
// todo: get pictures to change status on rover change
// todo: get comments to be associated with rover


export default function App() {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    const [rover, setRover] = useState('curiosity');

    // console.log(errorMessage)

    const handleRoverChange = (e) => {
        setRover(e.target.name);
        console.log(e.target.name)
    };

    function checkForLocalToken() {
        var token = localStorage.getItem('mernToken');
        if (!token || token === 'undefined') {
            // Token is invalid or missing
            localStorage.removeItem('mernToken');
            setToken('');
            setUser(null);
        } else {
            // We found a token in localStorage, verify it
            axios.post('/auth/me/from/token', {token}).then( res => {
                if (res.data.type === 'error') {
                    localStorage.removeItem('mernToken');
                    setToken('');
                    setUser(null);
                    setErrorMessage(res.data.message)
                    console.log(errorMessage)
                } else {
                    localStorage.setItem('mernToken', res.data.token);
                    setToken(res.data.token);
                    setUser(res.data.user);
                    setErrorMessage('');
                }
            })
        }
    }

    function liftToken({token, user}) {
        setToken(token);
        setUser(user);
    }

    function logout() {
        localStorage.removeItem('mernToken');
        setToken('');
        setUser(null);
    }

    useEffect(() => {
        checkForLocalToken()
    }, [])
    
    if (!user || user === 'undefined') {
        return (
            <div>
                <h1 className="App">Please login or signup</h1>
                <Login liftToken={liftToken} />
                <Signup liftToken={liftToken} />
            </div>
        )
    } else {
        return (
            <Layout>
                <h2>Hello, {user.name}</h2>
                <Button variant='contained' onClick={logout}>Logout</Button>
                <Comment/>
                <img className="roverImg" 
                    onClick={handleRoverChange} 
                    name='curiosity' 
                    src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" 
                    alt=""/>
                <button onClick={handleRoverChange} 
                    name='curiosity'>Hi! I'm Curiosity</button>
                <img className="roverImg" 
                    onClick={handleRoverChange} 
                    name='opportunity' 
                    src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" 
                    alt=""/>
                <button onClick={handleRoverChange} 
                    name='opportunity'>Hi! I'm Opportunity</button>
                <img className="roverImg" 
                    onClick={handleRoverChange} 
                    name='spirit' 
                    src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" 
                    alt=""/>
                <button onClick={handleRoverChange} 
                    name='spirit'>Hi! I'm Spirit</button>
                <PicturesList rover={rover} handleRoverChange={handleRoverChange}/>
            </Layout>
        )
    }
}

function Layout({children, rover, handleRoverChange}) {
    return (
        <div className="App">
            <h1>Rover Mars</h1>
            <h3>click a rover to view pictures</h3>
            <h4>You're looking at the rover: <span className='roverFeed'>{rover}</span></h4>
            {children}
        </div>
    );
}