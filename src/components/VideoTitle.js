import React from 'react'

const VideoTitle = ({title, description}) => {
  return (
    <div className='pt-36 px-12 w-screen aspect-video absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/3'>{description}</p>
        <div className=''>
            <button className='bg-gray-500 text-black p-4 px-12 text-xl rounded-lg bg-opacity-40'> ▶️ Play</button>
            <button className=' mx-2 bg-gray-500 text-black p-4 px-12 text-xl rounded-lg bg-opacity-40'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle