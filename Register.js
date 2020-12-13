
import React, {Component} from 'react'

class Register extends Component{

    initialState = {
        Username: '',
        Password: '',
      }

    state = this.initialState

    handleChange = (event) => {
        const {name, value} = event.target
      
        this.setState({
          [name]: value,
        })
      }

      submitForm = () => {
        console.log(this.state)
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
      }
      

    render(){

        const { Username, Password } = this.state;

        return(
        <form>
            New Username: <input type = "text" name = "Username" id = "Username" value = {Username} onChange={this.handleChange}></input>
            New Password: <input type = "text" name = "Password" id = "Password" value = {Password} onChange={this.handleChange}></input>
            <input type="button" value="Submit" onClick={this.submitForm} />
        </form>
        );

    }
}
export default Register