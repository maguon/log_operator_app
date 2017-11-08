import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCommandList = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.commandTypes.GET_HomeCommandList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.commandTypes.GET_HomeCommandList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.commandTypes.GET_HomeCommandList_ERROR, payload: { data: err } })
    }
}

export const getCommandListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.commandTypes.GET_HomeCommandList_WAITING, payload: {} })
}

export const cancelCommand = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.commandTypes.CancelCommand_WAITING, payload: { data: { id: param.requiredParam.dpRouteLoadTaskId } } })
    const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/loadTaskStatus/${param.requiredParam.loadTaskStatus}`
    try {
        let res = await httpRequest.put(url, param.putParam)
        if (res.success) {
            dispatch({ type: actionTypes.commandTypes.CancelCommand_SUCCESS, payload: { data: { id: param.requiredParam.dpRouteLoadTaskId } } })
        } else {
            dispatch({
                type: actionTypes.commandTypes.CancelCommand_FAILED,
                payload: {
                    data: {
                        id: param.requiredParam.dpRouteLoadTaskId,
                        failedMsg: res.msg
                    }
                }
            })
        }
    } catch (err) {
        dispatch({
            type: actionTypes.commandTypes.CancelCommand_ERROR, payload: {
                data: {
                    id: param.requiredParam.dpRouteLoadTaskId,
                    errorMsg: err
                }
            }
        })
    }
}

export const removeCancelCommand = (param) => (dispatch) => {
    dispatch({ type: actionTypes.commandTypes.REMOVE_CancelCommand, payload: { data: { id: param } } })
}
