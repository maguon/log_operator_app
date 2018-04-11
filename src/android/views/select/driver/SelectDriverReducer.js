import { handleActions } from 'redux-actions'
import * as selectDriverTypes from './SelectDriverTypes'

const initialState = {
    data: {
        driverList: []
    },
    getSelectDriverList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [selectDriverTypes.get_DriverListForSelect_sucess]: (state, action) => {
        const { payload: { driverList } } = action
        return {
            ...state,
            data: {
                driverList
            },
            getSelectDriverList: {
                ...initialState.getSelectDriverList,
                isResultStatus: 2
            }
        }
    },
    [selectDriverTypes.get_DriverListForSelect_waiting]: (state, action) => {
        return {
            ...state,
            getSelectDriverList: {
                ...initialState.getSelectDriverList,
                isResultStatus: 1,
            }
        }
    },
    [selectDriverTypes.get_DriverListForSelect_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getSelectDriverList: {
                ...initialState.getSelectDriverList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [selectDriverTypes.get_DriverListForSelect_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getSelectDriverList: {
                ...initialState.getSelectDriverList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)