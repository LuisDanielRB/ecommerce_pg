import React from "react";
import { Link } from "react-router-dom";
import {HeartIcon } from "@heroicons/react/20/solid";
import {userAddFavorite , addToCartGuest , addToCart , cartStateSet, userGetFavorite } from '../../store/actions'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";


const EventCards = ({ eventos}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state)

    useEffect(()=> {
        user ? dispatch(userGetFavorite(user.id)) : null
    },[dispatch , user])


    const toastOptions = {
		position: "bottom-center",
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark"
		};


    //Envio producto a la DB y al Carrito
    function handleSubmit(e) {

        if(user) {
            dispatch(addToCart(e.id , user.id))
        } else {
            dispatch(addToCartGuest(e))
        }

        setTimeout(() => {
            dispatch(cartStateSet(false));
        }, 2000);
        dispatch(cartStateSet(true));
        toast.success("Evento added" , toastOptions);
    }

    //Agrego a favoritos el evento
    const addFavorite = (idEvent) => {
        dispatch(userAddFavorite(user.id , idEvent));
    }

    return (
        <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
            {eventos.map((evento) => (
                <li
                    key={evento.id}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                >
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="truncate text-sm font-medium text-gray-900">
                                    {evento.artist}
                                </h3>
                                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                    {evento.stock}
                                </span>
                                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                    ${evento.price}
                                </span>
                            </div>
                            <p className="mt-1 truncate text-sm text-gray-500">
                                {evento.description}
                            </p>
                            <p className="mt-1 truncate text-sm text-gray-500">
                                {evento.category}
                            </p>
                        </div>
                        <img
                            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                            src={evento.image}
                            alt=""
                        />
                    </div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                            <Link
                                to={`/private/events/${evento.id}`}
                                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                            >
                                <button>Detail</button>
                            </Link>
                        </div>
                        <div className="-ml-px flex w-0 flex-1">
                            <button
                                onClick={() => handleSubmit(evento)} 
                                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                            ><strong>BUY TICKET</strong><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                          </svg>
                           </button>
                            
                        </div>
                        <div className="-ml-px flex max-w-xs">
                            {user ?  (<button
                                onClick={() => addFavorite(evento.id)} 
                                className=" relative inline-flex  w-8 flex-1 items-center justify-center text-gray-700 hover:text-red-500"
                            ><HeartIcon /></button>) : null}
                           
                        </div>
                    </div>
                </li>
            ))}
            <ToastContainer />
        </ul>
        // <div className='w-auto h-75 ml-1 mr-1 rounded-lg flex flex-col pt-3 pb-3'>
        //     <div className='w-full h-1/4'>
        //         <div className='flex place-content-between pl-7 pr-7'>
        //             <div className='w-full  h-1/4 pl-7'>
        //                 <p className=' block text-sm font-medium text-gray-400'>{artist}</p>
        //             </div>
        //             <p className='bg-green-200 rounded-lg w-10 text-center '>{stock}</p>
        //         </div>
        //     </div>
        //     <div className='w-full  h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>{date}</p></div>
        //     <div className='w-full  h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>{description}</p></div>
        //     <div className=' w-full h-1/4 pl-7'><p className='block text-sm font-medium text-gray-400'>${price}.00</p></div>
        //     <div className=' w-full h-1/4 pl-7'><img src={image} alt="" width={"100px"}/></div>
        //     <div className='mt-2 pl-7'>
        //         <Link to="/private/cart">
        //             <button className=' pl-7 pr-7 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-green-400 '>Buy</button>
        //         </Link>
        // <Link to={`/private/events/${id}`}>
        //     <button className='ml-3 pl-7 pr-7 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-indigo-400'>Detail</button>
        // </Link>
        //     </div>
        // </div>
    );
};

export default EventCards;