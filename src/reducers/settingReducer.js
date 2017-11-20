import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

//isResultStatus(执行结果状态):[0(未执行),2(成功)，3(错误)，4(执行失败)]
const initialState = {
    data: {
        baseAddrId: 0,
        baseAddr: '请选择当前位置'
    }
}

export default handleActions({
    [actionTypes.settingTypes.LOAD_BaseAddr]: (state, action) => {
        const { payload: { data } } = action
       
        return {
            data
        }
    },
    [actionTypes.settingTypes.SAVE_BaseAddr]: (state, action) => {
        const { payload: { data } } = action
        console.log(data)
        return {
            data
        }
    }
}, initialState)
