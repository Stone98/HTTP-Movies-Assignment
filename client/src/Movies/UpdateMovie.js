import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    title: '',
    director: '',
    metascore: ''
};


const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);

    const { push } = useHistory();
    const id = props.match.params.id;

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:5000/api/movies/${id}`)
    //         .then((res) => {
    //             setMovie(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        console.log(e.target);
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className='edit-container'>
            <h2>Update Movie</h2>
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

                <button className="form-button">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
