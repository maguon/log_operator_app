import httpRequest from '../util/HttpRequest'
import { base_host, file_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const addCarImage = (param) => async (dispatch) => {
    try {
        const resArray = await Promise.all(param.map(async (item) => {
            const imageUriRes = await httpRequest.postFile(
                `${file_host}/user/${item.requiredParam.userId}/image?${ObjectToUrl(item.optionalParam)}`,
                item.postFileParam)
            if (imageUriRes.success) {
                const res = await httpRequest.post(
                    `${record_host}/car/${item.requiredParam.carId}/vin/${item.requiredParam.vin}/storageImage`,
                    {
                        ...item.postParam,
                        url: imageUriRes.imageId
                    }

                )
                if (res.success) {
                    return imageUriRes.imageId
                }
                else {
                    return null
                }

            } else {
                return null
            }
        }))
        if (resArray.some((item) => {
            return !item
        })) {
            dispatch({ type: actionTypes.addCarImageTypes.ADD_CarImage_FAILED, payload: { data: '图片上传失败' } })
        } else {
            const successArray = resArray.filter((item) => !!item)
            dispatch({
                type: actionTypes.addCarImageTypes.ADD_CarImage_SUCCESS, payload: {
                    data: {
                        unsuccessNum: param.length - successArray.length,
                        resSuccessArray: successArray
                    }
                }
            })
        }
    }
    catch (err) {
        dispatch({
            type: actionTypes.addCarImageTypes.ADD_CarImage_ERROR,
            payload: { data: '图片上传异常' }
        })
    }
}

export const addCarImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.addCarImageTypes.ADD_CarImage_WAITING, payload: {} })
}

export const resetAddCarImage = () => (dispatch) => {
    dispatch({ type: actionTypes.addCarImageTypes.RESET_ADD_CarImage, payload: {} })
}