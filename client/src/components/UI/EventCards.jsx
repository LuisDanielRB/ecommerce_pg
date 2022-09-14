import React from 'react'

const EventCards = ({description, date, place, artist, price}) => {
  return (
    
       <div className='w-auto h-36 ml-1 mr-1 rounded-lg flex flex-col pt-3 pb-3'>
            <div className='w-full h-1/4'>
                <div className='flex place-content-between pl-7 pr-7'>
                    <p className=' font-bold'>Evento</p>
                    <p className='bg-green-200 rounded-lg w-10 text-center '> 100</p>
                </div>
            </div>
            <div className='w-full  h-1/4 pl-7'>
                <p className='block text-sm font-medium text-gray-400'>Artista</p>
            </div>
            <div className='w-full  h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>Locación del evento</p></div>
            <div className=' w-full h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>January 20, September 2020</p></div>
       </div>
    
  )
}

export default EventCards