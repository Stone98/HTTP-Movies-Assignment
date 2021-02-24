import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const { id } = props.match.params;

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const handleEditClick = () => {
    push(`/update-movie/${id}`)
  }

  const handleDeleteClick = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        props.getMovieList();
        push(`/`)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className='edit-button' onClick={handleEditClick}>
        Edit
      </div>
      <div className="delete-button" onClick={handleDeleteClick} >
        Delete
      </div>
    </div>
  );
}

export default Movie;