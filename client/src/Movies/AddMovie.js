import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovieForm = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovieForm);

    const { push } = useHistory();
    const { id } = useParams();

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies`, movie)
            .then((res) => {
                console.log(res);
                props.getMovieList();
                push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className='edit-container'>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movie.title}
                />
                <div />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movie.director}
                />
                <div />
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movie.metascore}
                />
                <div />
                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Stars"
                    value={movie.stars}
                />
                <div />
                <button className="form-button">Add Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;