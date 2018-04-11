import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        commandList: [],
        driverInfo: {}
    },
    getDriverCommandList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.taskTypes.GET_DriverCommandList_Success]: (state, action) => {
        const { payload: { commandList, driverInfo } } = action
        return {
            ...state,
            data: {
                commandList,
                driverInfo
            },
            getDriverCommandList: {
                ...state.getDriverCommandList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.taskTypes.GET_DriverCommandList_Failed]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverCommandList: {
                ...state.getDriverCommandList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.taskTypes.GET_DriverCommandList_ServiceError]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverCommandList: {
                ...state.getDriverCommandList,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [actionTypes.taskTypes.GET_DriverCommandList_Error]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverCommandList: {
                ...state.getDriverCommandList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.taskTypes.GET_DriverCommandList_Waiting]: (state, action) => {
        return {
            ...initialState,
            getDriverCommandList: {
                ...initialState.getDriverCommandList,
                isResultStatus: 1
            }
        }
    }
}, initialState)