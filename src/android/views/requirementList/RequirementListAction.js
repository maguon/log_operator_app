import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { sleep } from '../../../util/util'
import { getFormValues } from 'redux-form'

const pageSize = 50

export const getRequirementList = (param) => async (dispatch) => {
    try {
        const url = `${base_host}/dpDemand?${ObjectToUrl({
            createdOnStart: param.createdOnStart,
            createdOnEnd: param.createdOnEnd,
            dateIdStart: param.dateIdStart,
            dateIdEnd: param.dateIdEnd,
            demandStatus: param.demandStatus.id != '3' ? param.demandStatus.id : null,
            routeStartId: param.routeStart.id,
            routeEndId: param.routeEnd.id,
            baseAddrId: param.baseAddr.id,
            receiveId: param.receive.id,
            start: 0,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                ToastAndroid.showWithGravity('数据已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.requirementListTypes.GET_RequirementList_SUCCESS, payload: { requirementList: res.result, isComplete: true } })
            } else {
                dispatch({ type: actionTypes.requirementListTypes.GET_RequirementList_SUCCESS, payload: { requirementList: res.result, isComplete: false } })
            }

        } else {
            dispatch({ type: actionTypes.requirementListTypes.GET_RequirementList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.requirementListTypes.GET_RequirementList_ERROR, payload: { data: err } })
    }
}

export const getRequirementListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.requirementListTypes.GET_RequirementList_WAITING, payload: {} })
}


export const getRequirementListMore = (param) => async (dispatch, getState) => {
    const state = getState()
    const { requirementListReducer: { data: { requirementList, isComplete } }, requirementListReducer } = getState()
    const queryRequirementFormValues = getFormValues('queryRequirementForm')(state)
    if (requirementListReducer.getRequirementListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getRequirementListMore())
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.requirementListTypes.GET_RequirementListMore_WAITING, payload: {} })
            try {
                const url = `${base_host}/dpDemand?${ObjectToUrl({
                    createdOnStart: queryRequirementFormValues.createdOnStart,
                    createdOnEnd: queryRequirementFormValues.createdOnStart,
                    dateIdStart: queryRequirementFormValues.dateIdStart,
                    dateIdEnd: queryRequirementFormValues.dateIdEnd,
                    demandStatus: queryRequirementFormValues.demandStatus.id != '3' ? queryRequirementFormValues.demandStatus.id : null,
                    routeStartId: queryRequirementFormValues.routeStart.id,
                    routeEndId: queryRequirementFormValues.routeEnd.id,
                    baseAddrId: queryRequirementFormValues.baseAddr.id,
                    receiveId: queryRequirementFormValues.receive.id,
                    start: requirementList.length,
                    size: pageSize

                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: actionTypes.requirementListTypes.GET_RequirementListMore_SUCCESS,
                        payload: {
                            requirementList: res.result,
                            isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                        }
                    })
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        ToastAndroid.showWithGravity('数据已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    }
                } else {
                    dispatch({ type: actionTypes.requirementListTypes.GET_RequirementListMore_FAILED, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.requirementListTypes.GET_RequirementListMore_ERROR, payload: { errorMsg: err } })
            }
        }

    }
}

