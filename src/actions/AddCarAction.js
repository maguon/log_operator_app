import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const addCar = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.GET_CarInfo_WAITING, payload: {} })
    const url = `${base_host}/car?${ObjectToUrl(param.OptionalParam)}`
    try {   
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.carInfoTypes.GET_CarInfo_SUCCESS, payload: { data: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.carInfoTypes.GET_CarInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoTypes.GET_CarInfo_ERROR, payload: { data: err } })
    }
}