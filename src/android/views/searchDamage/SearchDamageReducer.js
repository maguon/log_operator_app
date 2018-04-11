import { handleActions } from 'redux-actions'
import * as searchDamageTypes from './SearchDamageTypes'

const initialState = {
    data: {
        searchDamageForm: {}
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(searchDamageTypes.set_SearchDamageForm)]: (state, action) => {
        const { payload: { searchDamageForm } } = action
        return {
            data: {
                searchDamageForm
            }
        }
    },
    [(searchDamageTypes.clean_SearchDamageForm)]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)