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
import makeReducer from './makeReducer'
import addCarReducer from './addCarReducer'
import addCarImageReducer from './addCarImageReducer'
import commandReducer from './commandReducer'
import carsReducer from './carsReducer'
import userReducer from './userReducer'
import initializationReducer from './initializationReducer'
import passwordReducer from './passwordReducer'
import taskReducer from './taskReducer'
import requirementInfoReducer from './requirementInfoReducer'

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
    carInfoReducer,
    makeReducer,
    addCarReducer,
    addCarImageReducer,
    commandReducer,
    carsReducer,
    userReducer,
    initializationReducer,
    passwordReducer,
    taskReducer,
    requirementInfoReducer
})