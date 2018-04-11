import { handleActions } from 'redux-actions'
import * as applyDamageUploadImageActionTypes from './ApplyDamageUploadImageActionTypes'

const initialState = {
    data: {
        index: 0,
        imageList: []
    },
    uploadDamageImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    delDamageImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(部分成功)]
export default handleActions({
    [applyDamageUploadImageActionTypes.upload_DamageImage_success]: (state, action) => {
        const { payload: { imageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: [...state.data.imageList, ...imageList]
            },
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 2
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_DamageImage_partSuccess]: (state, action) => {
        const { payload: { imageList, failedMsg } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: [...state.data.imageList, ...imageList]
            },
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_DamageImage_waiting]: (state, action) => {
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 1
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_DamageImage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_DamageImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [applyDamageUploadImageActionTypes.del_imageForApplyDamage_success]: (state, action) => {
        return {
            ...state,
            delDamageImage: {
                ...initialState.delDamageImage,
                isResultStatus: 2
            }
        }
    },
    [applyDamageUploadImageActionTypes.del_imageForApplyDamage_waiting]: (state, action) => {
        return {
            ...state,
            delDamageImage: {
                ...initialState.delDamageImage,
                isResultStatus: 1
            }
        }
    },
    [applyDamageUploadImageActionTypes.del_imageForApplyDamage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            delDamageImage: {
                ...initialState.delDamageImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [applyDamageUploadImageActionTypes.del_imageForApplyDamage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            delDamageImage: {
                ...initialState.delDamageImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [applyDamageUploadImageActionTypes.set_indexForApplyDamage]: (state, action) => {
        const { payload: { index } } = action
        return {
            ...state,
            data: {
                ...state.data,
                index
            }
        }
    },

    [applyDamageUploadImageActionTypes.clean_upload_DamageImage]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)