import React, {Component} from 'react'

class RatingsButton extends Component{

    handleSubmitRating = (id) => {
        this.setState({id})
        const data = { currentUser: localStorage.getItem("user"), id: id, rating: localStorage.getItem("rating")}
        console.log("RATING Current User is: ", data.currentUser, " and ID is: ", data.id, "and rating is: ", data.rating)
        fetch('/auth/rating',{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {'content-type': 'application/json', "accepts":"application/json"},
        })
            .then((response) => response.json())
            .then((data) => 
              console.log(
                data.success
                  ? "rated successfully"
                  : "rate failed"
              )
            )
            .catch((err) => console.error(err))
      }

    render() {
        const theID = this.props.theID

            return(

            <form>
            Rating: <input type = "number" id = {theID} pattern = "[0-9]"></input>
            <button type="button" id="ratingButton" name = {theID} onClick={ () => {
                localStorage.setItem("movieID", theID)
                localStorage.setItem("rating", document.getElementById(theID).value)
                this.handleSubmitRating(theID)
                window.location.reload(); 
                }}>Rate Movie</button>
        </form>

            );}
                    }
export default RatingsButton