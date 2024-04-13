import React from 'react'

const VideoTitle = ({title, description}) => {
  return (
    <div className='pt-[10%] px-12 pl-20 w-screen aspect-video absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/3'>{description}</p>
        <div className='flex pt-4'>
            <button className='bg-white text-black p-2 px-10 text-xl rounded-md flex font-semibold hover:bg-opacity-60'><img className='w-8 h-8 pr-1' src="https://img.icons8.com/ios-filled/50/play--v1.png"/>Play</button>

            <button className='mx-4 bg-gray-500 text-white p-2 px-12 py-2 pt-3 text-xl rounded-md bg-opacity-40 flex'><img className='w-8 h-8 mr-2' src="https://img.icons8.com/ios/50/000000/info--v1.png" alt="info--v1"/> More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle