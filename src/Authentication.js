import React, { Component } from 'react';
import { connect } from 'react-redux'

class Authentication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameInput: '',
            passwordInput: ''
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUsernameChange(event) {
        this.setState({usernameInput: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({passwordInput: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault()
        fetch (this.props.endpoint, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.usernameInput,
                password: this.state.passwordInput
            })
        }).then(function (x) {
            return x.text()
        }).then (function (res){
            if (res === 'signupFail'){
                alert('Username already exists. Please try again')
            }else if (res === 'loginFail'){
                alert('Username or password incorrect. Please try again')
            }else {
                let parsed = JSON.parse(res)
                this.props.dispatch({
                    type: 'loggedIn',
                    success: parsed.success
            })
            }
        }.bind(this))
        this.setState({usernameInput: '', passwordInput: ''})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' onChange={this.handleUsernameChange} value={this.state.usernameInput}></input>
                <input type='text'onChange={this.handlePasswordChange} value={this.state.passwordInput}></input>
                <input type='submit'></input>
            </form>
        )
    }
}

let connectedAuthentication = connect()(Authentication)
export default connectedAuthentication