import { combineReducers } from 'redux'
import homeReducer from './homeReducer'
import cityReducer from './cityReducer'
import entrustReducer from './entrustReducer'
import receiveReducer from './receiveReducer'
import addRequirementReducer from './addRequirementReducer'
import baseAddrReducer from './baseAddrReducer'
import requirementListReducer from './requirementListReducer'
import settingReducer from './settingReducer'
import driverReducer from './driverReducer'
import truckReducer from './truckReducer'
import carVinReducer from './carVinReducer'
import commandListReducer from './commandListReducer'
import taskInfoAtWorkReducer from './taskInfoAtWorkReducer'
import carInfoReducer from './carInfoReducer'

export default combineReducers({
    homeReducer,
    cityReducer,
    entrustReducer,
    receiveReducer,
    addRequirementReducer,
    baseAddrReducer,
    requirementListReducer,
    settingReducer,
    driverReducer,
    truckReducer,
    carVinReducer,
    commandListReducer,
    taskInfoAtWorkReducer,
    carInfoReducer
})