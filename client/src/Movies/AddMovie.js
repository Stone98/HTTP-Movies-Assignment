import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovieForm = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const AddMovie = props => {
    const [movie, setMovie] = useState(initialMovieForm);
    const [star, setStar] = useState('');
    const { push } = useHistory();

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleStarChange = (e) => {
        setStar(e.target.value)
    }

    const handleAddStar = (e) => {
        e.preventDefault();
        setMovie({
            ...movie,
            stars: [...movie.stars, star]
        });
        setStar('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies`, movie)
            .then((res) => {
                props.setMovieList(res.data)
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
                    onChange={handleStarChange}
                    placeholder="Stars"
                    value={star}
                />
                <button onClick={handleAddStar}>Add Star</button>
                <ul>
                    {
                        movie.stars.map(star => {
                            return (<li key={star} >{star}</li>);
                        })
                    }
                </ul>
                <div />
                <button className="form-button">Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;