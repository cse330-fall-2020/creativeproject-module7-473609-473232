
import React, {Component} from 'react'

class Group extends Component{

    initialState = {
        UsernameToAdd: '',
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

        const { UsernameToAdd } = this.state;

        return(
          <div>
        <form>
            Create a group with: <input type = "text" name = "UsernameToAdd" id = "UsernameToAdd" value = {UsernameToAdd} onChange={this.handleChange}></input>
            <input type="button" value="Add" onClick={this.submitForm} />
        </form>
        </div>
        );

    }
}
export default Group
