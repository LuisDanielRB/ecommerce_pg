import React from "react";
import Navbar from "./UI/Navbar";
import Stats from "./UI/Stats";
import Footer from "./UI/Footer";
import GridCards from "./UI/GridCards";
import { useSelector } from "react-redux";
import Slider from "./UI/Slider";

function Home() {
  const eventos = useSelector((state) => state.events);

  // TODO: cambiar los datos a mandar a un objeto
  const sp1 = "Consigue los mejores boletos,";
  const sp2 = "a los mejores precios!";
  const p =
    "Compra tus entradas para los mejores conciertos, eventos deportivos, obras de teatros, festivales y mucho más.";
  const a = "Explorar Eventos";
  const cta = "/events";
  return (
    <>
      <Navbar />
      <Slider />
      <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          <span className="block">{sp1}</span>
          <span className="block">{sp2}</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-black-200">{p}</p>
        <a
          href={cta}
          className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gray px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 sm:w-auto"
        >
          {a}
        </a>
      </div>
      <Stats />
      <GridCards eventos={eventos} />
      <Footer />
    </>
  );
}

export default Home;