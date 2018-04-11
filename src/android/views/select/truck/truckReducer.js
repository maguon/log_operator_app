import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        truckList: []
    },
    getTruckList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.truckTypes.GET_TruckList_SUCCESS]: (state, action) => {
        const { payload: { truckList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckList
            },
            getTruckList: {
                ...initialState.getTruckList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckList_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckList: {
                ...initialState.getTruckList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckList_WAITING]: (state, action) => {
        return {
            ...state,
            getTruckList: {
                ...initialState.getTruckList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.truckTypes.GET_TruckList_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckList: {
                ...initialState.getTruckList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    }
}, initialState)
