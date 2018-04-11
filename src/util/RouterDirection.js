import { Actions } from 'react-native-router-flux'






export const selectEntrust = (parent) => {
    if (parent === 'workBlock') return Actions.entrustAtWorkBlock
    // if (parent === 'requirementBlock') return Actions.entrustAtRequirementBlock
    if (parent === 'homeBlock') return Actions.entrustAtHomeBlock
}

// export const selectCarVin = (parent) => {
//     if (parent === 'workBlock') return Actions.carVinAtWorkBlock
//     if (parent === 'homeBlock') return Actions.carVinAtHomeBlock
// }


export const commandList = (parent) => {
    if (parent === 'workBlock') return Actions.commandListAtWorkBlock
}

export const command = (parent) => {
    if (parent === 'workBlock') return Actions.commandAtWorkBlock
}

export const carInfo = (parent) => {
    if (parent === 'workBlock') return Actions.carInfoAtWorkBlock
    if (parent === 'requirementBlock') return Actions.carInfoAtRequirementBlock
    if (parent === 'homeBlock') return Actions.carInfoAtHomeBlock
}

export const make = (parent) => {
    if (parent === 'workBlock') return Actions.makeAtWorkBlock
    if (parent === 'homeBlock') return Actions.makeAtHomeBlock
}




export const singlePhotoView = (parent) => {
    if (parent === 'homeBlock') return Actions.singlePhotoViewAtHomeBlock
    if (parent === 'workBlock') return Actions.singlePhotoViewAtWorkBlock
    if (parent === 'settingBlock') return Actions.singlePhotoViewAtSettingBlock
}

export const photoViewforCarInfo = (parent) => {
    if (parent === 'homeBlock') return Actions.photoViewforCarInfoAtHomeBlock
    if (parent === 'workBlock') return Actions.photoViewforCarInfoAtWorkBlock
    if (parent === 'requirementBlock') return Actions.photoViewforCarInfoAtRequirementBlock
}




export const selectTruck = (parent) => {
    if (parent === 'workBlock') return Actions.truckAtWorkBlock
}












export const photoViewForApplyDamage = parent => {
    if (parent === 'homeBlock') return Actions.photoViewForApplyDamageAtHomeBlock
    if (parent === 'settingBlock') return Actions.photoViewForApplyDamageAtSettingBlock
}

export const addCar = parent => {
    if (parent === 'homeBlock') return Actions.addCarAtHomeBlock
    if (parent === 'workBlock') return Actions.addCarAtWorkBlock
}

export const addCarImage = parent => {
    if (parent === 'homeBlock') return Actions.addCarImageAtHomeBlock
    if (parent === 'workBlock') return Actions.addCarImageAtWorkBlock
}

export const photoViewForCreateCar = parent => {
    if (parent === 'homeBlock') return Actions.photoViewForCreateCarAtHomeBlock
    if (parent === 'workBlock') return Actions.photoViewForCreateCarAtWorkBlock
}

export const searchCar = parent => {
    if (parent === 'homeBlock') return Actions.searchCarAtHomeBlock
    if (parent === 'workBlock') return Actions.searchCarAtWorkBlock
    if (parent === 'settingBlock') return Actions.searchCarAtSettingBlock
}

export const selectDriver = parent => {
    if (parent === 'workBlock') return Actions.selectDriverAtWorkBlock
    if (parent === 'settingBlock') return Actions.selectDriverAtSettingBlock
}

export const selectCity = parent => {
    if (parent === 'workBlock') return Actions.cityAtWorkBlock
    if (parent === 'requirementBlock') return Actions.cityAtRequirementBlock
    if (parent === 'settingBlock') return Actions.cityAtSettingBlock
    if (parent === 'homeBlock') return Actions.cityAtHomeBlock
}

export const selectReceive = parent => {
    if (parent === 'workBlock') return Actions.receiveAtWorkBlock
    if (parent === 'requirementBlock') return Actions.receiveAtRequirementBlock
    if (parent === 'homeBlock') return Actions.receiveAtHomeBlock
}

export const selectBaseAddr = parent => {
    if (parent === 'workBlock') return Actions.baseAddrAtWorkBlock
    if (parent === 'homeBlock') return Actions.baseAddrAtHomeBlock
    if (parent === 'requirementBlock') return Actions.baseAddrAtRequirementBlock
    if (parent === 'settingBlock') return Actions.baseAddrAtSettingBlock
}

export const addRequirement = parent => {
    if (parent === 'homeBlock') return Actions.addRequirementAtHomeBlock
    if (parent === 'requirementBlock') return Actions.addRequirementAtRequirementBlock
}

export const applyDamage = parent => {
    if (parent === 'homeBlock') return Actions.applyDamageAtHomeBlock
    if (parent === 'settingBlock') return Actions.applyDamageAtSettingBlock
}

export const applyDamageUploadImage = parent => {
    if (parent === 'homeBlock') return Actions.applyDamageUploadImageAtHomeBlock
    if (parent === 'settingBlock') return Actions.applyDamageUploadImageAtSettingBlock
}