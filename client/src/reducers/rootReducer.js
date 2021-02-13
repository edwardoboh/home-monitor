import {combineReducers} from 'redux'
import deviceReducer from './deviceReducer'
import hospitalReducer from './hospitalReducer'

const reduceCombine = combineReducers({
    hospitals: hospitalReducer,
    devices: deviceReducer
})

export default reduceCombine