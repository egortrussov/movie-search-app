import React, { Component } from 'react'

import { API_KEY, BASE_URL, IMAGE_URL } from '../config';

import './MovieInfo.css'
import Spinner from './Spinner';

export default class MovieInfo extends Component {
    state = {
        movie: {},
        isLoading: true
    }
    
    componentDidMount() {
        const movieId = this.props.location.pathname.split('/')[2];
        fetch(`${ BASE_URL }/movie/${ movieId }?api_key=${ API_KEY }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                
                this.setState({
                    movie: res,
                    isLoading: false
                })
            })
    }
    
    render() {
        const { movie, isLoading } = this.state;

        if (isLoading) return (
            <Spinner />
        )

        const imageURL = `${ IMAGE_URL }${ movie.poster_path }`
        
        return (
            <div className="movie-info">
                <div className="movie-info-top">
                    <div className="movie-poster">
                        <img src={ imageURL } alt="" />
                    </div>
                    <div className="movie-summary">
                        <h1>{ movie.title }</h1>
                        <h2>Runtime: { Math.floor(movie.runtime / 60) } hours { movie.runtime % 60 } minutes</h2>
                        <h3>Average rating: <span>{ movie.vote_average }</span></h3>
                        <h3>Language: { movie.spoken_languages[0].name }</h3>
                        <div className="genres">
                            { movie.genres.map(genre => {
                                return (
                                    <div key={ genre.id } className="genre">{ genre.name }</div>
                                )
                            }) }
                        </div>
                    </div>
                </div>
                <div className="movie-info-bottom">
                    <h2>Overview: </h2>
                    <p className="movie-overview">
                        { movie.overview }
                    </p>
                    <h2>Production companies: </h2>
                    <div className="companies">
                        { movie.production_companies.map(company => {
                            const imageSrc = `${ IMAGE_URL }${ company.logo_path }`
                            return (
                                <img key={ imageSrc } src={ imageSrc } alt="" className="company-image"/>
                            )
                        }) }
                    </div>
                </div>
            </div>
        )
    }
}
