import React, { useContext, createContext, useState } from "react";
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
    const data = await axios.get("http://localhost:3000/events", body)
    const datos = data.data 
    const datosCategories = datos.map((el) => el.description)
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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

 


  return (
    <authContext.Provider
      value={{
        register,
        login,
        user,
        loading,
        getAllEvents,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
