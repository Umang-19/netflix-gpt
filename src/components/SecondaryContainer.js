import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    movies.nowPlayingMovies && (
    <div className=' bg-black'>
      <div className='-mt-80 relative z-30 ml-8'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Trending"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Top Picks For You"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Latest Movies"} movies={movies.nowPlayingMovies}/>

      </div>

    </div>
    )
  );
}

export default SecondaryContainer