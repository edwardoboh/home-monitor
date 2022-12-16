import * as homeData from '../data/hospitalData.json'
import {ADD_HOME, DELETE_HOME, GET_HOME} from '../actions/actionTypes'

const initialState = {
            homePositions: []
        }

const homeReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_HOME:
            return {
                ...state,
                homePositions: action.payload
            }
        case ADD_HOME:
            return {
                ...state,
                homePositions: [action.payload, ...state.homePositions]
            }
        case DELETE_HOME:
            return {
                ...state,
                homePositions: [state.homePositions.filter(hosPos => hosPos.id !== action.payload)]
            }
        default:
            return state
    }
}

export default homeReducer