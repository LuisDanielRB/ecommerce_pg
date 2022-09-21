import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addCart } from '../../store/actions'
import EventCards from "./EventCards";

export default function Cart() {
    const dispatch = useDispatch()
    const {events, cart} = useSelector((state) => state)

    return (
        <div className="">
            <h2>Shopping Cart</h2>
            <h3>Products</h3>
            <article className="box grid-responsive">
                {events.map((el) => {
                    <EventCards 
                    key={el.id}
                    data={el}
                    addCart={() => dispatch(addCart(el.id))}
                    />
                })}
            </article>
        </div>
    )
}