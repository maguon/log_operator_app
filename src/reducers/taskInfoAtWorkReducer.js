import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        routeLoadTaskDetail: []
    },
    getRouteLoadTaskDetail: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.taskInfoAtWorkTypes.GET_RouteLoadTaskDetail_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeLoadTaskDetail: data
            },
            getRouteLoadTaskDetail: {
                ...state.getRouteLoadTaskDetail,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.taskInfoAtWorkTypes.GET_RouteLoadTaskDetail_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRouteLoadTaskDetail: {
                ...state.getRouteLoadTaskDetail,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.taskInfoAtWorkTypes.GET_RouteLoadTaskDetail_WAITING]: (state, action) => {
        return {
            ...state,
            getRouteLoadTaskDetail: {
                ...state.getRouteLoadTaskDetail,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.taskInfoAtWorkTypes.GET_RouteLoadTaskDetail_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRouteLoadTaskDetail: {
                ...state.getRouteLoadTaskDetail,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.taskInfoAtWorkTypes.GET_RouteLoadTaskDetail_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRouteLoadTaskDetail: {
                ...state.getRouteLoadTaskDetail,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)