import React, { Component } from 'react';
import './App.css';
import Authentication from './Authentication';
import { connect } from 'react-redux'


class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      messageContents: ''
    }
    this.updateMessages = this.updateMessages.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateUsers = this.updateUsers.bind(this)
    this.displayActiveUsers = this.displayActiveUsers.bind(this)
  }

  componentDidMount(){
    setInterval(this.updateMessages, 500)
    setInterval(this.updateUsers, 500)
  }

  updateUsers() {
    fetch ('/activeUsers')
    .then(function(x){
      return x.text()
    }).then(function(res){
      let parsed = JSON.parse(res)
      this.props.dispatch({
        type: 'setActiveUsers',
        users: parsed
      })
    }.bind(this))
  }

  updateMessages() {
    fetch ('/getAllMessage', {
      method : 'POST',
      credentials: "same-origin"
    })
    .then(function (x) {
        return x.text()
    }).then (function (res){
        let parsed = JSON.parse(res)
        if (parsed.success) {
          this.props.dispatch({
            type: 'setMessages',
            msgs: parsed.msgs
          })
          this.props.dispatch({
            type: 'loggedIn',
            success: parsed.success
          })
       }
    }.bind(this))
  }

  displayActiveUsers() {
      return this.props.users.map(function (user){
        return (<div>{user}</div>)
      })
  }

  dispalyMessages() {
    return this.props.messages.map(function (m){
      return (<div>{m.username} : {m.message}</div>)
    })
  }
handleInputChange(event) {
  this.setState({messageContents: event.target.value})
}

handleSubmit(event) {
  event.preventDefault()
  fetch ('/addMessage',{
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
      msg: this.state.messageContents,
    })
  })
  this.setState({messageContents: ''})
  
}

  render() {
    if (this.props.loggedSuccess) {
      return (<div>
        <div>Active Users:</div>
        <div>{this.displayActiveUsers()}</div>
        <div className="topcontainer">
            {this.dispalyMessages()}
        </div>
        <div className="botcontainer">
            <form onSubmit={this.handleSubmit}>
                <div className="chat">
                    <input type="text" onChange={this.handleInputChange} value={this.state.messageContents}>
                    </input>
                    <input type="submit"></input>
                </div>
            </form>
        </div>
    </div>)
    }
    return (
      <div className="App">
          Signup
        <Authentication endpoint='/signup'></Authentication>
          Login
        <Authentication endpoint='/login'></Authentication>
      </div>
    );
  }
}

let connectedApp = connect(function(store){
  return {loggedSuccess: store.logged,
          messages: store.messages,
          users: store.activeUsers}
})(App)
export default connectedApp;
