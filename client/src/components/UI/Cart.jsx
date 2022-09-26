import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from "../../store/actions";
import EventCards from "./EventCards";

export default function Cart() {
    const dispatch = useDispatch()
    const { events, cart } = useSelector((state) => state)


    return (
        <div className="">
            <h2>Shopping Cart</h2>
            <h3>Carrito:</h3>
            {events.map((e, id) => {
                return (
                    <span>
                        <EventCards key={id} data={e} addCart={() => dispatch(addCart(e.id))} />
                    </span>
                )
            })}
        </div >
    )
}