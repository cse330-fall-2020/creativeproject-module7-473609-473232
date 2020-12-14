import React, {Component, useEffect, useState} from 'react'
import { Movies } from "./Movies";

function MoviesTransition() {

    //add this into class App
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=0a852b8c0e76e27a1e104e9637bac3ce&language=en-US&page=1")
        .then(response => response.json().then(data => {
            setMovies(data.results);
        })
        );
    }, []);
    
    
   return(
    <Movies movies={movies}/> )
}
export default MoviesTransition