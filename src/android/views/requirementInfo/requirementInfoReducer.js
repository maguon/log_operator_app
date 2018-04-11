import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        commandList: []
    },
    getRequirementInfoCommandList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.requirementInfoTypes.GET_RequirementInfoCommandList_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                commandList: data
            },
            getRequirementInfoCommandList: {
                ...state.getRequirementInfoCommandList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.requirementInfoTypes.GET_RequirementInfoCommandList_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRequirementInfoCommandList: {
                ...state.getRequirementInfoCommandList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.requirementInfoTypes.GET_RequirementInfoCommandList_WAITING]: (state, action) => {
        return {
            ...state,
            getRequirementInfoCommandList: {
                ...state.getRequirementInfoCommandList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.requirementInfoTypes.GET_RequirementInfoCommandList_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRequirementInfoCommandList: {
                ...state.getRequirementInfoCommandList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.requirementInfoTypes.GET_RequirementInfoCommandList_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRequirementInfoCommandList: {
                ...state.getRequirementInfoCommandList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)