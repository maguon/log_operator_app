import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverList = (param) => async (dispatch) => {
    const url = `${base_host}/drive?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.driverTypes.GET_DriverList_SUCCESS, payload: { size: param.OptionalParam.size, driverList: res.result } })
        } else {
            dispatch({ type: actionTypes.driverTypes.GET_DriverList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverTypes.GET_DriverList_ERROR, payload: { data: err } })
    }
}

export const getDriverListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.driverTypes.GET_DriverList_WAITING, payload: {} })
}

export const getDriverListMore = (param) => async (dispatch) => {
    const url = `${base_host}/drive?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.driverTypes.GET_DriverListMore_SUCCESS, payload: { data: { size: param.OptionalParam.size, driverList: res.result } } })
        } else {
            dispatch({ type: actionTypes.driverTypes.GET_DriverListMore_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverTypes.GET_DriverListMore_ERROR, payload: { data: err } })
    }
}

export const getDriverListMoreWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.driverTypes.GET_DriverListMore_WAITING, payload: {} })
}