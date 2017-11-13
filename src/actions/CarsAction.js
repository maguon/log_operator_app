import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'



export const finishCarry = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.Finish_Carry_WAITING, payload: {} })
    const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/loadTaskStatus/${param.requiredParam.loadTaskStatus}`
   // console.log('url', url)
    try {
        let res = await httpRequest.put(url, {})
        //console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.carsTypes.Finish_Carry_SUCCESS, payload: { data: param.requiredParam.loadTaskStatus } })
            dispatch({
                type: actionTypes.commandTypes.CHANGE_TaskStatus,
                payload: {
                    data: {
                        id: param.requiredParam.dpRouteLoadTaskId,
                        load_task_status: param.requiredParam.loadTaskStatus
                    }
                }
            })

            CHANGE_TaskStatus
        } else {
            dispatch({ type: actionTypes.carsTypes.Finish_Carry_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carsTypes.Finish_Carry_ERROR, payload: { data: err } })
    }
}

export const resetFinishCarry = () => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.RESET_Finish_Carry, payload: {} })
}

export const getCommandCarList = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.carsTypes.GET_CommandCarList_SUCCESS, payload: { data: { carList: res.result, taskInfo: param.taskInfo } } })
        } else {
            dispatch({ type: actionTypes.carsTypes.GET_CommandCarList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carsTypes.GET_CommandCarList_ERROR, payload: { data: err } })
    }
}

export const getCommandCarListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.GET_CommandCarList_WAITING, payload: {} })
}


export const pushCarInCommand = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.carsTypes.PUSH_CarInCommand_SUCCESS, payload: { data: { ...param.car, id: res.id } } })
        } else {
            dispatch({ type: actionTypes.carsTypes.PUSH_CarInCommand_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carsTypes.PUSH_CarInCommand_ERROR, payload: { data: err } })
    }
}

export const resetPushCarInCommand = (param) => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.RESET_PUSH_CarInCommand, payload: {} })
}

export const pushCarInCommandWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.PUSH_CarInCommand_WAITING, payload: {} })
}


export const removeCommandCar = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.REMOVE_CommandCar_WAITING, payload: { data: { id: param.requiredParam.dpRouteTaskDetailId } } })
    const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteTaskDetail/${param.requiredParam.dpRouteTaskDetailId}?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.del(url)
        if (res.success) {
            dispatch({ type: actionTypes.carsTypes.REMOVE_CommandCar_SUCCESS, payload: { data: { id: param.requiredParam.dpRouteTaskDetailId } } })
        } else {
            dispatch({ type: actionTypes.carsTypes.REMOVE_CommandCar_FAILED, payload: { data: { id: param.requiredParam.dpRouteTaskDetailId, failedMsg: res.msg } } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carsTypes.REMOVE_CommandCar_ERROR, payload: { data: { id: param.requiredParam.dpRouteTaskDetailId, errorMsg: err } } })
    }
}

export const resetRemoveCommandCar = (param) => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.RESET_REMOVE_CommandCar, payload: { data: { id: param } } })
}