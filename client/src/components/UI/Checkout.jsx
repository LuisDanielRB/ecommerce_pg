import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCart, gettinCartForMail } from "../../store/actions";

export default function Checkout() {
  const dispatch = useDispatch()
  const {cart, user} = useSelector((state) => state)
 
  const check = () => {
    dispatch(checkoutCart(user.id , user.token))
    dispatch(gettinCartForMail({cart: cart, user: user}))
  } 
 

  return (
    <div>
    <button onClick={check}>
      CLICK AQUI PARA FINALIZAR LA COMPRA
    </button>
    </div>
  );
}
