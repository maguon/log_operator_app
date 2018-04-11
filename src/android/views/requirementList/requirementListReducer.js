import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
const initialState = {
    data: {
        isComplete: false,
        requirementList: []
    },
    getRequirementList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getRequirementListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.requirementListTypes.GET_RequirementList_SUCCESS]: (state, action) => {
        const { payload: { requirementList, isComplete } } = action
        return {
            ...state,
            data: {
                requirementList,
                isComplete
            },
            getRequirementList: {
                ...initialState.getRequirementList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementList_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRequirementList: {
                ...initialState.getRequirementList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementList_WAITING]: (state, action) => {
        return {
            ...state,
            getRequirementList: {
                ...initialState.getRequirementList,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementList_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRequirementList: {
                ...initialState.getRequirementList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.requirementListTypes.GET_RequirementListMore_SUCCESS]: (state, action) => {
        const { payload: { requirementList, isComplete } } = action
        return {
            ...state,
            data: {
                requirementList: [...state.data.requirementList, ...requirementList],
                isComplete
            },
            getRequirementListMore: {
                ...initialState.getRequirementListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementListMore_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRequirementListMore: {
                ...initialState.getRequirementListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementListMore_WAITING]: (state, action) => {
        return {
            ...state,
            getRequirementListMore: {
                ...initialState.getRequirementListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.requirementListTypes.GET_RequirementListMore_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRequirementListMore: {
                ...initialState.getRequirementListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)
