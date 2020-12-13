import './App.css';
import Register from './Register';
import React, {Component} from 'react'

class App extends Component {

  state = {
    users: [],
  }

  handleSubmit = (user) => {
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
  
  render(){
    return(
      <Register handleSubmit={this.handleSubmit} />
    )
  }
}

export default App;
