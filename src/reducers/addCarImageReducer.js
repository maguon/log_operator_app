import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'
import {file_host } from '../config/Host'

const initialState = {
    data: {
        imageList: []
    },
    addCarImage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: '',
        unsuccessNum: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误),6(部分成功)]
export default handleActions({
    [actionTypes.addCarImageTypes.ADD_CarImage_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...data.resSuccessArray.map(item => `${file_host}/image/${item}`)]
            },
            addCarImage: {
                ...state.addCarImage,
                isResultStatus: data.unsuccessNum > 0 ? 6 : 2,
                unsuccessNum: data.unsuccessNum
            }
        }
    },
    [actionTypes.addCarImageTypes.ADD_CarImage_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCarImage: {
                ...state.addCarImage,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.addCarImageTypes.ADD_CarImage_WAITING]: (state, action) => {
        return {
            ...state,
            addCarImage: {
                ...state.addCarImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addCarImageTypes.ADD_CarImage_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCarImage: {
                ...state.addCarImage,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.addCarImageTypes.ADD_CarImage_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCarImage: {
                ...state.addCarImage,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },
    [actionTypes.addCarImageTypes.RESET_ADD_CarImage]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCarImage: { ...initialState.addCarImage }
        }
    }
}, initialState)