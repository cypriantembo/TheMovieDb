import React, { useEffect, useState } from 'react';

import {Navbar, Form, FormControl, Button} from 'react-bootstrap'
import {Container, Row, Col} from 'react-bootstrap';


import Movie from './components/Movie';
import MovieDetails from './components/MovieDetails';
import Paginate from './components/Paginate';
import './App.css';


const POPULAR_URL = "http://localhost:5000/api/Tmdb/popular";
const SEARCH_URL = "http://localhost:5000/api/Tmdb/search?query=";
const SEARCH_BY_ID = "http://localhost:5000/api/Tmdb/id/";


function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [currentMovie, setcurrentMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPages] = useState(0);


  useEffect(()=>{
      fetch(POPULAR_URL)
      .then(res => res.json())
      .then(data =>{
        setMovies(data.results);
        setTotalPages(data.total_pages)


      });
  }, []);


  const handleSubmit = (e) =>{
      e.preventDefault();

      if(searchTerm){
      fetch(SEARCH_URL + searchTerm)
      .then(res => res.json())
      .then(data =>{
          setMovies(data);
          setTotalPages(data.total_pages)

      });

      setSearchTerm("");
  }
  
  };

  const handleChange = (e) =>{
      setSearchTerm(e.target.value);

  };

  const viewMovieInfo = (id) =>{
    fetch(SEARCH_BY_ID + id)
    .then(response => response.json())
    .then(data =>{
        setcurrentMovie(data)
        setTotalPages(data.total_pages)

      });
  }
  
//   const closeMovieInfo = () =>{
// 	setcurrentMovie(null);
//   }

    const nextPage = (page) => {
      fetch("http://localhost:5000/api/Tmdb/popular?page=" + page)
      .then(res => res.json())
      .then(data =>{
          setMovies(data.results);
          setPage(page)

          console.log(data)

      });

    }
  return (
    <div className="App">
  
    <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="#home" onClick={() => window.location.reload()}>Home</Navbar.Brand>
        <Form inline className="mr-sm-2" onSubmit={handleSubmit}>
            <FormControl type="text" placeholder="Search Movie" className="mr-sm-2"  value={searchTerm} onChange={handleChange}/>
            <Button type="submit" variant="outline-info">Search</Button>
        </Form>
    </Navbar>
    {
        currentMovie == null ?
        <Container fluid='true'>
            <Row className="show-grid">
            {movies.map((m) =>
                <Col md={3}>
                    <Movie key={m.id} {...m} viewMovieInfo={viewMovieInfo} />
                </Col>
            )}
            </Row>
        </Container>

    :
        <Container fluid='true'>
            <Row className="show-grid">
                <Col md={12}>
                    <MovieDetails  currentMovie={currentMovie} {...currentMovie} key={currentMovie.id} />
                </Col>
            </Row>
        </Container> 

    }

    {
        totalpage > 1 ?
        <Paginate totalpage={totalpage} nextPage={nextPage} page={page}/>
        :
        ""
    }

    </div>
  );
}

export default App;
