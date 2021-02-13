import {ADD_HOSPITAL, GET_HOSPITALS, DELETE_HOSPITAL} from './actionTypes'
import axios from 'axios'

export const getHospitals = () => dispatch => {
    // http request to backend to get all hospitals
    axios.get("/hospital").then(hospitals => {
        console.log("hospitalActions: ", hospitals)
        dispatch({
            type: GET_HOSPITALS,
            payload : hospitals.data.data
        })
    }).catch((e) => console.log("Axios unable to get all Hospitals"))
}

export const addHospital = (data) => {
    // http request to backend to add a single hospital
    return {
        type: ADD_HOSPITAL,
        payload: data
    }
}

export const deleteHospital = (id) => {
    // http request to delete a single iten from the database
    return {
        type: DELETE_HOSPITAL,
        payload: id
    }
}