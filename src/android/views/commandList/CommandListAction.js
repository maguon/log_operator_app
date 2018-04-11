import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { getFormValues } from 'redux-form'
import { sleep } from '../../../util/util'

const pageSize = 50

export const getCommandList = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl({
            loadDateStart: param.loadDateStart,
            loadDateEnd: param.loadDateEnd,
            routeStartId: param.routeStart.id,
            routeEndId: param.routeEnd.id,
            baseAddrId: param.baseAddr.id,
            receiveId: param.receive.id,
            dpRouteTaskId: param.dpRouteTaskId,
            vin: param.car.id ? param.car.value : null,
            driveId: param.driver.id,
            truckId: param.truck.id,
            fieldOpId: uid,
            start: 0,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                ToastAndroid.showWithGravity('数据已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.commandListTypes.GET_CommandList_SUCCESS, payload: { commandList: res.result, isComplete: true } })
            } else {
                dispatch({ type: actionTypes.commandListTypes.GET_CommandList_SUCCESS, payload: { commandList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: actionTypes.commandListTypes.GET_CommandList_FAILED, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.commandListTypes.GET_CommandList_ERROR, payload: { errorMsg: err } })
    }
}

export const getCommandListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.commandListTypes.GET_CommandList_WAITING, payload: {} })
}

export const getCommandListMore = (param) => async (dispatch, getState) => {
    const state = getState()
    const { commandListReducer: { data: { commandList, isComplete } }, commandListReducer,
        loginReducer: { data: { user: { uid } } } } = getState()
    const queryWorkFormValues = getFormValues('queryWorkForm')(state)
    if (commandListReducer.getCommandListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCommandListMore())
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.commandListTypes.GET_CommandListMore_WAITING, payload: {} })
            try {
                const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl({
                    loadDateStart: queryWorkFormValues.loadDateStart,
                    loadDateEnd: queryWorkFormValues.loadDateEnd,
                    routeStartId: queryWorkFormValues.routeStart.id,
                    routeEndId: queryWorkFormValues.routeEnd.id,
                    baseAddrId: queryWorkFormValues.baseAddr.id,
                    receiveId: queryWorkFormValues.receive.id,
                    dpRouteTaskId: queryWorkFormValues.dpRouteTaskId,
                    vin: queryWorkFormValues.car.id ? queryWorkFormValues.car.value : null,
                    driveId: queryWorkFormValues.driver.id,
                    truckId: queryWorkFormValues.truck.id,
                    fieldOpId: uid,
                    start: commandList.length,
                    size: pageSize
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: actionTypes.commandListTypes.GET_CommandListMore_SUCCESS,
                        payload: {
                            commandList: res.result,
                            isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                        }
                    })
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        ToastAndroid.showWithGravity('数据已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    }
                } else {
                    dispatch({ type: actionTypes.commandListTypes.GET_CommandListMore_FAILED, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.commandListTypes.GET_CommandListMore_ERROR, payload: { errorMsg: err } })
            }
        }

    }
}
