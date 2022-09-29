import { persisLocalStorage, removeLocalStorage } from '../utils/index'


const initialState = {
  // eventos
  events: [],
  eventsCopy: [],
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
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  summary: localStorage.getItem('summary') ? JSON.parse(localStorage.getItem('summary')) : 0, purchasedCart: [],
  //favorites
  allFavourites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : null,
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
        eventsCopy: action.payload.datos,
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
      localStorage.clear()
      return {
        ...state,
        user: action.payload
      };

    case "CHECK_STATUS": {
      return {
        ...state,
      };
    }

    case 'CLEAN_DETAIL':
      return {
        ...state,
        eventsDetail: {},
      }

    case "USER_GET_FAVORITES":
      let favoriteEvents = [];
      let eventId = action.payload;

      favoriteEvents = state.eventsCopy.filter((e) =>
        eventId.includes(e.id)
      );
      persisLocalStorage('favorites', favoriteEvents)
      return {
        ...state,
        allFavourites: favoriteEvents
      };

    ////////////CART///////////////////////
    case 'ADD_CART_GUEST':
      localStorage.setItem('cart', JSON.stringify([...state.cart, action.payload]))
      const eventosDelLocal = JSON.parse(localStorage.getItem('cart'))
      const price = eventosDelLocal.map((e) => e.price).reduce((acc, e) => acc + e, 0)
      localStorage.setItem('summary', JSON.stringify(price))
      return {
        ...state,
        cart: [...state.cart, action.payload],
        summary: price
      };

    case "ADD_CART":
      let exist = state.cart.filter((el) => el.id === action.payload);
      if (exist.length === 1) return state;
      let newItem = state.eventsCopy.find((p) => p.id == action.payload);
      let sum = newItem.price;
      return {
        ...state,
        cart: [...state.cart, { ...newItem }],
        summary: state.summary + sum,
      };

    case "DEL_CART_GUEST":
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
      const idx = cartFromLocalStorage.indexOf((idx) => idx === action.payload);
      cartFromLocalStorage.splice(idx, 1)
      let stringify = JSON.stringify(cartFromLocalStorage)
      localStorage.setItem('cart', stringify)
      let total = cartFromLocalStorage.map(e => e.price).reduce((acc, item) => acc + item, 0)
      localStorage.setItem('summary', JSON.stringify(total))
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload),
        summary: total
      };

    case "DEL_CART_USER":
      let itemToDelet = state.cart.find((p) => p.id === action.payload);
      let substr = itemToDelet.price;
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload),
        summary: state.summary - substr,
      };

    case "DEL_ALL_CART":
      return {
        ...state,
        cart: [],
        summary: 0,
      };

    case "GET_CART": {
      var arrayEvents = action.payload.events;
      localStorage.setItem('cart', JSON.stringify(arrayEvents));
      return {
        ...state,
        cart: arrayEvents, // TODOS LOS EVENTOS DEL CARRITO EN LA DB
        summary: action.payload.totalPrice, //ACA ESTA EL TOTAL DEL CARRITO DEL USUARIO
      };
    }

    case "CHECKOUT_CART": {
      return {
        ...state,
        purchasedCart: {
          Events: state.cart,
          Total: state.summary,
          CartId: action.payload,
        },
        summary: 0,
        cart: [],
      };
    }

    case "EMPTY_PURCHASED_CART": {
      return {
        ...state,
        purchasedCart: { Events: [], Total: 0, CartId: '' },
      };
    }

    case "REMOVE_EVENT_CART_DB": {
      return {
        ...state,
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
        summary: 0,
      };
    }

    case "CART_STATE": {
      return {
        ...state,
        cartState: action.payload,
      };
    }

    default: return state
  };
};

export default rootReducer;

