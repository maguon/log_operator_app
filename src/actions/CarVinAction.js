import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarVinList = (param) => async (dispatch) => {
    const url = `${base_host}/carList?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.carVinTypes.GET_CarVinList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.carVinTypes.GET_CarVinList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.carVinTypes.GET_CarVinList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carVinTypes.GET_CarVinList_ERROR, payload: { data: err } })
    }
}

export const cleanCarVin = () => (dispatch) => {
    dispatch({ type: actionTypes.carVinTypes.CLEAN_CarVinList, payload: {} })
}