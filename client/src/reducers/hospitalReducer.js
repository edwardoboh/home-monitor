import * as hospitalData from '../data/hospitalData.json'
import {ADD_HOSPITAL, DELETE_HOSPITAL, GET_HOSPITALS} from '../actions/actionTypes'

const initialState = {
            // hospitalPositions: hospitalData.default.features
            hospitalPositions: []
        }

const hospitalReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_HOSPITALS:
            return {
                ...state,
                hospitalPositions: action.payload
            }
        case ADD_HOSPITAL:
            return {
                ...state,
                hospitalPositions: [action.payload, ...state.hospitalPositions]
            }
        case DELETE_HOSPITAL:
            return {
                ...state,
                hospitalPositions: [state.hospitalPositions.filter(hosPos => hosPos.id !== action.payload)]
            }
        default:
            return state
    }
}

export default hospitalReducer