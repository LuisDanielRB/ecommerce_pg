// import React, { useState } from 'react';
// import Img1 from "../../carousel/img1.webp"
// import Img2 from "../../carousel/img2.jpg"
// import Img3 from "../../carousel/img3.jpg"

// const Carousel = () => {
//   return (
//     <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
//       <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
//         <button
//           type="button"
//           data-bs-target="#carouselExampleCaptions"
//           data-bs-slide-to="0"
//           className="active"
//           aria-current="true"
//           aria-label="Slide 1"
//         ></button>
//         <button
//           type="button"
//           data-bs-target="#carouselExampleCaptions"
//           data-bs-slide-to="1"
//           aria-label="Slide 2"
//         ></button>
//         <button
//           type="button"
//           data-bs-target="#carouselExampleCaptions"
//           data-bs-slide-to="2"
//           aria-label="Slide 3"
//         ></button>
//       </div>
//       <div className="carousel-inner relative w-full overflow-hidden">
//         <div className="carousel-item active relative float-left w-full">
//           <img
//             src={Img1}
//             className="block w-full"
//             alt="..."
//           />
//           <div className="carousel-caption hidden md:block absolute text-center">
//             <h5 className="text-xl">First slide label</h5>
//             <p>Some representative placeholder content for the first slide.</p>
//           </div>
//         </div>
//         <div className="carousel-item relative float-left w-full">
//           <img
//             src={Img2}
//             className="block w-full"
//             alt="..."
//           />
//           <div className="carousel-caption hidden md:block absolute text-center">
//             <h5 className="text-xl">Second slide label</h5>
//             <p>Some representative placeholder content for the second slide.</p>
//           </div>
//         </div>
//         <div className="carousel-item relative float-left w-full">
//           <img
//             src={Img3}
//             className="block w-full"
//             alt="..."
//           />
//           <div className="carousel-caption hidden md:block absolute text-center">
//             <h5 className="text-xl">Third slide label</h5>
//             <p>Some representative placeholder content for the third slide.</p>
//           </div>
//         </div>
//       </div>
//       <button
//         className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
//         type="button"
//         data-bs-target="#carouselExampleCaptions"
//         data-bs-slide="prev"
//       >
//         <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button
//         className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
//         type="button"
//         data-bs-target="#carouselExampleCaptions"
//         data-bs-slide="next"
//       >
//         <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
//         <span className="visually-hidden">Next</span>
//       </button>
//     </div>
//   )
// }

// export default Carousel;

import { useState, useRef, useEffect } from 'react';

// Data
import data from './data.json';

const Carousel = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);


  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel my-12 mx-auto">
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            // disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            // disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {data.resources.map((resource, index) => {
            return (
              <div
                key={index}
                className="carousel-item text-center w-full"
              >
                <a
                  href={resource.link}
                  className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                  style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
                >
                  <img
                    src={resource.imageUrl || ''}
                    alt={resource.title}
                    className="w-full hidden"
                  />
                </a>
                <a
                  href={resource.link}
                  className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
                >
                  <h3 className="text-white py-6 px-3 mx-auto text-xl">
                    {resource.title}
                  </h3>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;