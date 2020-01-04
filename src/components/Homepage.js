import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { API_KEY, BASE_URL, IMAGE_URL } from '../config';

import './Homepage.css'

import Spinner from './Spinner';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.movieTitle = React.createRef();
    }

    state = {
        movies: [],
        isLoading: true,
        hasUserSearched: false
    }

    componentDidMount() {
        fetch(`${ BASE_URL }/discover/movie?api_key=${ API_KEY }&sort_by=popularity.desc`)    
            .then(res => res.json()) 
            .then(res => {
                console.log(res.results);
                
                this.setState({
                    movies: res.results,
                    isLoading: false
                })
            })
    }

    handleSearch = (e) => {
        e.preventDefault();
        const title = this.movieTitle.current.value;
        this.setState({
            isLoading: true,
            movies: [],
            hasUserSearched: true
        })
        fetch(`${ BASE_URL }/search/multi?api_key=${ API_KEY }&query=${ title }`)    
            .then(res => res.json()) 
            .then(res => {
                console.log(res.results);
                
                this.setState({
                    movies: res.results,
                    isLoading: false
                })
            })
    }
    
    render() {
        const { movies, isLoading, hasUserSearched } = this.state;

        if (isLoading) return (
            <Spinner />
        ) 

        return (
            <>
                <div className="search-box">
                    <h3>Search for a movie</h3>
                    <form action="" onSubmit={ this.handleSearch.bind(this) }>
                        <input ref={ this.movieTitle } type="text" placeholder="Enter movie name" />
                    </form>
                </div>

                <div className="search-text">
                    { isLoading && hasUserSearched ? <h2>Found results: </h2> : <h2>Top trending movies: </h2> }
                </div>
                
                <div className="movie-cards-wrapper">
                    
                    {
                        movies.map(movie => {
                            const imageURL = `${ IMAGE_URL }${ movie.poster_path }`
                            const pathToMovie = `/movie/${ movie.id }`;

                            return (
                                <Link key={ movie.id } to={ pathToMovie }>
                                    <div key={ movie.id } className="movie-card">
                                        <img src={ imageURL } alt=""/>
                                        <h3>{ movie.title }</h3>
                                    </div>
                                </Link>
                                
                            )
                        })
                    }
                </div>
            </>
            
        )
    }
}
