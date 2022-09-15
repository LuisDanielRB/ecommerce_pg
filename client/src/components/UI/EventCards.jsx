import React from 'react'

const EventCards = ({stock, artist, date, price, description, id}) => {
  return (
    
       <div key={id} className='w-auto h-36 ml-1 mr-1 rounded-lg flex flex-col pt-3 pb-3'>
            <div className='w-full h-1/4'>
                <div className='flex place-content-between pl-7 pr-7'>
                    <p className=' font-bold'>{description}</p>
                    <p className='bg-green-200 rounded-lg w-10 text-center '>{stock}</p>
                </div>
            </div>
            <div className='w-full  h-1/4 pl-7'>
                <p className='block text-sm font-medium text-gray-400'>{date}</p>
            </div>
            <div className='w-full  h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>{artist}</p></div>
            <div className=' w-full h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>${price}.00</p></div>
       </div>
    
  )
}

export default EventCards