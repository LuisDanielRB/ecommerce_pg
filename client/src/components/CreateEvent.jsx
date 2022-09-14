import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function CreateEvent() {
    const { createEvent } = useAuth();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        description: "",
        price: "",
        date: "",
        artist: "",
        place: "",
        stock: "",
        category: "",
    });

    const [error, setError] = useState({
        error: false,
        message: [],
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (
                !input.description === "" ||
                !input.artist === "" ||
                !input.place.length === 0 ||
                !input.category.length === 0
            ) {
                await createEvent(input);
                setInput({
                    description: "",
                    price: "",
                    date: "",
                    artist: "",
                    place: "",
                    stock: "",
                    category: "",
                });
                navigate("/");
            } else {
                setError({
                    error: true,
                    message: [
                        "Please enter a description",
                        "Please enter a artist",
                        "Please select one place",
                        "Please select one category",
                    ],
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

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
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleInputChange}
                                        id="description"
                                        name="description"
                                        type="description"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="artist"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Artist
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleInputChange}
                                        id="Artist"
                                        name="Artist"
                                        type="Artist"
                                        autoComplete="current-Artist"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="place"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Place
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleInputChange}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="Estados Unidos">Estados Unidos</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Venezuela">Venezuela</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Category
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleInputChange}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="Musica">Musica</option>
                                        <option value="Desfile">Desfile</option>
                                        <option value="Espectaculo">Espectaculo</option>
                                        <option value="Convenciones">Convenciones</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="Price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Price
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleInputChange}
                                        id="Price"
                                        name="Price"
                                        type="Price"
                                        autoComplete="current-Price"
                                        placeholder="$"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="Stock"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Stock
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleInputChange}
                                        id="Stock"
                                        name="Stock"
                                        type="Stock"
                                        autoComplete="current-Stock"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="Date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Date
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleInputChange}
                                        id="Date"
                                        name="Date"
                                        type="Date"
                                        autoComplete="current-Date"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="m-24 ">
                                <button onSubmit={handleSubmit} className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-indigo-400"
                                >Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateEvent;