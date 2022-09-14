import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        description: "",
        price: "",
        date: "",
        artist: "",
        place: "",
        stock: "",
        category: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await register(input);
        setInput({
            description: "",
            price: "",
            date: "",
            artist: "",
            place: "",
            stock: "",
            category: "",
        });
        navigate("/");
    }
    return (
        <>
        
        </>
    )

};

export default CreateEvent;