import React from "react";
import { useSelector} from 'react-redux';

export default function Cart() {

   const cart = useSelector((state) => state.cart)

    return (
        <div className="">
            <h2>Shopping Cart</h2>
            <h3>Carrito:</h3>
            {cart.map((el, key) => {
                console.log(el.artist)
                return (
                    <tr key={key}>
                        <td>{el.artist}</td>
                        <td><img src={el.image} /></td>
                        <td>{el.price} $</td>
                    </tr>
                )
            })}
        </div>
    )
}