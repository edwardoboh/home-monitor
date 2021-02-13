import {ADD_DEVICE, GET_DEVICES, DELETE_DEVICE, GET_DISTANCE} from './actionTypes'
import axios from 'axios'

export const getDevices = () => dispatch => {
    
    // http request to backend to get all hospitals
    console.log("Before Axios Device get request")
    axios.get("/device").then(devices => {
        console.log("deviceActions: ", devices)
        dispatch({
            type: GET_DEVICES,
            payload : devices.data.data
        })
    }).catch(e => console.log("Axios unable to get all Devices"))
}

export const getDistance = () => {
    // http request to backend to get distance to all hospitals
    return {
        type: GET_DISTANCE,
        payload: {}
    }
}

export const addDevice = (data) => {
    // http request to backend to add a single hospital
    return {
        type: ADD_DEVICE,
        payload: data
    }
}

export const deleteDevice = (id) => {
    // http request to delete a single `iten from the database
    return {
        type: DELETE_DEVICE,
        payload: id
    }
}