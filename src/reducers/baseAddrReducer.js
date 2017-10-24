import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        baseAddrList: []
    },
    getBaseAddrList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.baseAddrTypes.GET_BaseAddrs_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                baseAddrList: data
            },
            getBaseAddrList: {
                ...state.getBaseAddrList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.baseAddrTypes.GET_BaseAddrs_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getBaseAddrList: {
                ...state.getBaseAddrList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.baseAddrTypes.GET_BaseAddrs_WAITING]: (state, action) => {
        return {
            ...state,
            getBaseAddrList: {
                ...state.getBaseAddrList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.baseAddrTypes.GET_BaseAddrs_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getBaseAddrList: {
                ...state.getBaseAddrList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.baseAddrTypes.GET_BaseAddrs_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getBaseAddrList: {
                ...state.getBaseAddrList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)
