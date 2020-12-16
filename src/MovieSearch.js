import React, {Component, useEffect, useState, useContext} from 'react'
import { Movies } from "./Movies";


const MovieSearchFunc = (searched) => {


    console.log("This is searching: ", searched)   

    const [movies, setMovies] = useState([]); 
   
    let urlToSearch = "https://api.themoviedb.org/3/search/movie?api_key=0a852b8c0e76e27a1e104e9637bac3ce&language=en-US&query="+ searched +"&page=1&include_adult=false";


    useEffect(() => {
        fetch(urlToSearch)
        .then(response => response.json().then(data => {
            setMovies(data.results);
        })
        );
    }, []);


    return movies;
}

export const MovieSearch = () => {

    return (
        <div>
        <form>
            <input id="searchQuery" placeholder="Ex: Pulp Fiction"></input>
            <button onClick={ () => {
                if(document.getElementById("searchQuery").value){
            localStorage.setItem("search", document.getElementById("searchQuery").value)
            }}}>Search</button>
        </form>
        <Movies movies={MovieSearchFunc(String(localStorage.getItem("search")))}/>
        </div>
            )}

export default MovieSearch


