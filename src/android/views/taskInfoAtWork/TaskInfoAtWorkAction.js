import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getRouteLoadTaskDetail = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteLoadTask/${param.requiredParam.routeLoadTaskId}/dpRouteLoadTaskDetail`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.taskInfoAtWorkTypes.GET_RouteLoadTaskDetail_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.taskInfoAtWorkTypes.GET_RouteLoadTaskDetail_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.taskInfoAtWorkTypes.GET_RouteLoadTaskDetail_ERROR, payload: { data: err } })
    }
}

export const getRouteLoadTaskDetailWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.taskInfoAtWorkTypes.GET_RouteLoadTaskDetail_WAITING, payload: {} })
}