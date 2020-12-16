import React from 'react';
import FavoriteButton from './FavoriteButton'
import RatingsButton from './RatingsButton'

export const Movies = ({ movies }) => {

    return (
        <div>
        <ul>
            {movies.map(movie => {
                let imgLink = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                let theID = movie.id;
                return (
                    <li key={movie.title}>
                        <h2>{movie.title}</h2>
                        <FavoriteButton theID = {theID} />
                        <strong> tMDB Rating: {movie.vote_average}</strong>
                        <br></br>
                        <a href={imgLink}>
                            <img src={imgLink} alt="no image found" width = "200" height = "300">
                            </img>
                        </a>
                        <p><strong>Summary: </strong>{movie.overview}</p>
                        <div>
                        <RatingsButton theID = {theID} />
                        </div>
                    </li>
                )
            }
                )}
        </ul>
        </div>
    )
} 