import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './App.css';
import Comment from './Comment'
import PicturesList from './PicturesList';
import Login from './Login';
import Signup from './Signup';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

// import { set } from 'mongoose';

// todo: get comments to be editable
// todo: get pictures to change status on rover change
// todo: get comments to be associated with rover

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    picturePage: {
        marginTop: 20,
        marginBottom: 20,
    },
    roverFeed: {
        color: 'blue',
        fontSize: 26,
    },
    toggleSwitch: {
        marginLeft: 30,
    }
}));


export default function App() {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    const [rover, setRover] = useState('curiosity');
    const [pageNum, setPageNum] = useState(1);
    const [checked, setChecked] = useState(false);
    const toggleChecked = () => {
        setChecked(prev => !prev);
    };

    const classes = useStyles();

    const handleRoverChange = (e) => {
        e.preventDefault()
        setRover(e.target.name);
    };

    function nextPictureSet(e) {
        e.preventDefault();
        setPageNum(pageNum + 1);
    }

    function prevPictureSet(e) {
        e.preventDefault();
        setPageNum(pageNum - 1);
    }

    var picturePage;

    useEffect(() => {
        if (rover !== 'curiosity') {
            setPageNum(1);
            picturePage = '.';
        }
    }, [rover])

    if (pageNum === 1) {
        picturePage =   <div className={classes.picturePage}>
                            <Button variant='contained' onClick={nextPictureSet}>Next Page</Button>
                        </div>
    } else {
        picturePage =   <div>
                            <Button variant='contained' onClick={prevPictureSet}>Previous Page</Button>
                            <Button variant='contained' onClick={nextPictureSet}>Next Page</Button>
                        </div>
    }

    if (checked === true) {
        document.body.style.backgroundColor = '#1f263b';
        
    } else {
        document.body.style.backgroundColor = 'white';
    }

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
                <AppBar position="static">
                    <Toolbar>
                        <FormControlLabel
                            control={<Switch checked={checked} onChange={toggleChecked} className={classes.toggleSwitch} />}
                            label="Dark Mode"
                        />
                        <Typography variant="h6" className={classes.title}>
                        Welcome, {user.name}! Explore Mars 👽
                        </Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <h4 id="testing">You're looking at: <span className={classes.roverFeed}>{rover}</span></h4>
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
                <PicturesList pageNum={pageNum} rover={rover} handleRoverChange={handleRoverChange}/>
                <Comment user={user}/>
                {picturePage}
            </Layout>
        )
    }
}

function Layout({children}, props) {
    return (
        <div className="App" id="application">
            {children}
        </div>
    );
}