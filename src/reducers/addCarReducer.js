import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data:{
        carId:0
    },
    addCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [actionTypes.addCarTypes.ADD_Car_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                carId: data
            },
            addCar: {
                ...state.addCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addCarTypes.ADD_Car_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.addCarTypes.ADD_Car_WAITING]: (state, action) => {
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addCarTypes.ADD_Car_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.addCarTypes.ADD_Car_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },
    [actionTypes.addCarTypes.RESET_ADD_Car]: (state, action) => {
        return {
            ...state,
            addCar: { ...initialState.addCar }
        }
    }
}, initialState)