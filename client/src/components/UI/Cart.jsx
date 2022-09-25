import React from "react";
import { useSelector} from 'react-redux';

export default function Cart({cart}) {

    const {artist, image, price} = cart;

    return (
        <div className="">
            <h2>Shopping Cart</h2>
            <h3>Carrito:</h3>
            <p>{artist}</p>
        </div>
    )
}