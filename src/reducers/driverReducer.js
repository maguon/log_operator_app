import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        listLoadComplete: false,
        driverList: []
    },
    getDriverList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getDriverListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.driverTypes.GET_DriverList_SUCCESS]: (state, action) => {
        const { payload: { data: { size, driverList } } } = action
        let listLoadComplete
        if (driverList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }
        return {
            ...state,
            data: {
                ...state.data,
                listLoadComplete,
                driverList
            },
            getDriverList: {
                ...state.getDriverList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.driverTypes.GET_DriverList_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverList: {
                ...state.getDriverList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.driverTypes.GET_DriverList_WAITING]: (state, action) => {
        return {
            ...state,
            getDriverList: {
                ...state.getDriverList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.driverTypes.GET_DriverList_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverList: {
                ...state.getDriverList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.driverTypes.GET_DriverList_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverList: {
                ...state.getDriverList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },


    [actionTypes.driverTypes.GET_DriverListMore_SUCCESS]: (state, action) => {
        const { payload: { data: { size, driverList } } } = action
        let listLoadComplete
        if (driverList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }
        return {
            ...state,
            data: {
                ...state.data,
                listLoadComplete,
                driverList: [...state.data.driverList, ...driverList]
            },
            getDriverListMore: {
                ...state.getDriverListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.driverTypes.GET_DriverListMore_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverListMore: {
                ...state.getDriverListMore,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.driverTypes.GET_DriverListMore_WAITING]: (state, action) => {
        return {
            ...state,
            getDriverListMore: {
                ...state.getDriverListMore,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.driverTypes.GET_DriverListMore_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverListMore: {
                ...state.getDriverListMore,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.driverTypes.GET_DriverListMore_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverListMore: {
                ...state.getDriverListMore,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)
