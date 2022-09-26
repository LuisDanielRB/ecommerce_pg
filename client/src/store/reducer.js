import { persisLocalStorage, removeLocalStorage } from '../utils/index'

const initialState = {
  // eventos
  events: [],
  // existen?
  eventsDetail: {},
  // eventos con filtrado
  categories: [],
  artists: [],
  places: [],
  // --------------------
  searchLive: [],
  // Datos usuarios
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  // estados del carrito
  cartState: false,
  cart: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "POST_LOGIN":
      persisLocalStorage('user', action.payload)
      return {
        ...state,
        user: action.payload,
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

    case "SEARCH_LIVE":
      return {
        ...state,
        searchLive: action.payload,
      };

    case "LOG_OUT":
      removeLocalStorage(action.payload)
      return {
        ...state,
        user: null
      };

    case "LOGIN_GOOGLE":
      persisLocalStorage('user', action.payload)
      return {
        ...state,
        user: action.payload
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
      if (state.cart.length === 0) {
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
      let item = action.payload;
      console.log(item)
      if (item.quantity > 1) {
        state.cart.map((item, key) => {
          if (item.id === action.payload.id) {
            state.cart[key].quantity--;
          }
        })
        return {
          ...state
        }
      } else {
        let deletes = state.cart.filter((item) => item.id != action.payload);
        return {
          ...state,
          cart: deletes
        }
      }

    default: return state
  };
};

export default rootReducer;
