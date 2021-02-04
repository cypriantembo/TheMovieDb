import React from 'react';

const POSTER_PATH = "https://image.tmdb.org/t/p/w1280";
function Movie(props) {
    return (
        <div className="movie">
            <img src={props.poster_path ? (POSTER_PATH + props.poster_path) : ("/unnamed.jpg") } alt={props.title}/>
            <div className="movie-info">
                <h6>{props.title}</h6>
                <p><a href="/#" onClick={() => props.viewMovieInfo(props.id)}>View Detils</a> </p>
            </div>
        </div>
    )
};

export default Movie;


