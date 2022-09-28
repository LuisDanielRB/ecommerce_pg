import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/actions";


let count = 0;
let slideInterval;
export default function Slider() {
    const allEvents = useSelector((state) => state.events)
    const dispatch = useDispatch();
console.log(allEvents)
    const [currentIndex, setCurrentIndex] = useState(0);
    let image = [
        allEvents[0]?.image,
        allEvents[1]?.image,
        allEvents[2]?.image,
        allEvents[3]?.image,
    ]

    const slideRef = useRef();

    const removeAnimation = () => {
        slideRef.current.classList.remove("fade-anim");
    };

    useEffect(() => {
        slideRef.current.addEventListener("animationend", removeAnimation);
        slideRef.current.addEventListener("mouseenter", pauseSlider);
        dispatch(getAllEvents())
        return () => {
            pauseSlider();
        };
    }, [dispatch]);

    const pauseSlider = () => {
        clearInterval(slideInterval);
    };

    const handleOnNextClick = () => {
        count = (count + 1) % image.length;
        setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim");
    };

    const handleOnPrevClick = () => {
        const productsLength = image.length;
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim");
    };

    return (
        <div ref={slideRef} className="w-full select-none relative">
            <div className="max-w-lg">
                    <img src={image[currentIndex]} />
            </div>
            <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
                <button
                    className="bg-black text-white w-20 p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
                    onClick={handleOnPrevClick}
                >
                    <ArrowLeftCircleIcon />
                </button>
                <button
                    className="bg-black text-white w-20 p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
                    onClick={handleOnNextClick}
                >
                    <ArrowRightCircleIcon />
                </button>
            </div>
        </div>
    );
}