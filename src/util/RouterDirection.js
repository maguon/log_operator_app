import { Actions } from 'react-native-router-flux'

export const selectCity = (parent) => {
    if (parent === 'workBlock') return Actions.cityAtWorkBlock
    if (parent === 'requirementBlock') return Actions.cityAtRequirementBlock
}

export const selectEntrust = (parent) => {
    if (parent === 'workBlock') return Actions.entrustAtWorkBlock
    if (parent === 'requirementBlock') return Actions.entrustAtRequirementBlock
}

export const selectReceive = (parent) => {
    if (parent === 'workBlock') return Actions.receiveAtWorkBlock
    if (parent === 'requirementBlock') return Actions.receiveAtRequirementBlock
}
