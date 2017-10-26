import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        listLoadComplete: false,
        truckList: []
    },
    getTruckList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTruckListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.truckTypes.GET_TruckList_SUCCESS]: (state, action) => {
        const { payload: { data: { size, truckList } } } = action
        let listLoadComplete
        if (truckList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }
        return {
            ...state,
            data: {
                ...state.data,
                listLoadComplete,
                truckList
            },
            getTruckList: {
                ...state.getTruckList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckList_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckList: {
                ...state.getTruckList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckList_WAITING]: (state, action) => {
        return {
            ...state,
            getTruckList: {
                ...state.getTruckList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckList_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckList: {
                ...state.getTruckList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckList_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckList: {
                ...state.getTruckList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },



    [actionTypes.truckTypes.GET_TruckListMore_SUCCESS]: (state, action) => {
        const { payload: { data: { size, truckList } } } = action
        let listLoadComplete
        if (truckList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }
        return {
            ...state,
            data: {
                ...state.data,
                listLoadComplete,
                truckList: [...state.data.truckList, ...truckList]
            },
            getTruckListMore: {
                ...state.getTruckListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckListMore_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckListMore: {
                ...state.getTruckListMore,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckListMore_WAITING]: (state, action) => {
        return {
            ...state,
            getTruckListMore: {
                ...state.getTruckListMore,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckListMore_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckListMore: {
                ...state.getTruckListMore,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckListMore_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckListMore: {
                ...state.getTruckListMore,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)
