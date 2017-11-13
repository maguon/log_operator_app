import httpRequest from '../util/HttpRequest'
import { base_host,record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarInfo = (param) => async (dispatch) => {
    const urls = [`${base_host}/car?${ObjectToUrl(param.OptionalParam)}`,
    `${record_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/record`]
    try {
        let res = await Promise.all(urls.map(url => httpRequest.get(url)))
        console.log('res', res)
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.carInfoTypes.GET_CarInfo_SUCCESS,
                payload: {
                    data: {
                        carInfo: res[0].result[0],
                        imageList: res[1].result[0].storage_image
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.carInfoTypes.GET_CarInfo_FAILED, payload: { data: `${res[0].msg}&&${res[1].msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoTypes.GET_CarInfo_ERROR, payload: { data: err } })
    }
}

export const getCarInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.GET_CarInfo_WAITING, payload: {} })
}