import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import {useSelector, useDispatch } from 'react-redux'
import {getEventDetail} from '../../store/actions'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const CardDetail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const eventDetail = useSelector((state) => state.eventsDetail)
  
  useEffect(() => {
    dispatch(getEventDetail(id))
},[dispatch , id])

  return (
    <>
        <Navbar />
            <section className=' flex flex-col align-middle w-auto h-96 mb-52 bg-black '>
                <p className='  pt-20 pl-10 text-white font-extrabold text-3xl'>Artista
                {eventDetail && eventDetail.title}</p>
                <p className=' pt-5 pl-10 pr-10 text-white'>Detalles del evento, fecha, hora, descripción</p>
                <div className='bg-white w-4/5 self-center rounded-t-lg rounded-b-lg '>
                    <div className='ml-6 pt-6'>
                    <p className='font-extrabold text-xl'>Concierto</p>
                    <p className=' text-gray-500 text-sm'>Fechas</p>
                    <p className=' text-gray-500 text-sm'>Foro</p>
                    </div>
                    
                    <button className='bg-gray-200 w-full pl-8 mt-60 text-left h-10 rounded-b-lg'>Comprar tu boleto</button>
                </div>
            </section>
        <Footer />
    </>
  )
}

export default CardDetail