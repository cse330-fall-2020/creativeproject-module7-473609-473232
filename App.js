import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        ... no changes in this part ...

        <p>The current time is {currentTime}.</p>
        <p>hello there</p>
        <form>
          Username: <input type = "text" id = "username" pattern = "[A-Za-z0-0]{1,20}"></input>
          Password: <input type = "text" id = "password" pattern = "[A-Za-z0-0]{1,20}"></input>
          <input type = "submit" id = "loginButton"></input>
        </form>

      </header>
    </div>

  );

}

function signIn(email, password){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    alert("signed in")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

document.getElementById("loginButton").addEventListener("click",signIn(document.getElementById("username"),document.getElementById("password")),false);



export default App;
