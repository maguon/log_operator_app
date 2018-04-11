import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ToastAndroid } from 'react-native'
import { reset } from 'redux-form'

export const addRequirement = (param) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.addRequirementTypes.ADD_Requirement_WAITING, payload: {} })
        const { loginReducer: { data: { user: { uid } } }, settingReducer: { data: { baseAddrId, cityId, cityName } } } = getState()
        const url = `${base_host}/user/${uid}/dpDemand`
        const res = await httpRequest.post(url, {
            receiveId: param.receive.id,
            routeEndId: param.routeEnd.id,
            routeEnd: param.routeEnd.value,
            preCount: param.preCount,
            dateId: param.dateId,
            baseAddrId,
            routeStartId: cityId,
            routeStart: cityName
        })
        if (res.success) {
            ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.addRequirementTypes.ADD_Requirement_SUCCESS, payload: { data: res.result } })
            dispatch(reset('createRequirementForm'))
        } else {
            dispatch({ type: actionTypes.addRequirementTypes.ADD_Requirement_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addRequirementTypes.ADD_Requirement_ERROR, payload: { data: err } })
    }
}