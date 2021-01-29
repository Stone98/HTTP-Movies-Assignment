import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function EditForm(props) {
    const { id } = useParams();
    const { push } = useHistory();
    const [formValues, setFormValues] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: '',
        id: null
    });

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                const starsString = res.data.stars.join(', ');
                const movieToEdit = {
                    ...res.data,
                    stars: starsString
                }
                setFormValues(movieToEdit);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleChanges = e => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const editMovie = e => {
        e.preventDefault();
        const starsArr = formValues.stars.split(', ');
        const movieToSend = {
            ...formValues,
            stars: starsArr
        }
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieToSend)
            .then((res) => {
                props.updateMovies(props.movieList.map((movie) => {
                    if (movie.id === res.data.id) {
                        return res.data;
                    } else {
                        return movie;
                    }
                }));
                push(`/movies/${id}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <form onSubmit={editMovie} >
            <label htmlFor='title'>Title</label>
            <input
                id='title'
                name='title'
                onChange={handleChanges}
                value={formValues.title} />
            <label htmlFor='title'>Metascore</label>
            <input
                id='metascore'
                name='metascore'
                onChange={handleChanges}
                value={formValues.metascore} />
            <label htmlFor='title'>Director</label>
            <input
                id='director'
                name='director'
                onChange={handleChanges}
                value={formValues.director} />
            <label htmlFor='title'>Stars</label>
            <input
                id='stars'
                name='stars'
                onChange={handleChanges}
                value={formValues.stars} />
            <button>Update Movie</button>
        </form>
    )
}

export default EditForm
