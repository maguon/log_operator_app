import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getRequirementInfoCommandList = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl(param.OptionalParam)}`
    try {
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.requirementInfoTypes.GET_RequirementInfoCommandList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.requirementInfoTypes.GET_RequirementInfoCommandList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.requirementInfoTypes.GET_RequirementInfoCommandList_ERROR, payload: { data: err } })
    }
}

export const getRequirementInfoCommandListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.requirementInfoTypes.GET_RequirementInfoCommandList_WAITING, payload: {} })
}