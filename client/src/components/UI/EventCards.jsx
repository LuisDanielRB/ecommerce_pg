import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/20/solid";
import { userAddFavorite, addToCartGuest, addToCart, cartStateSet } from '../../store/actions'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

const EventCards = ({ eventos }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);

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
        if (user) {
            dispatch(addToCart(e.id, user.id))
        } else {
            dispatch(addToCartGuest(e))
        }
        setTimeout(() => {
            dispatch(cartStateSet(false));
        }, 2000);
        dispatch(cartStateSet(true));
        toast.success("Evento added", toastOptions);
    }

    //Agrego a favoritos el evento
    const addFavorite = (idEvent) => {
        dispatch(userAddFavorite(user.id, idEvent));
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
                    <div className="flex  items-center justify-between space-x-6 p-6">
                        <div className="flex-1 truncate">
                            <div className="grid justify-items-center">
                                <div className="justify-center">
                                    <img
                                        className="h-50 w-80 flex-shrink-0 rounded bg-gray-300"
                                        src={evento.image}
                                        alt=""
                                    />
                                </div>
                                <h3 className="mt-3 truncate text-xs font-medium text-gray-900">
                                    {evento.artist.join(" - ")}
                                </h3>
                                <span className=" text-center rounded-full bg-green-300 px-1.5 py-1.5 text font-medium text-green-800 mt-2">
                                    STOCK:       {evento.stock}
                                </span>
                                <span className=" text-center rounded-full bg-green-300 px-1.5 py-1.5 text font-medium text-green-800 mt-2">
                                    PRICE:        ${evento.price}
                                </span>
                            </div>
                            <p className="mt-1 text-center truncate text-sm text-gray-500">
                                {evento.description}
                            </p>
                            <p className="mt-1 text-center truncate text-sm text-gray-500">
                                {evento.category}
                            </p>
                        </div>
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
                            >Add to cart</button>
                        </div>
                        <div className="-ml-px flex inline-flex relative">
                            {user ? (<button
                                onClick={() => addFavorite(evento.id)}
                                className="w-8 flex-1 text-gray-700 hover:text-red-500"
                            ><HeartIcon /></button>) : null}
                        </div>
                    </div>
                </li>
            ))}
            <ToastContainer />
        </ul>);
};

export default EventCards;