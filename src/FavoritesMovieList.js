import React, {Component, useEffect, useState} from 'react'
import { movies } from './Movies'

// pulls the actual movie data from the database for the user's ranked movie list

export const FavoritesMovieList = ({ movies }) => {

    return (
        <div>
        <ul>
            {movies.map(movie => {
                let imgLink = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                let theID = movie.id;
                return (
                    <li key={movie.title}>
                        <h2>{movie.title}</h2>
                        <br></br>
                        <a href={imgLink}>
                            <img src={imgLink} alt="no image found" width = "100" height = "150">
                            </img>
                        </a>
                        <div>
                        </div>
                    </li>
                )
            }
                )}
        </ul>
        </div>
    )
        }

