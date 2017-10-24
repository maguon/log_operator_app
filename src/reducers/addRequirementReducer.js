import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    addRequirement: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.addRequirementTypes.ADD_Requirement_SUCCESS]: (state, action) => {
        return {
            ...state,
            addRequirement: {
                ...state.addRequirement,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addRequirementTypes.ADD_Requirement_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addRequirement: {
                ...state.addRequirement,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.addRequirementTypes.ADD_Requirement_WAITING]: (state, action) => {
        return {
            ...state,
            addRequirement: {
                ...state.addRequirement,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addRequirementTypes.ADD_Requirement_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addRequirement: {
                ...state.addRequirement,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.addRequirementTypes.ADD_Requirement_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addRequirement: {
                ...state.addRequirement,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },
    [actionTypes.addRequirementTypes.RESET_ADD_Requirement]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addRequirement: { ...initialState.addRequirement }
        }
    }
}, initialState)
