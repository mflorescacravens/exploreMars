import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            message: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleInputChange(e) {
        this.setState({
            // line below will fill in each where needed
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post('/auth/signup', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if (res.data.type === 'error') {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    message: res.data.message
                })
            }   else {
                localStorage.setItem('mernToken', res.data.token)
                this.props.liftToken(res.data)
            }
        }).catch(err => {
            this.setState ({
                message: "maximum accounts exceeded. Please try again later"
            })
            console.log(err)
        })
    }

    render() {
        return (
            <div className="Signup">
                <h3>Create a new account:</h3>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        // id="filled-password-input"
                        label="Name"
                        // className={classes.textField}
                        // type="name"
                        margin="normal"
                        variant="filled"
                        onChange={this.handleInputChange}
                        value={this.state.name}
                        type="text"
                        name="name"
                        placeholder="enter your name..."
                    />
                    <TextField
                        // id="filled-password-input"
                        label="Email"
                        // className={classes.textField}
                        // type="password"
                        margin="normal"
                        variant="filled"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                        type="email"
                        name="email"
                        placeholder="enter your email..."
                    />
                    <TextField
                        // id="filled-password-input"
                        label="Password"
                        // className={classes.textField}
                        margin="normal"
                        variant="filled"
                        onChange={this.handleInputChange}
                        value={this.state.password}
                        type="password"
                        name="password"
                        placeholder="choose a password"
                    />
                    <Button type="submit" variant='contained' color='primary'>Sign up!</Button>
                </form>
            </div>
        )
    }
}

export default Signup;