import React from 'react'
import '../App.css';


const POSTER_PATH = "https://image.tmdb.org/t/p/w1280";

function MovieDetails({title, release_date, homepage, poster_path, overview}) {
    return (
    <div className="mc">
        <div className="movie">
            <img src={POSTER_PATH + poster_path} alt={title}/>
            <div className="movie-info">
                <h6>{title}</h6>
            </div>
            
        </div>
        

        <div className="overview">
            <h6>TITLE</h6>
            <p>{title}</p>
            <hr/>
            <h6>OVERVIEW</h6>
            <p>{overview}</p>
            <hr/>
            <h6>RELEASE DATE</h6>
            <p>{release_date}</p>
            <hr/>
            <h6>URL</h6>
            <p><a href="/#">{homepage}</a></p>
            <hr/>
           
            
        </div>
        
    </div>
    )
}

export default MovieDetails


