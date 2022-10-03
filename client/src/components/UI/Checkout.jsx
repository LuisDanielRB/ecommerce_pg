import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCart } from "../../store/actions";

export default function Checkout() {
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state)

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    const querystring = window.location.search;
    const query = querystring.slice(1).split("&");
    const status = query[1].split("=")[1]
    if(status === 'approved') {
      dispatch(checkoutCart(user.id , user.token))
      setTimeout(() => {
        window.close()
      }, 1000)
    } 
    
    return status
  };

  return (
    <div>
    <h1>GRACIAS POR TU COMPRA</h1>
    </div>
  );
}
