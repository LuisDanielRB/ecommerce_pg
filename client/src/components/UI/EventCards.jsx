import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/20/solid";
import {
  userAddFavorite,
  addToCartGuest,
  addToCart,
  cartStateSet,
  userGetFavorite,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Favorites from "./Favorites";

const EventCards = ({ eventos}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);

    
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
        if (user) {
            dispatch(addToCart(e.id, user.id))
            setTimeout(() => {
                dispatch(cartStateSet(false));
            }, 2000);
            dispatch(cartStateSet(true));
            toast.success("Evento added", toastOptions);
        } else {
            toast.error("Register please", toastOptions);
        }
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
                  STOCK: {evento.stock}
                </span>
                <span className=" text-center rounded-full bg-green-300 px-1.5 py-1.5 text font-medium text-green-800 mt-2">
                  PRICE: ${evento.price}
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
              >
                <strong>BUY TICKET</strong>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mx-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>
              </button>
            </div>
            <div className="-ml-px flex inline-flex relative">
              {user ? (
                <button
                  onClick={() => addFavorite(evento.id)}
                  className="w-8 flex-1 text-gray-700 hover:text-red-500"
                >
                    <div className="flex  items-center justify-between space-x-6 p-6">
                        <div className="flex-1 truncate">
                            <div className="grid justify-items-center">
                                <div className="justify-center">
                                    <img
                                        className="h-56 w-80 flex-shrink-0 rounded bg-gray-300"
                                        src={evento.image}
                                        alt=""
                                    />
                                </div>
                                <h3 className="mt-1 truncate text-xs font-medium text-gray-900">
                                    {evento.artist.join(" - ")}
                                </h3>
                                <span className=" text-center rounded-full bg-green-300 px-1.5 py-1.5 text font-medium text-green-800 mt-2">
                                    STOCK:       {evento.stock}
                                </span>
                                <span className=" text-center rounded-full bg-green-300 px-1.5 py-1.5 text font-medium text-green-800 mt-2">
                                    PRICE:        ${evento.price}.00
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
                            ><strong>BUY TICKET</strong><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                          </svg>
                           </button>
                        </div>
                        <div className="-ml-px flex relative">
                            {user ? <Favorites id={evento.id}/> : null}
                        </div>
                    </div>
                </li>
            ))}
            <ToastContainer />
        </ul>);
};

export default EventCards;
