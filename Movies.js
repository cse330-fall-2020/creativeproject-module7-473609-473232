import React from 'react';

export const Movies = ({ movies }) => {
    return (
        <ul>
            {movies.map(movie => {
                let imgLink = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                return (
                    <li key={movie.title}>
                        <h2>{movie.title}</h2>
                        <p>Rated: {movie.vote_average}</p>
                        <a href="https://google.com">
                            <img src={imgLink} alt="no image found">
                            </img>
                        </a>
                    </li>
                )
            }
                )}
        </ul>
    )
}