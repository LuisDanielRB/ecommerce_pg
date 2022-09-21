import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addCart } from '../../store/actions';
const EventCards = ({ id, price, stock, artist, description, date }) => {
    const dispatch = useDispatch();
    const allCart = useSelector((state) => state.cart);
    const [count, setCount] = useState()

    function handleSubmit(e) {
        dispatch(addCart(e))
        setCount(allCart)
    }

    console.log(allCart)

    return (
        <div className='w-auto h-36 ml-1 mr-1 rounded-lg flex flex-col pt-3 pb-3'>
            <div className='w-full h-1/4'>
                <div className='flex place-content-between pl-7 pr-7'>
                    <div className='w-full  h-1/4 pl-7'>
                        <p className=' block text-sm font-medium text-gray-400'>{artist}</p>
                    </div>
                    <p className='bg-green-200 rounded-lg w-10 text-center '>{stock}</p>
                </div>
            </div>
            <div className='w-full  h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>{date}</p></div>
            <div className='w-full  h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>{description}</p></div>
            <div className=' w-full h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>${price}.00</p></div>
            <div className='mt-2 pl-7'>
                <button onClick={(e) => handleSubmit(id)} value={id} className=' pl-7 pr-7 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-black-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-yellow-400 '>Add to Cart</button>
                <Link to={`/private/events/${id}`}>
                    <button className='ml-3 pl-7 pr-7 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-indigo-400'>Detail</button>
                </Link>
            </div>
        </div>
    )
}

export default EventCards