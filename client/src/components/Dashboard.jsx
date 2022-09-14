import React from 'react'
import EventCards from './UI/EventCards'
import Footer from './UI/Footer'
import Navbar from './UI/Navbar'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";



const Dashboard = () => {
    const {getAllEvents} = useAuth()
    
    async function getAll() {
        const events = await getAllEvents()
        console.log(events.data)
    }

    getAll()

  return (
    <>
        <Navbar />
        <EventCards />
        <Footer />
    </>
  )
}

export default Dashboard