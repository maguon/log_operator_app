import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCommandList = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl(param.OptionalParam)}`
    
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.commandListTypes.GET_CommandList_SUCCESS, payload: { data: { size: param.OptionalParam.size, commandList: res.result } } })
        } else {
            dispatch({ type: actionTypes.commandListTypes.GET_CommandList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.commandListTypes.GET_CommandList_ERROR, payload: { data: err } })
    }
}

export const getCommandListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.commandListTypes.GET_CommandList_WAITING, payload: {} })
}


export const getCommandListMore = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.commandListTypes.GET_CommandListMore_SUCCESS, payload: { data: { size: param.OptionalParam.size, commandList: res.result } } })
        } else {
            dispatch({ type: actionTypes.commandListTypes.GET_CommandListMore_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.commandListTypes.GET_CommandListMore_ERROR, payload: { data: err } })
    }
}

export const getCommandListMoreWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.commandListTypes.GET_CommandListMore_WAITING, payload: {} })
}
