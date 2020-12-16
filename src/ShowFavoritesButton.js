import React, {Component, useEffect, useLayoutEffect, useState, useContext} from 'react'
import { FavoritesMovieList } from "./FavoritesMovieList";

let idDict = {};

let fetchMovies = []


const MovieGrabFunc = () => {

    const [movies2, setMovies] = useState([]); 

    useLayoutEffect(() => {
        const data = { username: localStorage.getItem("user")}
        fetch('/auth/grabFavorites',{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {'content-type': 'application/json', "accepts":"application/json"},
        })
            .then((response) => response.json())
            .then((data) => {
                if(data){
                    idDict = data
                    localStorage.setItem("idDict", {idDict})

                    if(idDict.length !== 0){
                        for(var id in idDict){
                            let urlToSearch = "https://api.themoviedb.org/3/movie/" + id + "?api_key=0a852b8c0e76e27a1e104e9637bac3ce&language=en-US"
                            fetch(urlToSearch)
                                .then(response => response.json().then(data => {
                                    data.ratingDictionary = idDict;
                                    fetchMovies.push(data)
                             }))
                
                        }   
                    }
                    setMovies(fetchMovies);
                }
                else{
                    console.log("rankings retrival unsuccessful")
                }
              }
              )
            .catch((err) => console.error(err))
    }, [])
        

    return movies2;
}

export const ShowFavoriteButton = () => {

    return (
        <div>
        <p>My Favorite Movies: </p>
        <FavoritesMovieList movies={MovieGrabFunc()}/>
        </div>
            )}

export default ShowFavoriteButton


