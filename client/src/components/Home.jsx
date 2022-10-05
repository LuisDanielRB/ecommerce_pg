import React from "react";
import Navbar from "./UI/Navbar";
import Stats from "./UI/Stats";
import Footer from "./UI/Footer";
import GridCards from "./UI/GridCards";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./UI/Carousel";
import { useEffect } from "react";
import { getAllEvents } from "../store/actions";
import CallToAction from "./UI/CallToAction";

function Home() {
  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  return (
    <>
      <Navbar />
      <Carousel />
      <CallToAction />
      <Stats />
      <GridCards eventos={eventos} />
      <Footer />
    </>
  );
}

export default Home;
