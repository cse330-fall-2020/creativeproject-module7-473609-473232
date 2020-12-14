import './App.css';
import Register from './Register';
import Login from './Login'
import Group from './Group'
import React, {Component, useEffect, useState} from 'react'
import MoviesTransition from './MoviesTransition'
// import MovieSearch from './MovieSearch'

class App extends Component {

  state = {
    users: [],
    currentGroup: {},
    inGroup: false
  };

  constructor(){
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.forceUpdateHandlerGroup = this.forceUpdateHandlerGroup.bind(this);
  };

  // For logging out
  forceUpdateHandler(){
    localStorage.setItem('user',"not logged in")
    console.log("logged out")
    this.forceUpdate();
  };

  // For leaving a group
  forceUpdateHandlerGroup(){
    console.log("group has been disbanded")
    localStorage.setItem("inGroup" , "false")
    localStorage.setItem("userOne", null)
    localStorage.setItem("userTwo", null)
    this.setState({currentGroup: {}})
    this.setState({inGroup: false})
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
              ? "has been logged in successfully"
              : "has NOT been logged in"
          )
        )
        .catch((err) => console.error(err))
  }

  // For adding two users to a group
  handleSubmitGroup = (user) => {
    this.setState({user})
    const data = {usernameToAdd: user.UsernameToAdd}
    fetch('/auth/create',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'content-type': 'application/json', "accepts":"application/json"},
    })
        .then((response) => response.json())
          .then((data) => {
            if(data.success){
              localStorage.setItem("userOne" , localStorage.getItem("user"))
              localStorage.setItem("userTwo", user.UsernameToAdd)
              this.setState({currentGroup : {userOne: localStorage.getItem("user"), userTwo: user.UsernameToAdd}})
              console.log("Group created successfully")
              console.log(this.state.currentGroup)
              localStorage.setItem("inGroup" , "true")
              this.setState({inGroup:true})
              }
              else{
                console.log("was unable to create group")
              }
            }
          )
        .catch((err) => console.log(err))
  }
  
  render(){

    let mainDiv = "Unable to Load";

    console.log("Just ran render() and updated the page. Current user is: " + localStorage.getItem("user") )


    // If logged in but not in a group
    if((localStorage.getItem("user") !== "not logged in") && localStorage.getItem("inGroup") === "false"){
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
        return mainDiv;
      }

    // if logged in and in a group
    if((localStorage.getItem("user") !== "not logged in") && localStorage.getItem("inGroup") === "true"){
      mainDiv = 
        <div> 
        <h1>Max and Kusak's Amazing 330 Creative Project: The Home Page</h1>
        <p>Hello {localStorage.getItem("user")}!</p>
        <p>Your favorite Movies: </p>
        <p>Top suggested movie for you: </p>
        <p>Your current group is: {localStorage.getItem("userOne")} and {localStorage.getItem("userTwo")}</p>
        <button onClick={this.forceUpdateHandlerGroup}>Disband Group</button>
        <button onClick={this.forceUpdateHandler}>Logout</button>
        <MoviesTransition/>
        </div>
        return mainDiv;
      }

    //if not logged in
    if(localStorage.getItem("user") === "not logged in"){
      mainDiv =
        <div>
        <h1>Max and Kusak's Amazing 330 Creative Project: The Login Page</h1>
        <Register handleSubmit={this.handleSubmitRegistration}/>
        <Login handleSubmit={this.handleSubmitLogin}/>
        </div>
        return mainDiv;
      }

  return localStorage.getItem("inGroup");
}
}

export default App;
