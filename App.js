import './App.css';
import Register from './Register';
import Login from './Login'
import Group from './Group'
import React, {Component, useEffect, useState} from 'react'
import MoviesTransition from './MoviesTransition'

class App extends Component {

  state = {
    users: [],
  }

  constructor(){
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };

  forceUpdateHandler(){
    localStorage.setItem('user',"not logged in")
    console.log("logged out")
    this.forceUpdate();
  };

// For User Registration
  handleSubmitRegistration = (user) => {
    this.setState({users: [...this.state.users, user]})
    const data = { username: user.Username, password: user.Password}
    fetch('/auth/register',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'content-type': 'application/json', "accepts":"application/json"},
    })
        .then((response) => response.json())
        .then((data) => 
          console.log(
            data.success
              ? "Registration successfull"
              : "Registration unsuccessful"
          )
        )
        .catch((err) => console.error(err))
  }

// For User Login
  handleSubmitLogin = (user) => {
    this.setState({users: [...this.state.users, user]})
    const data = { username: user.Username, password: user.Password}
    fetch('/auth/login',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'content-type': 'application/json', "accepts":"application/json"},
    })
        .then((response) => response.json())
        .then(localStorage.setItem('user', data.username))
        .then((data) => 
          console.log(
            data.username,
            data.success
              ? "Login successful"
              : "Login unsuccessful"
          )
        )
        .catch((err) => console.error(err))
  }

  // For adding two users to a group
  handleSubmitGroup = (user) => {
    console.log("App.js: ", {user})
    this.setState({user})
    const data = {user}
    fetch('/auth/create',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'content-type': 'application/json', "accepts":"application/json"},
    })
        .then((response) => response.json())
        .then((data) => 
          console.log(
            data.success
              ? "Checked user successfully"
              : "Checked user unsuccessfuly"
          )
        )
        .catch((err) => console.log(err))
  }
  
  render(){

    let mainDiv = "not logged in";

    console.log("Current user is: " + localStorage.getItem("user") )

    if(localStorage.getItem("user") !== "not logged in"){
    mainDiv = 
      <div> 
      <h1>Max and Kusak's Amazing 330 Creative Project: The Home Page</h1>
      <p>Hello {localStorage.getItem("user")}!</p>
      <p>Your favorite Movies: </p>
      <p>Top suggested movie for you: </p>
      <Group handleSubmit={this.handleSubmitGroup}/>
      <button onClick={this.forceUpdateHandler}>Logout</button>
      <MoviesTransition/>
      </div>
    }
  else{
    mainDiv =
    <div>
    <h1>Max and Kusak's Amazing 330 Creative Project: The Login Page</h1>
  <Register handleSubmit={this.handleSubmitRegistration}/>
  <Login handleSubmit={this.handleSubmitLogin}/>
  </div>
  }

  return mainDiv;
}
}

export default App;
