import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        carVinList: []
    },
    getCarVinList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.carVinTypes.GET_CarVinList_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                carVinList: data
            },
            getCarVinList: {
                ...state.getCarVinList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carVinTypes.GET_CarVinList__FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarVinList: {
                ...state.getCarVinList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.carVinTypes.GET_CarVinList__WAITING]: (state, action) => {
        return {
            ...state,
            getCarVinList: {
                ...state.getCarVinList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carVinTypes.GET_CarVinList__ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarVinList: {
                ...state.getCarVinList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.carVinTypes.GET_CarVinList__SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarVinList: {
                ...state.getCarVinList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },
    [actionTypes.carVinTypes.CLEAN_CarVinList]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...initialState
        }
    }
}, initialState)
