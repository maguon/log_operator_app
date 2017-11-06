import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const addCar = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.addCarTypes.ADD_Car_WAITING, payload: {} })
    const url = `${base_host}/user/${param.requiredParam.userId}/car`
    try {
        let res = await httpRequest.post(url,param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.addCarTypes.ADD_Car_SUCCESS, payload: { data: res.id } })
        } else {
            dispatch({ type: actionTypes.addCarTypes.ADD_Car_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addCarTypes.ADD_Car_ERROR, payload: { data: err } })
    }
}


export const resetAddCar = () => (dispatch) => {
    dispatch({ type: actionTypes.addCarTypes.RESET_ADD_Car, payload: {} })
}