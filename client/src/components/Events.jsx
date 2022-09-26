import React, { useEffect } from "react";
import EventCards from "./UI/EventCards";
import EventCardsDB from "./UI/EventCardDB";
import Footer from "./UI/Footer";
import Navbar from "./UI/Navbar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents} from "../store/actions";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const searchLive = useSelector((state) => state.searchLive);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.events);
  const {eventsDB} = useSelector((state) => state)
  const categories = useSelector((state) => state.categories);
  const artists = useSelector((state) => state.artists);
  const place = useSelector((state) => state.places);
  const [filtered, setFiltered] = useState();
  const [filters, setFilters] = useState({
    category: "-",
    artist: "-",
    place: "-",
  });
  const [searchFilter, setSearchFilter] = useState();



  useEffect(() => {
    dispatch(getAllEvents());
    getFiltered();
  }, [dispatch, filters]);

  function filterArr(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) return true;
    }
  }

  function selectCategory(e) {
    if (e.target.value === "-") {
      setFilters({ ...filters, category: "-" });
    } else {
      setFilters({ ...filters, category: e.target.value });
    }
  }

  function selectArtist(e) {
    if (e.target.value === "-") {
      setFilters({ ...filters, artist: "-" });
    } else {
      setFilters({ ...filters, artist: e.target.value });
    }
  }

  function selectPlace(e) {
    if (e.target.value === "-") {
      setFilters({ ...filters, place: "-" });
    } else {
      setFilters({ ...filters, place: e.target.value });
    }
  }

  // function filterIncludes(arr, value){
  //   for(let i = 0; i < arr.length; i++){
  //     if(arr[i].includes(value)) return true
  //   }
  // }

  // function searching(){
  //   if(filtered) {
  //     let searchIncludes = filtered.filter(el => filterIncludes(el.artist, value) || filterIncludes(el.category, value) || el.place.includes(searchLive))
  //     setSearchFilter(searchIncludes)
  //   }
  //   if(!filtered) {
  //     let searchIncludes = eventos.filter(el => filterIncludes(el.artist, value) || filterIncludes(el.category, value) || el.place.includes(searchLive))
  //     setSearchFilter(searchIncludes)
  //   }
  // }

  function getFiltered() {
    const { category, artist, place } = filters;
    if (category !== "-" && artist === "-" && place === "-") {
      let filtrado = eventos.filter((el) => filterArr(el.category, category));
      setFiltered(filtrado);
    }
    if (category !== "-" && artist === "-" && place !== "-") {
      let filtrado = eventos.filter(
        (el) => filterArr(el.category, category) && el.place === place
      );
      setFiltered(filtrado);
    }
    if (category !== "-" && (artist !== "-") & (place === "-")) {
      let filtrado = eventos.filter(
        (el) => filterArr(el.category, category) && filterArr(el.artist, artist)
      );
      setFiltered(filtrado);
    }
    if (category !== "-" && (artist !== "-") & (place !== "-")) {
      let filtrado = eventos.filter(
        (el) =>
          filterArr(el.category, category) &&
          filterArr(el.artist, artist) &&
          el.place === place
      );
      setFiltered(filtrado);
    }
    if (category === "-" && artist === "-" && place !== "-") {
      let filtrado = eventos.filter((el) => el.place === place);
      setFiltered(filtrado);
    }
    if (category === "-" && artist !== "-" && place === "-") {
      let filtrado = eventos.filter((el) => filterArr(el.artist, artist));

      setFiltered(filtrado);
    }
    if (category === "-" && artist !== "-" && place !== "-") {
      let filtrado = eventos.filter(
        (el) => filterArr(el.artist, artist) && el.place === place
      );
      console.log("Dos filtrados ", filtrado);
      setFiltered(filtrado);
    }
    if (category === "-" && artist === "-" && place === "-") {
      setFiltered();
    }
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <div className=" pt-10 pl-1 pr-1 pb-10 ">
            <p className="pl-7 font-extrabold text-3xl">Explorar</p>
            <p className="pl-7 font-light text-gray-500 pt-2">
              Explora entre los proximos eventos
            </p>
          </div>
        </div>

        <div className="px-5 mb-10 w-full lg:mx-0 lg:flex lg:justify-between lg:w-full ">
          <div>
            <label
              htmlFor="categorie"
              className="block text-sm font-medium text-gray-700"
            >
              Categorias
            </label>
            <select
              id="categorie"
              name="categorie"
              onChange={(e) => selectCategory(e)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="-">-</option>
              {categories?.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label
              htmlFor="artists"
              className="block text-sm font-medium text-gray-700"
            >
              Artistas
            </label>
            <select
              id="artists"
              name="artists"
              onChange={(e) => selectArtist(e)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="-">-</option>
              {artists?.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label
              htmlFor="place"
              className="block text-sm font-medium text-gray-700"
            >
              Lugares
            </label>
            <select
              id="place"
              name="place"
              onChange={(e) => selectPlace(e)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="-">-</option>
              {place?.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {filtered ? (
        <div className="mx-8">
          <EventCards eventos={filtered} />
        </div>
      ) : (
        <div className="mx-8">
          <EventCards eventos={eventos} />
        </div>
      )}
      <Footer />
    </>
  );
};
export default Events;
