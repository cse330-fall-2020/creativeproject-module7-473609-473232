import './App.css';
import Register from './Register';
import Login from './Login'
import React, {Component} from 'react'

class App extends Component {

  state = {
    users: [],
  }

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
        .then((data) => 
          console.log(
            data.success
              ? "Login successfull"
              : "Login unsuccessful"
          )
        )
        .catch((err) => console.error(err))
  }
  
  render(){
    return(
      <div>
        <h1>Max and Kusak's Amazing 330 Creative Project!</h1>
      <Register handleSubmit={this.handleSubmitRegistration} />
      <Login handleSubmit={this.handleSubmitLogin}/>
      </div>
    )
  }
}

export default App;
