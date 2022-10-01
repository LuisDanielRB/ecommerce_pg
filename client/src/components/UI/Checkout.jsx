import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCart } from "../../store/actions";

export default function Checkout() {

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    const querystring = window.location.search;
    const query = querystring.slice(1).split("&");
    const status = query[1].split("=")[1]
    console.log(status)
    return status
  };

  const checkout = () => {
    dispatch(checkoutCart(user.id , user.token))
    const querystring = window.location.search
    console.log(querystring)
}

  return (
    <div>
      {}
      <h1>
        APRETA EN EL BOTON DE CHECKOUT PORQUE SINO NO TE VA A LLEGAR NADA BRO
      </h1>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}