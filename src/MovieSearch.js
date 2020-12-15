import React, {Component, useEffect, useState, useContext} from 'react'
import { Movies } from "./Movies";
import { Provider, Consumer } from './carrots'


const MovieSearchFunc = (searched) => {

    const [movies, setMovies] = useState([]); 
    console.log("This is searching: ", searched)   
   
    let urlToSearch = "https://api.themoviedb.org/3/search/movie?api_key=0a852b8c0e76e27a1e104e9637bac3ce&language=en-US&query="+ searched.searchQuery +"&page=1&include_adult=false";

    console.log(urlToSearch)

    useEffect(() => {
        fetch(urlToSearch)
        .then(response => response.json().then(data => {
            setMovies(data.results);
        })
        );
    }, []);


    return movies;
}

export const MovieSearch = (props) => {
    const [title, setTitle] = useState('');
    console.log(props)

    return (
        <div>
        <form>
            <input placeholder="Ex: Pulp Fiction" value={title} id="searchQuery" onChange={e => setTitle(e.target.value)}></input>
            <button onClick={ () => {
            MovieSearchFunc(props);
            }}>Search</button>
        </form>
        <Movies movies={MovieSearchFunc(props)}/>
        </div>
            )}

export default MovieSearch
