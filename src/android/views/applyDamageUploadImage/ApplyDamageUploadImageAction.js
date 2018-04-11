import * as httpRequest from '../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../config/Host'
import * as applyDamageUploadImageActionTypes from './ApplyDamageUploadImageActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const uploadDamageImage = (params) => async (dispatch, getState) => {
    try {
        const cameraSuccessReses = params.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user } },
                applyDamageSubmitReducer: { data: { damageId, vin } } } = getState()
            const imageUploadUrl = `${file_host}/user/${user.uid}/image?${ObjectToUrl({ imageType: 4 })}`
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {
                const bindDamageUrl = `${record_host}/user/${user.uid}/damage/${damageId}/image`
                const bindDamageReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindDamageUrl, {
                    username: user.real_name,
                    userId: user.uid,
                    userType: user.type,
                    url: item.imageId,
                    vin
                })))
                const bindDamageSuccessReses = bindDamageReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (params.length === bindDamageSuccessReses.length) {
                    ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_success, payload: { imageList: bindDamageSuccessReses } })
                } else if (bindDamageSuccessReses.length > 0) {
                    ToastAndroid.showWithGravity(`部分提交成功：${bindDamageSuccessReses.length}/${params.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_partSuccess, payload: { imageList: bindDamageSuccessReses, failedMsg: '部分失败' } })
                } else {
                    ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交全部失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_error, payload: { errorMsg: err } })
    }
}

export const uploadDamageImageWating = (param) => (dispatch, getState) => {
    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_waiting, payload: {} })
}

// export const delDamageImage = () => async (dispatch, getState) => {
//     try {
//         const { loginReducer: { data: { user: { uid } } },
//         applyDamageSubmitReducer: { data:{}},
//             applyDamageUploadImageReducer: { data: { index, imageList } } } = getState()
//         const url = `${record_host}/user/${uid}record/${uid}/damageImage/${imageList[index]}`
//         console.log('url', url)

//     } catch (err) {

//     }
//     console.log('delDamageImageindex', index)
// }

export const setDamageImageIndex = param => (dispatch) => {
    const { index } = param
    dispatch({ type: applyDamageUploadImageActionTypes.set_indexForApplyDamage, payload: { index } })
}