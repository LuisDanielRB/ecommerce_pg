const initialState = {
    userLogin: [],
    userRegister: [],
    events : [],
    eventsDetail: {},
    eventsDB: [],
    isAuthenticated: localStorage.getItem('jwt'),
    categories: [],
    artists: [],
    places: [],
    searchLive: []

}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'POST_LOGIN':
            return {
                ...state,
                isAuthenticated: localStorage.setItem('jwt', JSON.stringify(action.payload.data.token)),
                userLogin: action.payload
            }

        case 'POST_REGISTRO':
            return {
                ...state,
                userRegister: [...action.payload],
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

    default: return state
    }
}
export default rootReducer;