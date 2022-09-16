import axios from 'axios';


export const loginAuth = body => async (dispatch) => {
    try {
        let login = await axios.post("http://localhost:3000/login", body)
        return dispatch({
            type: 'POST_LOGIN',
            payload: login
        })
    } catch (error) {
        console.log(error)
    }
}

export const registerAuth = body => async (dispatch) => {
        try {
            let registro = await axios.post('http://localhost:3000/register"', body)
            return dispatch({
                type: 'POST_REGISTRO',
                payload: registro
            })
        } catch (error) {
            console.log(error)
        }
}

export const getEventDetail = (id) => async (dispatch) => {
    try {
        let eventsDB = await axios.get(`http://localhost:3000/eventsDB/${id}`)
        console.log(eventsDB)
        return dispatch({
            type: 'GET_EVENT_DETAIL',
            payload: eventsDB.data
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const getAllEvents = () => async dispatch => {
    try {
        let getAllEvents = await axios.get('http://localhost:3000/events')
        return dispatch({
            type: 'GET_ALL_EVENTS',
            payload: getAllEvents.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const createEvent = (body) => async dispatch => {
    try {
        const data = await axios.post("http://localhost:3000/createEvent", body);
        return dispatch({
            type: 'POST_EVENT',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

