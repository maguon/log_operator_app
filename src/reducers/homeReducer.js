import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        carriedCount: {},
        taskList: [],
        listLoadComplete: false
    },
    getHomeData:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTaskListMore:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.homeTypes.GET_HomeData_SUCCESS]: (state, action) => {
        const { payload: { data: { carriedCount, taskList, size } } } = action
        let listLoadComplete
        if (taskList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }

        return {
            ...state,
            data:{
                carriedCount,
                taskList,
                listLoadComplete
            },
            getHomeData: {
                ...state.getHomeData,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.homeTypes.GET_HomeData_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getHomeData: {
                ...state.getHomeData,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.homeTypes.GET_HomeData_WAITING]: (state, action) => {
        return {
            ...state,
            getHomeData: {
                ...state.getHomeData,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.homeTypes.GET_HomeData_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getHomeData: {
                ...state.getHomeData,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.homeTypes.GET_HomeData_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getHomeData: {
                ...state.getHomeData,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },



    [actionTypes.homeTypes.GET_HomeTaskListMore_SUCCESS]: (state, action) => {
        const { payload: { data: { size, taskList } } } = action
        let listLoadComplete
        if (taskList.length == size) {
            listLoadComplete = false
        } else {
            listLoadComplete = true
        }
        return {
            ...state,
            data: {
                ...state.data,
                listLoadComplete,
                taskList: [...state.data.taskList, ...taskList]
            },
            getTaskListMore: {
                ...state.getTaskListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.homeTypes.GET_HomeTaskListMore_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTaskListMore: {
                ...state.getTaskListMore,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.homeTypes.GET_HomeTaskListMore_WAITING]: (state, action) => {
        console.log('GET_HomeTaskListMore_WAITING')
        return {
            ...state,
            getTaskListMore: {
                ...state.getTaskListMore,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.homeTypes.GET_HomeTaskListMore_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTaskListMore: {
                ...state.getTaskListMore,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.homeTypes.GET_HomeTaskListMore_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTaskListMore: {
                ...state.getTaskListMore,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)