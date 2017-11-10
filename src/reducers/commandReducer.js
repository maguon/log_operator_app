import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        commandList: []
    },
    getCommandList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.commandTypes.GET_HomeCommandList_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                commandList: data.map(item => {
                    return {
                        data: item,
                        cancelCommand: {
                            isResultStatus: 0,
                            errorMsg: '',
                            failedMsg: '',
                            serviceFailedMsg: ''
                        }
                    }
                })
            },
            getCommandList: {
                ...state.getCommandList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.commandTypes.GET_HomeCommandList_FAILED]: (state, action) => {
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
    [actionTypes.commandTypes.GET_HomeCommandList_WAITING]: (state, action) => {
        return {
            ...state,
            getCommandList: {
                ...state.getCommandList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.commandTypes.GET_HomeCommandList_ERROR]: (state, action) => {
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
    [actionTypes.commandTypes.GET_HomeCommandList_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandList: {
                ...state.getCommandList,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },


    [actionTypes.commandTypes.CancelCommand_SUCCESS]: (state, action) => {
        const { payload: { data: { id } } } = action
        return {
            ...state,
            data: {
                commandList: state.data.commandList.map(item => {
                    if (item.data.id == id) {
                        return {
                            data: item.data,
                            cancelCommand: {
                                ...item.cancelCommand,
                                isResultStatus: 2
                            }
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    },
    [actionTypes.commandTypes.CancelCommand_FAILED]: (state, action) => {
        const { payload: { data: { id, failedMsg } } } = action
        return {
            ...state,
            data: {
                commandList: state.data.commandList.map(item => {
                    if (item.data.id == id) {
                        return {
                            data: item.data,
                            cancelCommand: {
                                ...item.cancelCommand,
                                isResultStatus: 4,
                                failedMsg
                            }
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    },
    [actionTypes.commandTypes.CancelCommand_WAITING]: (state, action) => {
        const { payload: { data: { id } } } = action
        return {
            ...state,
            data: {
                commandList: state.data.commandList.map(item => {
                    if (item.data.id == id) {
                        return {
                            data: item.data,
                            cancelCommand: {
                                ...item.cancelCommand,
                                isResultStatus: 1
                            }
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    },
    [actionTypes.commandTypes.CancelCommand_ERROR]: (state, action) => {
        const { payload: { data: { id, errorMsg } } } = action
        return {
            ...state,
            data: {
                commandList: state.data.commandList.map(item => {
                    if (item.data.id == id) {
                        return {
                            data: item.data,
                            cancelCommand: {
                                ...item.cancelCommand,
                                isResultStatus: 3,
                                errorMsg
                            }
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    },
    [actionTypes.commandTypes.CancelCommand_SERVICEERROR]: (state, action) => {
        const { payload: { data: { id, serviceFailedMsg } } } = action
        return {
            ...state,
            data: {
                commandList: state.data.commandList.map(item => {
                    if (item.data.id == id) {
                        return {
                            data: item.data,
                            cancelCommand: {
                                ...item.cancelCommand,
                                isResultStatus: 3,
                                serviceFailedMsg
                            }
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    },
    [actionTypes.commandTypes.REMOVE_CancelCommand]: (state, action) => {
        const { payload: { data: { id } } } = action
        const newCommandList = state.data.commandList.filter(item => item.data.id != id)
        return {
            ...state,
            data: {
                commandList: newCommandList ? [...newCommandList] : []
            }
        }
    },


    [actionTypes.commandTypes.CHANGE_TaskStatus]: (state, action) => {
        const { payload: { data: { id, load_task_status } } } = action
        return {
            ...state,
            data: {
                ...state.data,
                commandList: [...state.data.commandList.map(item => {
                    if (item.data.id == id) {
                        return {
                            ...item,
                            data:{
                                ...item.data,
                                load_task_status
                            }
                        }
                    } else {
                        return item
                    }
                })]
            }
        }
    }
}, initialState)