import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        listLoadComplete: false,
        commandList: []
    },
    getCommandList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getCommandListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.commandListTypes.GET_CommandList_SUCCESS]: (state, action) => {
        const { payload: { data: { size, commandList } } } = action
        let listLoadComplete
        if (commandList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }
        return {
            ...state,
            data: {
                ...state.data,
                listLoadComplete,
                commandList
            },
            getCommandList: {
                ...state.getCommandList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandList_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandList: {
                ...state.getCommandList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandList_WAITING]: (state, action) => {
        return {
            ...state,
            getCommandList: {
                ...state.getCommandList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandList_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandList: {
                ...state.getCommandList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandList_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandList: {
                ...state.getCommandList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },

    [actionTypes.commandListTypes.GET_CommandListMore_SUCCESS]: (state, action) => {
        const { payload: { data: { size, commandList } } } = action
        let listLoadComplete
        if (commandList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }
        return {
            ...state,
            data: {
                ...state.data,
                listLoadComplete,
                commandList: [...state.data.commandList, ...commandList]
            },
            getCommandListMore: {
                ...state.getCommandListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandListMore_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandListMore: {
                ...state.getCommandListMore,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandListMore_WAITING]: (state, action) => {
        return {
            ...state,
            getCommandListMore: {
                ...state.getCommandListMore,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandListMore_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandListMore: {
                ...state.getCommandListMore,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.commandListTypes.GET_CommandListMore_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandListMore: {
                ...state.getCommandListMore,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)
