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
    numberCart: 0,
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
            carts.push(product)
            return {
                ...state,
                cart: carts,
                numberCart: state.numberCart + 1,
            }

        // case 'DELETE_CART':

        // case 'INCREASE_QUANTITY':

        // case 'DECREASE_QUANTITY':

        default: return state
    }
}
export default rootReducer;