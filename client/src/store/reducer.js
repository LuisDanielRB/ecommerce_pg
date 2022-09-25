let tokenFromLocalStorage = localStorage.getItem("token");
if (!tokenFromLocalStorage) {
  tokenFromLocalStorage = null;
}
let userIdFromLocalStorage = localStorage.getItem("userId");
if (!userIdFromLocalStorage) {
  userIdFromLocalStorage = null;
}
let userProfileImageFromLocalStorage = localStorage.getItem("userProfilePicture");
if (!userProfileImageFromLocalStorage) {
  userProfileImageFromLocalStorage = null;
}

let userRoleFromLocalStorage = localStorage.getItem("userRole");
if (!userRoleFromLocalStorage) {
  userRoleFromLocalStorage = null;
}

let userNameFromLocalStorage = localStorage.getItem("userName");
if (!userNameFromLocalStorage) {
  userNameFromLocalStorage = null;
}

let userEmailFromLocalStorage = localStorage.getItem("userEmail");
if (!userEmailFromLocalStorage) {
  userEmailFromLocalStorage = null;
}
let isValidFromLocalStorage = localStorage.getItem("isValid");
if (!isValidFromLocalStorage) {
  isValidFromLocalStorage = false;
}

const initialState = {
  // eventos
  events: [],
  // existen?
  eventsDetail: {},
  eventsDB: [],
  // eventos con filtrado
  categories: [],
  artists: [],
  places: [],
  // --------------------
  searchLive: [],
  token: tokenFromLocalStorage,
  userId: userIdFromLocalStorage,
  userName: userNameFromLocalStorage,
  userEmail: userEmailFromLocalStorage,
  userProfilePicture: userProfileImageFromLocalStorage,
  userRole: userRoleFromLocalStorage,
  isValid: isValidFromLocalStorage,
  eventsUsers: [],
  // estados del carrito
  cartState: false,
  cart: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "POST_LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("userName", action.payload.username);
      localStorage.setItem("userEmail", action.payload.email);
      localStorage.setItem("userProfilePicture", action.payload.profile_picture);
      localStorage.setItem("userRole", action.payload.status);
      localStorage.setItem("isValid", true);
      return {
        ...state,
        token: action.payload.token,
        userRole: action.payload.status,
        userId: action.payload.id,
        userName: action.payload.username,
        userEmail: action.payload.email,
        userProfilePicture: action.payload.profile_picture,
        isValid: true,
      };

    case "POST_REGISTRO":
      return {
        ...state,
        userRegister: action.payload,
      };

    case "GET_EVENT_DETAIL":
      return {
        ...state,
        eventsDetail: action.payload,
      };

    case "GET_ALL_EVENTS":
      return {
        ...state,
        events: action.payload.datos,
        categories: action.payload.uniqueCAtegories,
        artists: action.payload.uniqueArtist,
        places: action.payload.uniquePlace,
      };

    case "GET_ALL_EVENTS_CREATE": {
      return {
        ...state,
        eventsUsers: action.payload,
      };
    }

    case "POST_EVENT":
      return {
        ...state,
        eventsDB: action.payload,
      };

    case "SEARCH_LIVE":
      return {
        ...state,
        searchLive: action.payload,
      };

    case "LOG_OUT":
      localStorage.removeItem("isValid");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("token");
      localStorage.removeItem("isValid");
      localStorage.removeItem("userProfilePicture")
      localStorage.removeItem("userName");
      return {
        ...state,
        token: null,
        isValid: false,
        userId: null,
        userRole: null,
        userEmail: null,
        userProfilePicture: null,
        userName: null,
      };

    case "LOGIN_GOOGLE":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("userName", action.payload.username);
      localStorage.setItem("userEmail", action.payload.email);
      localStorage.setItem("userProfileImage", action.payload.profile_picture);
      localStorage.setItem("userRole", action.payload.status);
      localStorage.setItem("isValid", true);
      return {
        ...state,
        token: action.payload.token,
        userRole: action.payload.status,
        userId: action.payload.id,
        userName: action.payload.username,
        userEmail: action.payload.email,
        userProfilePicture: action.payload.profile_picture,
        isValid: true,
      };

    case "CHECK_STATUS": {
      return {
        ...state,
      };
    }

    case "CART_STATE": {
      return {
        ...state,
        cartState: action.payload,
      };
    }
    case 'CLEAN_DETAIL':
      return {
        ...state,
        eventsDetail: {},
      }

    case "ADD_TO_CART":
      console.log(action.payload)
      if (state.cart.length === 0) {
        console.log("ya estoy aqui")
        let item = {
          id: action.payload.id,
          quantity: 1,
          name: action.payload.description,
          price: action.payload.price,
          image: action.payload.image,
        }
        state.cart.push(item);
      } else {
        let check = false;
        state.cart.map((item, key) => {
          if (item.id === action.payload.id) {
            state.cart[key].quantity++;
            check = true;
          }
        });
        if (!check) {
          let items2 = {
            id: action.payload.id,
            quantity: 1,
            name: action.payload.description,
            price: action.payload.price,
            image: action.payload.image,
          }
          state.cart.push(items2);
        }
      }
      return {
        ...state,
      }

    case 'DELETE_CART':
      let deletes = state.cart.filter((item) => item.id != action.payload);
      console.log(deletes)
      return {
        ...state,
        cart: deletes,
      }

    case 'DECREASE_QUANTITY':
      if (state.cart.quantity > 1) {
        var dltOne = state.cart.quantity -= 1
      }
      return {
        ...state,
        cart: dltOne,
      }


    default: return state
  };
};

export default rootReducer;