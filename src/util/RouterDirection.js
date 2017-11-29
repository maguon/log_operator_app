import { Actions } from 'react-native-router-flux'

export const selectCity = (parent) => {
    if (parent === 'workBlock') return Actions.cityAtWorkBlock
    if (parent === 'requirementBlock') return Actions.cityAtRequirementBlock
    if (parent === 'settingBlock') return Actions.cityAtSettingBlock
    if (parent === 'homeBlock') return Actions.cityAtHomeBlock
}

export const selectEntrust = (parent) => {
    if (parent === 'workBlock') return Actions.entrustAtWorkBlock
    if (parent === 'requirementBlock') return Actions.entrustAtRequirementBlock
    if (parent === 'homeBlock') return Actions.entrustAtHomeBlock
}

export const selectReceive = (parent) => {
    if (parent === 'workBlock') return Actions.receiveAtWorkBlock
    if (parent === 'requirementBlock') return Actions.receiveAtRequirementBlock
    if (parent === 'homeBlock') return Actions.receiveAtHomeBlock
}

export const selectBaseAddr = (parent) => {
    if (parent === 'workBlock') return Actions.baseAddrAtWorkBlock
    if (parent === 'homeBlock') return Actions.baseAddrAtHomeBlock
    if (parent === 'requirementBlock') return Actions.baseAddrAtRequirementBlock
    if (parent === 'settingBlock') return Actions.baseAddrAtSettingBlock
}

export const selectCarVin = (parent) => {
    if (parent === 'workBlock') return Actions.carVinAtWorkBlock
    if (parent === 'homeBlock') return Actions.carVinAtHomeBlock
}

export const selectTruck = (parent) => {
    if (parent === 'workBlock') return Actions.truckAtWorkBlock
}

export const selectDriver = (parent) => {
    if (parent === 'workBlock') return Actions.driverAtWorkBlock
}

export const commandList = (parent) => {
    if (parent === 'workBlock') return Actions.commandListAtWorkBlock
}

export const command = (parent) => {
    if (parent === 'workBlock') return Actions.commandAtWorkBlock
}

export const carInfo = (parent) => {
    if (parent === 'workBlock') return Actions.carInfoAtWorkBlock
    if (parent === 'homeBlock') return Actions.carInfoAtHomeBlock
}

export const make = (parent) => {
    if (parent === 'workBlock') return Actions.makeAtWorkBlock
    if (parent === 'homeBlock') return Actions.makeAtHomeBlock
}


export const addCar=(parent) => {
    if (parent === 'homeBlock') return Actions.addCarAtHomeBlock
    if (parent === 'workBlock') return Actions.addCarAtWorkBlock
}

export const addCarImage=(parent) => {
    if (parent === 'homeBlock') return Actions.addCarImageAtHomeBlock
    if (parent === 'workBlock') return Actions.addCarImageAtWorkBlock
}

export const addRequirement=(parent) => {
    if (parent === 'homeBlock') return Actions.addRequirementAtHomeBlock
    if (parent === 'requirementBlock') return Actions.addRequirementAtRequirementBlock
    //if (parent === 'homeBlock') return Actions.carInfoAtHomeBlock
}