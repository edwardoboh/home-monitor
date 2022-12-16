import {combineReducers} from 'redux'
import deviceReducer from './deviceReducer'
import hospitalReducer from './hospitalReducer'
import homeReducer from './homeReducer'

const reduceCombine = combineReducers({
    homes: homeReducer,
    hospitals: hospitalReducer,
    devices: deviceReducer
})

export default reduceCombine