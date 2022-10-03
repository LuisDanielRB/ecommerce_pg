import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { createEvent } from "../store/actions";
import { useDispatch , useSelector} from "react-redux";
import Logo from "../logo/logo.png";
import data from "../utils/place.json";

function CreateEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [error, setError] = useState({});
  const [artistas, setArtistas] = useState({});
  const [input, setInput] = useState({
    description: "",
    price: 0,
    date: "",
    artist: [],
    place: "",
    stock: 0,
    category: [],
    userId: user.id,
    image: "",
    imageId: "",
  });

  function validation(input) {
    let errors = {};
    if (input.description.length < 20) {
      errors.description = "Minium 20 characters";
    }
    if (input.description.length > 255) {
      errors.description = "Max 255 characters";
    }
    if (!Date.parse(input.date)) {
      errors.date = "Date of release is required";
    }
    if (!input.artist) {
      errors.artist = "artist is required";
    }
    if (!input.price) {
      errors.price = "price is required";
    }
    if (!input.stock) {
      errors.stock = "stock is required";
    }
    if (!input.place) {
      errors.place = "place is required";
    }
    if (!input.category.length) {
      errors.category = "Select at least a one or five genres ";
    }
    return errors;
  }

  async function handleFile(e) {
    e.preventDefault();
    let image = e.target.files[0];
    let data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "pkokipva");
    fetch("https://api.cloudinary.com/v1_1/dzjonhhps/image/upload", {
      method: 'POST',
      body: data
    }).then(res => res.json()).then(res => {
      setInput({
        ...input,
        image: res.secure_url,
        imageId: res.public_id
      })
    })
  }

  const handleInputArtist = (e) => {
    const { value } = e.target;
    setArtistas(value)
  };

  const handleArtist = (e) => {
    let nombre = e
    if (Object.values(input.artist).includes(nombre)) {
      alert('Artist already exists')
    } else {
      setInput({
        ...input,
        artist: [...input.artist, nombre]
      })
      setError(
        validation({
          ...input,
          artist: [...input.artist, nombre],
        })
      );
      setArtistas("")
    }
    document.getElementById('artist').value = ""
  };

  const handleDeleteArtist = (e) => {
    let newEvent = input.artist
    const a = newEvent.filter(artist => artist !== e)
    setInput({
      ...input,
      artist: a
    })
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
    );
  }

  function handleInputPrice(e) {
    setInput({
      ...input,
      price: Number(e.target.value),
    });
    setError(
      validation({
        ...input,
        price: [e.target.value],
      })
    );
  }

  function handleInputStock(e) {
    setInput({
      ...input,
      stock: Number(e.target.value),
    });
    setError(
      validation({
        ...input,
        stock: [e.target.value],
      })
    );
  }

  const handleSelectCategory = (e) => {
    setInput({
      ...input,
      category: [...new Set([...input.category, e.target.value])],
    });
    setError(
      validation({
        ...input,
        category: [...input.category, e.target.value],
      })
    );
  };

  const handleSelectPlace = (e) => {
    const { value } = e.target;
    setInput({
      ...input,
      place: value,
    });
    setError(
      validation({
        ...input,
        place: value,
      })
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    setInput({
      ...input,
      artist: [...input.artist, artistas],
    });
    dispatch(createEvent(input));
    setError(validation(input));
    setInput({
      description: "",
      price: 0,
      date: "",
      artist: [],
      place: "",
      stock: 0,
      category: [],
      userId: "",
      image: "",
      imageId: "",
    });
    navigate("/events");
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <a href="/">
            <img
              className="mx-auto h-24 w-auto"
              src={Logo}
              alt="Your Company"
            />
          </a>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your Event
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                {error.description && <p> ❌{error.description}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Artist
                </label>
                <div className="mt-1 flex">
                  <input
                    onChange={(e) => handleInputArtist(e)}
                    id="artist"
                    name="artist"
                    type="text"
                    placeholder="Artist..."
                    autoComplete="current-Artist"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <button onClick={() => handleArtist(artistas)} className="m-2">
                    <PlusCircleIcon className="h-5 w-5 text-green-800 text-right" />
                  </button>
                </div>{error.artist && <p> ❌{error.artist}</p>}
                {input.artist && input.artist.map((artist, idx) => {
                  return (<p key={idx}>
                    {artist} <button onClick={() => handleDeleteArtist(artist)}>X</button>
                  </p>
                  )
                })}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Place
                </label>
                <div className="mt-1">
                  <select
                    onChange={(e) => handleSelectPlace(e)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option hidden>
                      Please select a place
                    </option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    {data?.map((place, id) => {
                      return <option key={id}>{place.name_es}</option>
                    })}
                  </select>
                </div>
                {error.place && <p> ❌{error.place}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="mt-1">
                  <select
                    onChange={(e) => handleSelectCategory(e)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option default value="">
                      Please select a category
                    </option>
                    <option value="Musica">Musica</option>
                    <option value="Desfile">Desfile</option>
                    <option value="Espectaculo">Espectaculo</option>
                    <option value="Convenciones">Convenciones</option>
                  </select>
                </div>
                {error.category && <p> ❌{error.category}</p>}
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
                    type="text"
                    placeholder="$..."
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.price && <p> ❌{error.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => handleInputStock(e)}
                    id="stock"
                    name="stock"
                    type="text"
                    placeholder="Stock..."
                    autoComplete="current-Stock"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.stock && <p> ❌{error.stock}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => handleInputChange(e)}
                    id="date"
                    type="date"
                    name="date"
                    autoComplete="current-Date"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.date && <p> ❌{error.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleFile}
                    type="file"
                    placeholder="The url of your image"
                    name="image"
                    autoComplete="off"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  /><img src={input.image} />
                </div>
              </div>
              <button
                type="submit"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-indigo-400"
              >
                Create
              </button>
            </form>
            <div className="mt-4">
              <a
                href="/"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-center"
              >
                <input type="button" value="Go Back" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;

