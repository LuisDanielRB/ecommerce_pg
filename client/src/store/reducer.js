const initialState = {
    userLogin: JSON.parse(localStorage.getItem('user')),
    userRegister: [],
    events: [],
    eventsDetail: {},
    eventsDB: [],
    isAuthenticated: JSON.parse(localStorage.getItem('jwt')),
    categories: [],
    artists: [],
    places: [],
    searchLive: [],
    cart: [],
}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'POST_LOGIN':
            localStorage.setItem('jwt', JSON.stringify(action.payload.data.token))
            localStorage.setItem('user', JSON.stringify(action.payload.data))
            return {
                ...state,
                isAuthenticated: true,
            }

        case 'POST_REGISTRO':
            return {
                ...state,
                userRegister: action.payload
            }

        case 'GET_EVENT_DETAIL':
            return {
                ...state,
                eventsDetail: action.payload
            }

        case 'GET_ALL_EVENTS':
            return {
                ...state,
                events: action.payload.datos,
                categories: action.payload.uniqueCAtegories,
                artists: action.payload.uniqueArtist,
                places: action.payload.uniquePlace
            }
        case 'POST_EVENT':
            return {
                ...state,
                eventsDB: action.payload
            }

        case 'SEARCH_LIVE':
            return {
                ...state,
                searchLive: action.payload
            }

        case 'CLEAN_DETAIL':
            return {
                ...state,
                eventsDetail: {},
            }

        case 'ADD_TO_CART':
            let id = action.payload;
            let items = state.events;
            let product = items.filter((el) => el.id === id)
            let carts = state.cart
            if (items.map((el) => el.id === id)) {
                return
            } else {
                carts.push(product)
                return
                {                    
                        ...state,
                        cart: carts
                }
            }

        case 'REMOVE_ALL_CART':
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload),
            };

        case 'REMOVE_ONE_CART':
            let itemToDelete = state.cart.filter((item) => item.id === action.payload);

            return itemToDelete.quantity > 1
                ? {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                }
                : {
                    ...state,
                    cart: state.cart.filter((item) => item.id !== action.payload),
                };

        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            }


        default: return state
    }
}
export default rootReducer;