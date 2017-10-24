import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getRequirementList = (param) => async (dispatch) => {
    const url = `${base_host}/dpDemand?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.requirementListTypes.GET_RequirementList_SUCCESS, payload: { data: { size: param.OptionalParam.size, requirementList: res.result } } })
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


export const getRequirementListMore = (param) => async (dispatch) => {
    const url = `${base_host}/dpDemand?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.requirementListTypes.GET_RequirementListMore_SUCCESS, payload: { data: { size: param.OptionalParam.size, requirementList: res.result } } })
        } else {
            dispatch({ type: actionTypes.requirementListTypes.GET_RequirementListMore_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.requirementListTypes.GET_RequirementListMore_ERROR, payload: { data: err } })
    }
}

export const getRequirementListMoreWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.requirementListTypes.GET_RequirementListMore_WAITING, payload: {} })
}
