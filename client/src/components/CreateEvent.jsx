import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

function CreateEvent() {
    const { create } = useAuth();
    const navigate = useNavigate();
    const [artist1, setArtist1] = useState([]);
    console.log(artist1)
    const [input, setInput] = useState({
        description: "",
        price: 0,
        date: "",
        artist: [],
        place: "",
        stock: 0,
        category: [],
    });
    console.log(input)

    const [error, setError] = useState({});

    function validation(input) {
        let errors = {};
        if (input.description.length < 20) { errors.description = "Minium 20 characters"; }
        if (input.description.length > 255) { errors.description = "Max 255 characters"; }
        if (!Date.parse(input.date)) { errors.date = "Date of release is required"; }
        if (!input.artist) { errors.artist = "artist is required"; }
        if (!input.price) { errors.price = "price is required"; }
        if (!input.stock) { errors.stock = "stock is required"; }
        if (!input.place) { errors.place = "place is required"; }
        if (!input.category.length) { errors.category = "Select at least a one or five genres "; }
        return errors;
    }

    const artista = []
    function handleArtist(e) {
        artista.push(setInput({
            ...input,
            artist: [e.target.value]
        })
        )
    }

    function handleInpuntArtist(e) {
        setInput({
            ...input,
            artist: [e.target.value]
        })
        setError(
            validation({
                ...input,
                artist: [...input.artist, e.target.value]
            })
        )
    };

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(
            validation({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
    };

    function handleInputPrice(e) {
        setInput({
            ...input,
            price: Number(e.target.value),
        })
        setError(
            validation({
                ...input,
                price: [e.target.value]
            })
        )
    }

    function handleInputStock(e) {
        setInput({
            ...input,
            stock: Number(e.target.value)
        })
        setError(
            validation({
                ...input,
                stock: [e.target.value]
            })
        )
    }

    const handleSelectCategory = (e) => {
        setInput({
            ...input,
            category: [...new Set([...input.category, e.target.value])]
        })
        setError(
            validation({
                ...input,
                category: [...input.category, e.target.value]
            })
        )

    }

    const handleSelectPlace = (e) => {
        const { value } = e.target;
        setInput({
            ...input,
            place: value
        })
        setError(
            validation({
                ...input,
                place: value
            })
        )

    }

    function handleSubmit(e) {
        e.preventDefault();
        create(input);
        setError(validation(input))
        setInput({
            description: "",
            price: 0,
            date: "",
            artist: [],
            place: "",
            stock: 0,
            category: [],
        });
        navigate("/");
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create your Event
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit}
                            className="space-y-6 mt-6">
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={(e) => handleInputChange(e)}
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Description..."
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {error.description && (<p> ❌{error.description}</p>)}
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Artist
                                </label>
                                <div className="mt-1 flex">
                                    <input
                                        onChange={(e) => handleInpuntArtist(e)}
                                        id="artist"
                                        name="artist"
                                        type="text"
                                        placeholder="Artist..."
                                        autoComplete="current-Artist"
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <button onSubmit={handleArtist} className="m-2"><PlusCircleIcon className="h-5 w-5 text-green-800 text-right" /></button>
                                </div>
                                {error.artist && (<p> ❌{error.artist}</p>)}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" >
                                    Place
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={(e) => handleSelectPlace(e)}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="Estados Unidos">Estados Unidos</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Venezuela">Venezuela</option>
                                    </select>
                                </div>
                                {error.place && (<p> ❌{error.place}</p>)}
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Category
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={(e) => handleSelectCategory(e)}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="Musica">Musica</option>
                                        <option value="Desfile">Desfile</option>
                                        <option value="Espectaculo">Espectaculo</option>
                                        <option value="Convenciones">Convenciones</option>
                                    </select>
                                </div>
                                {error.category && (<p> ❌{error.category}</p>)}
                            </div>
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Price
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => handleInputPrice(e)}
                                        id="price"
                                        name="price"
                                        type="price"
                                        placeholder="$..."
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {error.price && (<p> ❌{error.price}</p>)}
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Stock
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => handleInputStock(e)}
                                        id="stock"
                                        name="stock"
                                        type="stock"
                                        placeholder="Stock..."
                                        autoComplete="current-Stock"
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {error.stock && (<p> ❌{error.stock}</p>)}
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Date
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) => handleInputChange(e)}
                                        id="date"
                                        type="date"
                                        name="date"
                                        autoComplete="current-Date"
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {error.date && (<p> ❌{error.date}</p>)}
                            </div>
                            <button
                                type='submit'
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-indigo-400"
                            >Create</button>
                        </form>
                        <div className="mt-4">
                            <a
                                href="/"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-center"
                            ><input type="button" value="Go Back" /></a>
                        </div>
                    </div >
                </div >
            </div >
        </>
    )
}

export default CreateEvent;