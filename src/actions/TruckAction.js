import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTruckList = (param) => async (dispatch) => {
    const url = `${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckTypes.GET_TruckList_SUCCESS, payload: { data: { size: param.OptionalParam.size, truckList: res.result } } })
        } else {
            dispatch({ type: actionTypes.truckTypes.GET_TruckList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckTypes.GET_TruckList_ERROR, payload: { data: err } })
    }
}

export const getTruckListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.truckTypes.GET_TruckList_WAITING, payload: {} })
}

export const getTruckListMore = (param) => async (dispatch) => {
    const url = `${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckTypes.GET_TruckListMore_SUCCESS, payload: { data: { size: param.OptionalParam.size, truckList: res.result } } })
        } else {
            dispatch({ type: actionTypes.truckTypes.GET_TruckListMore_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckTypes.GET_TruckListMore_ERROR, payload: { data: err } })
    }
}

export const getTruckListMoreWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.truckTypes.GET_TruckListMore_WAITING, payload: {} })
}
