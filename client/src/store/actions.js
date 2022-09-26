import axios from "axios";

export const cartStateSet = (cartState) => (dispatch) => {
  return dispatch({
    type: "CART_STATE",
    payload: cartState,
  });
};

export const checkStates = () => (dispatch) => {
  return dispatch({
    type: "CHECK_STATUS",
  });
};

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
    const data = await axios.post("/createEvent", body ,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
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

export function userSignOut() {
  return { type: "LOG_OUT" };
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
    })
  }
}

export function addCart(id) {
  return function (dispatch) {
    return dispatch({
      type: "ADD_TO_CART",
      payload: id,
    })
  }
}

export function DeleteCart(id) {
  return {
    type: "DELETE_CART",
    payload: id,
  }
}

export function decreaseQuantity(id) {
  return {
    type: "DECREASE_QUANTITY",
    payload: id
  }
}

