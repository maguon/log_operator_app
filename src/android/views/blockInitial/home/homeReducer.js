import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        carriedCount: {},
        taskList: []
    },
    getHomeData:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.homeTypes.get_HomeData_success]: (state, action) => {
        const { payload: { carriedCount, taskList  } } = action
        return {
            ...state,
            data:{
                carriedCount,
                taskList
            },
            getHomeData: {
                ...state.getHomeData,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.homeTypes.get_HomeData_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getHomeData: {
                ...state.getHomeData,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.homeTypes.get_HomeData_waiting]: (state, action) => {
        return {
            ...state,
            getHomeData: {
                ...state.getHomeData,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.homeTypes.get_HomeData_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getHomeData: {
                ...state.getHomeData,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    }
}, initialState)