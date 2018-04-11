import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
const initialState = {
    data: {
        isComplete: false,
        commandList: []
    },
    getCommandList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getCommandListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.commandListTypes.GET_CommandList_SUCCESS]: (state, action) => {
        const { payload: { commandList, isComplete } } = action
        return {
            ...state,
            data: {
                commandList,
                isComplete
            },
            getCommandList: {
                ...initialState.getCommandList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandList_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCommandList: {
                ...initialState.getCommandList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandList_WAITING]: (state, action) => {
        return {
            ...state,
            getCommandList: {
                ...initialState.getCommandList,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandList_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCommandList: {
                ...initialState.getCommandList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.commandListTypes.GET_CommandListMore_SUCCESS]: (state, action) => {
        const { payload: { commandList, isComplete } } = action
        return {
            ...state,
            data: {
                commandList: [...state.data.commandList, ...commandList],
                isComplete
            },
            getCommandListMore: {
                ...initialState.getCommandListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandListMore_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCommandListMore: {
                ...initialState.getCommandListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandListMore_WAITING]: (state, action) => {
        return {
            ...state,
            getCommandListMore: {
                ...initialState.getCommandListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandListMore_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCommandListMore: {
                ...initialState.getCommandListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
