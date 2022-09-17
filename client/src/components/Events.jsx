import React, { useEffect } from 'react'
import EventCards from './UI/EventCards'
import Footer from './UI/Footer'
import Navbar from './UI/Navbar'
import { useState } from "react";
import {useSelector, useDispatch } from 'react-redux'
import {getAllEvents} from '../store/actions'
import { useNavigate } from "react-router-dom";


const Events = () => {

    // const [search, setSearch] = useState([])
    // const [events, setEvents] = useState([])
    const [eventsBU, setEventsBU] = useState([])
    const [categoriesSet, setCategoriesSet] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const eventos = useSelector((state) => state.events)
    
   
    useEffect(() => {
        dispatch(getAllEvents())
    },[dispatch])
  
    // function selectOption(e) {

    //     console.log(categoriesSet)
    //     const filterOption = e.target.value === "-" ? eventsBU : eventsBU.filter((el) => el.category === e.target.value)
    //     setEvents(filterOption)
    // }
    
    // function searchLive(e) {
    //     e.preventDefault()
        
    //     setSearch(e.target.value)
    //     const filteredInput = e.target.value === "" ? eventsBU : eventsBU.filter(el => el.title.includes(e.target.value) || el.description.includes(e.target.value))
    //     setEvents(filteredInput)
    // }
    
  return (
    <>
        <Navbar />
        <div className='flex flex-col p-0 w-376 h-328'>
          <div className=' pt-10 pl-1 pr-1 pb-10 '>
              <p className='pl-7 font-extrabold text-3xl' >Explorar</p>
              <p className='pl-7 font-light text-gray-500 pt-2'>Explora entre los próximos eventos</p>
              <p className='pl-7  font-light text-gray-500 pt-4'>Filtro</p>
              <div className='pl-7 pr-7 pt-3'>
              <select onChange={(e) => selectOption(e)} className='w-full'>
                {/* <option value="-">-</option>
                { 
                  categoriesSet?.map((el) => {
                    return (
                      <option key={el} value={el}>{el}</option>
                    )
                  })
                } */}
              </select>
                
              </div>
          </div>
        </div>
        {
          eventos?.map((el) => {
            return (
                <div>
                <EventCards key={el.id} description={el.description} id={el.id} price={el.price}  brand={el.brand} title={el.title} stock={el.stock}/>
                </div>
              
            )
          })
        }
        <Footer />
    </>
  )
}

export default Events