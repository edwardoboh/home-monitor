import * as deviceData from '../data/deviceData.json'
import {ADD_DEVICE, DELETE_DEVICE, GET_DEVICES, GET_DISTANCE} from '../actions/actionTypes'

const initialState = {
            // devicePositions: deviceData.default.features,
            devicePositions: [],
            // distances: []
        }

const deviceReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DEVICES:
            return {
                ...state,
                devicePositions: action.payload

            }
        case GET_DISTANCE:
            return {
                ...state,
                distances: action.payload

            }
        case ADD_DEVICE:
            return {
                ...state,
                devicePositions: [action.payload, ...state.devicePositions]
            }
        case DELETE_DEVICE:
            return {
                ...state,
                devicePositions: [state.devicePositions.filter(devPos => devPos.id !== action.payload)]
            }
        default:
            return state
    }
}

export default deviceReducer