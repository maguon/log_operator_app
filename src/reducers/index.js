import { combineReducers } from 'redux'
import homeReducer from './homeReducer'
import cityReducer from './cityReducer'
import entrustReducer from './entrustReducer'
import receiveReducer from './receiveReducer'

export default combineReducers({
    homeReducer,
    cityReducer,
    entrustReducer,
    receiveReducer
})