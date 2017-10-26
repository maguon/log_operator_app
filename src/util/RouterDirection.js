import { Actions } from 'react-native-router-flux'

export const selectCity = (parent) => {
    if (parent === 'workBlock') return Actions.cityAtWorkBlock
    if (parent === 'requirementBlock') return Actions.cityAtRequirementBlock
    if (parent === 'settingBlock') return Actions.cityAtSettingBlock
}

export const selectEntrust = (parent) => {
    if (parent === 'workBlock') return Actions.entrustAtWorkBlock
    if (parent === 'requirementBlock') return Actions.entrustAtRequirementBlock
}

export const selectReceive = (parent) => {
    if (parent === 'workBlock') return Actions.receiveAtWorkBlock
    if (parent === 'requirementBlock') return Actions.receiveAtRequirementBlock
}

export const selectBaseAddr = (parent) => {
    if (parent === 'workBlock') return Actions.baseAddrAtWorkBlock
    if (parent === 'requirementBlock') return Actions.baseAddrAtRequirementBlock
    if (parent === 'settingBlock') return Actions.baseAddrAtSettingBlock
}
