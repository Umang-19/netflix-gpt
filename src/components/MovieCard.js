import React from 'react'
import { IMAGE_CDN_URL } from '../utils/constants'


const MovieCard = ({posterPath}) => {
  return (
    <div className='w-72 pr-2'>
        <img alt="Movie Poster" src={IMAGE_CDN_URL + posterPath} className='rounded-md' />
    </div>
  )
}

export default MovieCard