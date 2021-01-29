import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        setMovieList(movieList.filter((movie) => movie.id !== res.data));
        push('/');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div onClick={saveMovie}>
        Save
      </div>
      <div onClick={() => push(`/movies/${params.id}/edit`)}>
        Edit
      </div>
      <div onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
