import {GET_HOME, ADD_HOME, DELETE_HOME} from './actionTypes'
import axios from 'axios'

export const getHomes = () => dispatch => {
    axios.get("/home").then(homes => {
        console.log("homeActions: ", homes)
        dispatch({
            type: GET_HOME,
            payload : homes.data.data
        })
    }).catch((e) => console.log("Axios unable to get all homes"))
}

export const addHome = (data) => {
    return {
        type: ADD_HOME,
        payload: data
    }
}

export const deleteHome = (id) => {
    return {
        type: DELETE_HOME,
        payload: id
    }
}