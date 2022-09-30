import React, { useState } from 'react';
import { useRef } from 'react';
import Img1 from "../../assets/carousel/Img1.jpg"
import Img2 from "../../assets/carousel/Img2.jpg"
import Img3 from "../../assets/carousel/Img3.jpg"

export default function Carousel() {

  const mov = useRef(null);

  const goToNext = () => {
    //comprobamos que el mov tenga elementos
    if (mov.current.children.length > 0) {
      console.log(goToNext)
      //obtenemos el primer elemento del mov
      const primerElemento = mov.current.children[0];
      console.log(primerElemento)
      const tamañoSlide = mov.current.children[0].offsetWidth
      mov.current.style.transition = `300ms ease-out all`;
      mov.current.style.transform = `translateX(-${tamañoSlide}px)`
    }
  }

    const goToPrev = () => {
      console.log(mov.current)
    };



  return (
    <section>
      <div className='relative'>
        <ul id='slider' ref={mov}>
          <li className='h-[50vh] relative'>
            <img className='h-full w-full' src={Img1} alt="" />
            <div className='absolute  top-0 left-0 h-full w-full flex'>
              <h2 className='text-4xl font-bold text-white my-auto w-full text-center px-20'>Consigue los mejores boletos, a los mejores precios!</h2>
            </div>
          </li>
          <li className='h-[50vh] relative hidden'>
            <img className='h-full w-full' src={Img2} alt="" />
            <div className='absolute  top-0 left-0 h-full w-full flex'>
              <h2 className='text-4xl font-bold text-white my-auto w-full text-center px-20'>Consigue los mejores boletos, a los mejores precios!</h2>
            </div>
          </li>
          <li className='h-[50vh] relative hidden'>
            <img className='h-full w-full' src={Img3} alt="" />
            <div className='absolute  top-0 left-0 h-full w-full flex'>
              <h2 className='text-4xl font-bold text-white my-auto w-full text-center px-20'>Consigue los mejores boletos, a los mejores precios!</h2>
            </div>
          </li>
        </ul>
        <div className='absolute px-5 flex h-full w-full top-0 left-0 '>
          <div className='my-auto  w-full flex justify-between'>
            <button onClick={goToPrev} className='bg-white p-2 rounded-full bg-opacity-80 shadow-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6">
              </svg>
            </button>
            <button onClick={goToNext} className='bg-white p-2 rounded-full bg-opacity-80 shadow-lg '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  className="w-6 h-6">
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section >
  )
}