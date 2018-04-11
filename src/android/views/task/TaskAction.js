import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getDriverCommandList = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            param.getDriverCommandList.OptionalParam.driveId = getDriverRes.result[0].drive_id
            const urls = [`${base_host}/dpRouteTask?${ObjectToUrl(param.getDriverCommandList.OptionalParam)}`,
            `${base_host}/drive?driveId=${getDriverRes.result[0].drive_id}`]
            const res = await Promise.all(urls.map(url => httpRequest.get(url)))
            if (res[0].success && res[1].success) {
                dispatch({
                    type: actionTypes.taskTypes.GET_DriverCommandList_Success,
                    payload: {
                        commandList: res[0].result,
                        driverInfo: res[1].result[0]
                    }
                })
            } else {
                dispatch({ type: actionTypes.taskTypes.GET_DriverCommandList_Failed, payload: { data: `${res[0].msg}&&${res[1].msg}` } })
            }
        } else {
            dispatch({ type: actionTypes.taskTypes.GET_DriverCommandList_Failed, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.taskTypes.GET_DriverCommandList_Error, payload: { data: err } })
    }
}

export const getDriverCommandListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.taskTypes.GET_DriverCommandList_Waiting, payload: {} })
}