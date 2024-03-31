import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies);

    if(!movies) return;

    const mainMovie = movies[0];
    const {original_title, overview} = mainMovie;
    console.log(mainMovie);

  return (
    <div> 
        <VideoTitle title={original_title} description={overview}/>
        <VideoBackground />
    </div>
  )
}

export default MainContainer