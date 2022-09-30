import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutCart } from '../../store/actions'

export default function Checkout() {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state);

    const checkout = () => {
        dispatch(checkoutCart(user.id , user.token))
    }


  return (
    <div>
        <h1>APRETA EN EL BOTON DE CHECKOUT PORQUE SINO NO TE VA A LLEGAR NADA BRO</h1>
        <button onClick={checkout}>Checkout</button>
    </div>
  )
}
