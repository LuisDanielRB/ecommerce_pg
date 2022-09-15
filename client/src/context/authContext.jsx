import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const authContext = createContext();



export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

async function registerAuth(body) {
  try {
    return await axios.post("http://localhost:3000/register", body);
  } catch (error) {
    console.log("Error register: " + error.message);
  }
}

async function loginAuth(body) {
  console.log(body);
  try {
    return await axios.post("http://localhost:3000/login", body);
  } catch (error) {
    console.log("Error login: " + error.message);
  }
}

async function getAllEvents(body) {
  try {
    const data = await axios.get("https://dummyjson.com/products", body)
    const datos = data.data.products
    const datosCategories = datos.map((el) => el.category)
    const categories = datosCategories.filter((item, index) => {
      return datosCategories.indexOf(item) === index
    })

    const obj = {
      categories,
      datos
    }
    return obj

  } catch (error) {
    console.log("Error login: " + error.message);
  }
}

async function createEvent(body) {
  try {
    const data = await axios.post("http://localhost:3000/createEvent", body);
    return data.data
  } catch (error) {
    console.log("Error createEvent: " + error.message);
  }
}


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //aplicamos la logica del carrito
  const [cart, setCart] = useState([]);

  const addProduct = (item, stock) => {
    let product = {...item, stock};
    setCart([...cart, product ]);
  }

  //limpiamos el carrito
  const clearCart = () => setCart([]);
  //agregamos productos por su id al carrito
  const isInCart = (id) => cart.find(product => product.id === id) ? true : false;
  //sacamos productos por su id al carrito
  const removeProduct = (id) => setCart(cart.filter(product => product.id !== id));


  const register = (body) => registerAuth(body);

  const login = async (body) => {
    const login = await loginAuth(body);
    console.log(login);
    if (login.status === 200) {
      setUser(login);
      return login.status;
    } else {
      return login.status;
    }
  };

  const allEvents = (body) => getAllEvents(body)

  const create = (body) => createEvent(body)

  return (
    <authContext.Provider
      value={{
        register,
        login,
        user,
        loading,
        getAllEvents,
        allEvents,
        create,
        isInCart,
        clearCart,
        removeProduct,
        addProduct,
        cart, 
        setCart
      }}
    >
      {children}
    </authContext.Provider>
  );
}
