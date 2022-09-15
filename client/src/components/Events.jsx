import React, { useEffect } from 'react'
import EventCards from './UI/EventCards'
import Footer from './UI/Footer'
import Navbar from './UI/Navbar'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Events = () => {
    const {getAllEvents} = useAuth()
    const [search, setSearch] = useState([])
    const [events, setEvents] = useState([])
    const [eventsBU, setEventsBU] = useState([])
    const [categoriesSet, setCategoriesSet] = useState([])
    const navigate = useNavigate()


    async function getAll(){
        const {categories, datos}  = await getAllEvents()
        setCategoriesSet(categories)
        setEvents(datos)
        setEventsBU(datos)
    }
    
   
    useEffect(() => {
        getAll()
        
    },[])
  
    function selectOption(e) {
        const filterOption = e.target.value === "-" ? eventsBU : eventsBU.filter((el) => el.description === e.target.value)
        setEvents(filterOption)
    }
    
    function searchLive(e) {
        e.preventDefault()
        
        setSearch(e.target.value)
        const filteredInput = e.target.value === "" ? eventsBU : eventsBU.filter(el => el.description.includes(e.target.value) || el.artist.includes(e.target.value))
        setEvents(filteredInput)
    }
    

    // function productDetail(e, id) {
    //     e.preventDefault()
    //     navigate(`/eventsDB/${id}`)
    // }


  return (
    <>
        <Navbar searchLive ={searchLive} />
        <div className='flex flex-col p-0 w-376 h-328'>
          <div className=' pt-10 pl-1 pr-1 pb-10 '>
              <p className='pl-7 font-extrabold text-3xl' >Explorar</p>
              <p className='pl-7 font-light text-gray-500 pt-2'>Explora entre los próximos eventos</p>
              <p className='pl-7  font-light text-gray-500 pt-4'>Filtro</p>
              <div className='pl-7 pr-7 pt-3'>
              <select onChange={(e) => selectOption(e)} className='w-full'>
                <option value="-">-</option>
                { 
                  categoriesSet?.map((el) => {
                    return (
                      <option key={el} value={el}>{el}</option>
                    )
                  })
                }
              </select>
                
              </div>
          </div>
        </div>
        {
          events?.map((el) => {
            return (
                <Link key={el.id} to={`/eventsDB/${el.id}` }>
                <EventCards id={el.id} description={el.description} artist={el.artist} category={el.category} price={el.price} stock={el.stock} date={el.date} />
                </Link>
            )
          })
        }
        <Footer />
    </>
  )
}

export default Events