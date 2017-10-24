import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'

export const addRequirement = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/dpDemand`
    try {
        let res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.addRequirementTypes.ADD_Requirement_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.addRequirementTypes.ADD_Requirement_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addRequirementTypes.ADD_Requirement_ERROR, payload: { data: err } })
    }
}

export const addRequirementWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.addRequirementTypes.ADD_Requirement_WAITING, payload: { data: err } })
}

export const resetAddRequirement = () => (dispatch) => {
    dispatch({ type: actionTypes.addRequirementTypes.RESET_ADD_Requirement, payload: { data: err } })
}