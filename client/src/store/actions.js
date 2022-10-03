import { async } from "@firebase/util";
import axios from "axios";

export const checkStates = () => (dispatch) => {
  return dispatch({
    type: "CHECK_STATUS",
  });
};

export const getEventDetail = (id) => async (dispatch) => {
  try {
    let eventsDB = await axios.get(`/eventsDB/${id}`);
    return dispatch({
      type: "GET_EVENT_DETAIL",
      payload: eventsDB.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = () => async (dispatch) => {
  function concat(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray = newArray.concat(array[i]);
    }
    let uniqueCategories = [...new Set(newArray)];
    return uniqueCategories;
  }

  try {
    let getAllEvents = await axios.get("/events");
    let datos = getAllEvents.data;

    let categories = datos.map((el) => el.category);
    let uniqueCAtegories = concat(categories);

    let artist = datos.map((el) => el.artist);
    let uniqueArtist = concat(artist);

    let place = datos.map((el) => el.place);
    let uniquePlace = concat(place);

    let newObj = {
      datos,
      uniqueCAtegories,
      uniqueArtist,
      uniquePlace,
    };
    return dispatch({
      type: "GET_ALL_EVENTS",
      payload: newObj,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = (body) => async (dispatch) => {
  try {
    const data = await axios.post("/createEvent", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export function searchLive(payload) {
  return {
    type: "SEARCH_LIVE",
    payload,
  };
}

///////////////////////USER_ACTIONS///////////////////////////////////

export const loginAuth = (body) => async (dispatch) => {
  try {
    let login = await axios.post("/login", body);
    return dispatch({
      type: "POST_LOGIN",
      payload: login.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerAuth = (body) => async (dispatch) => {
  try {
    let registro = await axios.post("/register", body);
    return dispatch({
      type: "POST_REGISTRO",
      payload: registro,
    });
  } catch (error) {
    console.log(error);
  }
};

export function userSignOut(datos) {
  return {
    type: "LOG_OUT",
    payload: datos,
  };
}

export function addGoogleUser(currentUser) {
  return async function (dispatch) {
    try {
      if (currentUser !== null && currentUser.hasOwnProperty("email")) {
        var addToDb = await axios.post("/user/google", {
          username: currentUser.displayName,
          email: currentUser.email,
          profile_picture: currentUser.photoURL,
          password: currentUser.uid,
        });
        return dispatch({
          type: "LOGIN_GOOGLE",
          payload: addToDb.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanDetail() {
  return function (dispatch) {
    return dispatch({
      type: "CLEAN_DETAIL",
    });
  };
}

export function userAddFavorite(userId, idEvent) {
  return async function () {
    return await axios.put("/favorites", {
      idUser: userId,
      idEvent: idEvent,
    });
  };
}

export function userDeleteFavorite(userId, idEvent) {
  return async function () {
    return await axios.delete("/favorites", {
      data: {
        idUser: userId,
        idEvent: idEvent,
      },
    });
  };
}

export function userGetFavorite(userId) {
  return async function (dispatch) {
    let favorites = await axios.get(`/favorites/${userId}`);
    return dispatch({ type: "USER_GET_FAVORITES", payload: favorites.data });
  };
}

///////////////////////////CART///////////////////////////////////

export function addToCart(id, idUser) {
  return async function (dispatch) {
    try {
      const adding = axios.post(`/addcart`, {
        idUser: idUser,
        eventId: id,
      });
      const result = await adding;
      dispatch({
        type: "ADD_CART",
        payload: result.data.events,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function addToCartGuest(id) {
  return async function (dispatch) {
    dispatch({
      type: "ADD_CART_GUEST",
      payload: id,
    });
  };
}

export function delCartUser(id) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: "DEL_CART_USER",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function delCart(id) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: "DEL_CART_GUEST",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function delAllCart() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: "DEL_ALL_CART",
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getCart(userId) {
  return async function (dispatch) {
    let cart = await axios.get(`/cart?userId=${userId}`);
    return dispatch({ type: "GET_CART", payload: cart.data });
  };
}

export function removeOneEventFromCart(eventId, userId) {
  return async function (dispatch) {
    let deleteEvent = await axios.put(
      `/deleteeventcart?eventId=${eventId}&userId=${userId}`
    ); //double query
    console.log("delete", deleteEvent); //quiero q me traiga libro a eliminar
    return dispatch({
      type: "REMOVE_EVENT_CART_DB",
      payload: deleteEvent,
    });
  };
}

export function clearCart(userId) {
  return async function (dispatch) {
    let clearAll = await axios.put(`/clearcart?userId=${userId}`);
    return dispatch({
      type: "CLEAR_CART",
    });
  };
}

export const getCartUser = (cart) => (dispatch) => {
  return dispatch({
    type: "CART_STATE_USER",
    payload: cart,
  });
};

export function checkoutCart(userId, token) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return async function (dispatch) {
    let checkoutCartId = await axios.put("/checkout", { userId }, config);
    return dispatch({
      type: "CHECKOUT_CART",
      payload: checkoutCartId.data,
    });
  };
}

export const cartStateSet = (cartState) => (dispatch) => {
  return dispatch({
    type: "CART_STATE",
    payload: cartState,
  });
};

export function sendEmailPassword(payload) {
  return async function () {
    let sending = await axios.put("/password", payload);
  };
}

export function updatePassword(payload) {
  console.log(payload);
  let { id, password } = payload;
  return async function () {
    let update = await axios.put(`resetpassword/${id}`, payload);
  };
}


export const deleteEventById = (id) => async (dispatch) => {
  const deleteEvent = await axios.delete(`/events/${id}`);
  return dispatch({
    type: "DELETE_EVENT_BY_ID",
    payload: deleteEvent.data,
  });
};

export const getEventsById = (id) => async (dispatch) => {
  try {
    const eventsById = await axios.get(`/dashboard/events/${id}`);
    return dispatch({
      type: "GET_EVENTS_BY_ID",
      payload: eventsById.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

