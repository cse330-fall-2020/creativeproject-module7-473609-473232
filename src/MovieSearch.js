import React, {Component, useEffect, useState} from 'react'
import { Movies } from "./Movies";



function MovieSearchFunc() {

    var searched = null;

    const [movies, setMovies] = useState([]);

    if(document.getElementById("searchQuery") == null){
        searched = "lego%20movie";
    }
    else{
        searched = document.getElementById("searchQuery").value
        console.log(searched);
    
    }
   
    let urlToSearch = "https://api.themoviedb.org/3/search/movie?api_key=0a852b8c0e76e27a1e104e9637bac3ce&language=en-US&query="+ searched +"&page=1&include_adult=false";

    useEffect(() => {
        fetch(urlToSearch)
        .then(response => response.json().then(data => {
            setMovies(data.results);
        })
        );
    }, []);

    // render(
    // <Movies/>,
    // document.getElementById('App'))

    return movies;
}

export const MovieSearch = () => {
    const [title, setTitle] = useState('');


    return (
        <div>
        <form>
            <input placeholder="Ex: Pulp Fiction" value={title} id="searchQuery" onChange={e => setTitle(e.target.value)}></input>
            <button onClick={ () => {
            MovieSearchFunc();
            }}>Search</button>
        </form>
        <Movies movies={MovieSearchFunc()}/>
        </div>
    )
}

export default MovieSearch