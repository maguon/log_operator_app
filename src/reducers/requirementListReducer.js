import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        listLoadComplete: false,
        requirementList: []
    },
    getRequirementList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getRequirementListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.requirementListTypes.GET_RequirementList_SUCCESS]: (state, action) => {
        const { payload: { data: { size, requirementList } } } = action
        let listLoadComplete
        if (requirementList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }
        return {
            ...state,
            data: {
                ...state.data,
                listLoadComplete,
                requirementList
            },
            getRequirementList: {
                ...state.getRequirementList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementList_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRequirementList: {
                ...state.getRequirementList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementList_WAITING]: (state, action) => {
        return {
            ...state,
            getRequirementList: {
                ...state.getRequirementList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementList_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRequirementList: {
                ...state.getRequirementList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementList_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRequirementList: {
                ...state.getRequirementList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },

    [actionTypes.requirementListTypes.GET_RequirementListMore_SUCCESS]: (state, action) => {
        const { payload: { data: { size, requirementList } } } = action
        let listLoadComplete
        if (requirementList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }
        return {
            ...state,
            data: {
                ...state.data,
                listLoadComplete,
                requirementList: [...state.data.requirementList, ...requirementList]
            },
            getRequirementListMore: {
                ...state.getRequirementListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementListMore_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRequirementListMore: {
                ...state.getRequirementListMore,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementListMore_WAITING]: (state, action) => {
        return {
            ...state,
            getRequirementListMore: {
                ...state.getRequirementListMore,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementListMore_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRequirementListMore: {
                ...state.getRequirementListMore,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementListMore_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRequirementListMore: {
                ...state.getRequirementListMore,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)
