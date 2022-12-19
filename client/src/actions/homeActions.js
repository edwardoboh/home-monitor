import {GET_HOME, ADD_HOME, DELETE_HOME} from './actionTypes'
import axios from 'axios'

export const getHomes = () => dispatch => {
    axios.get("/home").then(homes => {
        dispatch({
            type: GET_HOME,
            payload : homes.data.data
        })
    }).catch((e) => console.log("Axios unable to get all homes"))
}

export const addHome = (data) => {
    axios.post("/home/add", data).then(resp => {
        console.log("Home added successfully")
    })
    .catch((error) => {
        console.log("An error occured while adding home")
    })
    return {
        type: ADD_HOME,
        payload: data
    }
}

export const deleteHome = (id) => {
    axios.delete(`/home/delete/${id}`).then(() => console.log("Home Deleted Successfully")).catch((error) => console.log("Error deleting Home"));
    return {
        type: DELETE_HOME,
        payload: id
    }
}