import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useRef } from 'react';
import Img1 from "../../assets/carousel/Img1.jpg"
import Img2 from "../../assets/carousel/Img2.jpg"
import Img3 from "../../assets/carousel/Img3.jpg"

export default function Carousel() {

  const mov = useRef(null);

  const goToNext = () => {
    // comprobamos que el mov tenga elementos
    if (mov.current.children.length > 0) {

      //   //obtenemos el primer elemento del mov
      const primerElemento = mov.current.children[0];

      mov.current.style.transition = `5000ms ease-out all`;

      const tamañoSlide = mov.current.children[0].offsetWidth
      mov.current.style.transform = `translateX(-${tamañoSlide}px)`

      const transicion = () => {
        mov.current.style.transition = 'none';
        mov.current.style.transform = `translateX(0)`;

      }

      mov.current.addEventListener('transtitionend', transicion)
    }
  }

  const goToPrev = () => {
    console.log(goToPrev)
  };



  return (
    <section>
      <div className='relative'>
        <ul id='slider' ref={mov}>
          <li className='h-[50vh] relative transition-all-duration-300'>
            <img className='h-full w-full' src={Img1} alt="" />
            <div className='absolute  top-0 left-0 h-full w-full flex'>
              <h2 className='text-4xl font-bold text-white my-auto w-full text-center px-20'>Consigue los mejores boletos, a los mejores precios!</h2>
            </div>
          </li>
          <li className='h-[50vh] relative hidden transition-all-duration-300'>
            <img className='h-full w-full' src={Img2} alt="" />
            <div className='absolute  top-0 left-0 h-full w-full flex'>
              <h2 className='text-4xl font-bold text-white my-auto w-full text-center px-20'>Consigue los mejores boletos, a los mejores precios!</h2>
            </div>
          </li>
          <li className='h-[50vh] relative hidden transition-all-duration-300'>
            <img className='h-full w-full' src={Img3} alt="" />
            <div className='absolute  top-0 left-0 h-full w-full flex'>
              <h2 className='text-4xl font-bold text-white my-auto w-full text-center px-20'>Consigue los mejores boletos, a los mejores precios!</h2>
            </div>
          </li>
        </ul>
        <div className='absolute px-5 flex h-full w-full top-0 left-0 '>
          <div className='my-auto  w-full flex justify-between '>
            <button onClick={goToPrev} >
              <ArrowLeftCircleIcon viewBox="0 0 30 30" className="w-20 h-20" />
            </button>
            <button onClick={goToNext} >
              <ArrowRightCircleIcon viewBox="0 0 30 30" className="w-20 h-20" />
            </button>
          </div>
        </div>
      </div>
    </section >
  )
}