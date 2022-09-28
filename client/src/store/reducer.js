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
  cart: [],
  summary: 0,
  purchasedCart: [],
  //favorites
  allFavourites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "POST_LOGIN":
      persisLocalStorage('user' , action.payload)
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

      case "USER_GET_FAVORITES":
        let favoriteEvents = [];
        let eventId = action.payload;
  
        favoriteEvents = state.eventsCopy.filter((e) =>
          eventId.includes(e.id)
        );
        console.log(favoriteEvents)
        persisLocalStorage('favorites' , favoriteEvents)
        return {
          ...state,
          allFavourites: favoriteEvents
        };

      ////////////CART///////////////////////
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

		case "DEL_CART":
			let itemToDelete = state.cart.find((p) => p.id === action.payload);
			let substr = itemToDelete.price;
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
			var arrayNuevo = arrayEvents.map((b) => b.price);
			var suma = 0;
			for (let i = 0; i < arrayNuevo.length; i++) {
				suma += arrayNuevo[i];
			}
  
			var events = JSON.parse(localStorage.getItem('cart'));
			let nuevo = arrayEvents.concat(events);
			console.log(nuevo, 'events');

			return {
				...state,
				cart: arrayEvents, // TODOS LOS EVENTOS DEL CARRITO EN LA DB
				summary: suma, //ACA ESTA EL TOTAL DEL CARRITO DEL USUARIO
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

    default: return state
  };
};

export default rootReducer;

