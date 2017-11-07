import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getHomeData = (param) => async (dispatch) => {
    const urls = [`${base_host}/dpRouteLoadTaskCount?${ObjectToUrl(param.getCarriedCount.OptionalParam)}`,
    `${base_host}/dpRouteTask?${ObjectToUrl(param.getTaskList.OptionalParam)}`]
    try {
        let res = await Promise.all(urls.map(url => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.homeTypes.GET_HomeData_SUCCESS, payload: {
                    data: {
                        carriedCount: res[0].result[0],
                        taskList: res[1].result,
                        size: param.getTaskList.OptionalParam.size
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_HomeData_FAILED, payload: { data: `${res[0].msg}&&${res[1].msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.GET_HomeData_ERROR, payload: { data: err } })
    }
}

export const getHomeDataWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.GET_HomeData_WAITING, payload: {} })
}

export const getTaskListMore = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteTask?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.homeTypes.GET_HomeTaskListMore_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.homeTypes.GET_HomeTaskListMore_SUCCESS, payload: { data: { size: param.OptionalParam.size, taskList: res.result } } })
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_HomeTaskListMore_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.GET_HomeTaskListMore_ERROR, payload: { data: err } })
    }
}
