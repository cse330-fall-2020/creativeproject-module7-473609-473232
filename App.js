import './App.css';
import Register from './Register';
import Login from './Login'
import React, {Component} from 'react'

var currentUser = null;

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
        .then(currentUser = data.username)
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

  // For logging out
  logout() {
    currentUser = null;
    console.log("logged out")
    window.location.reload(); 
  }
  
  render(){
    console.log(currentUser)
    if(currentUser == null){
    return(
      <div>
        <h1>Max and Kusak's Amazing 330 Creative Project: The Login Page</h1>
      <Register handleSubmit={this.handleSubmitRegistration} />
      <Login handleSubmit={this.handleSubmitLogin}/>
      </div>
    );
    }
  else{
    return(
    <div> 
    <h1>Max and Kusak's Amazing 330 Creative Project: The Home Page</h1>
    <p>Hello {currentUser}!</p>
    <button onClick={this.logout}>Logout</button>
    </div>
  );
  }
}
}

export default App;
