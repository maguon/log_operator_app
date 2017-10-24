import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getBaseAddrList = (param) => async (dispatch) => {
    const url = `${base_host}/baseAddr?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.baseAddrTypes.GET_BaseAddrs_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.baseAddrTypes.GET_BaseAddrs_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.baseAddrTypes.GET_BaseAddrs_ERROR, payload: { data: err } })
    }
}

export const getBaseAddrListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.baseAddrTypes.GET_BaseAddrs_WAITING, payload: {} })
}