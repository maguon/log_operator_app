import * as httpRequest from '../../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../../config/Host'
import * as applyDamageSubmitActionTypes from './ApplyDamageSubmitActionTypes'
import * as applyDamageUploadImageTypes from '../../../views/applyDamageUploadImage/ApplyDamageUploadImageActionTypes'
import { ObjectToUrl, objectExceptNull } from '../../../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'
import { ToastAndroid, InteractionManager } from 'react-native'
import * as routerDirection from '../../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import * as demageListAction from '../../../views/demageList/DemageListAction'

export const submit = param => (dispatch, getState) => {
    const { applyDamageSubmitReducer: { data: { status } } } = getState()
    if (status == 0) {
        dispatch(createDamage(param))
    } else if (status == 1) {
        dispatch(modifyDamage(param))
    }
}

export const modifyDamage = param => async (dispatch, getState) => {
    try {
        dispatch({ type: applyDamageSubmitActionTypes.modify_Damage_waiting, payload: {} })
        const { values: { car, driver, damageRemark }, parent } = param
        const { loginReducer: { data: { user: { uid } } }, applyDamageSubmitReducer: { data: { damageId } } } = getState()
        const url = `${base_host}/user/${uid}/damage/${damageId}`
        const res = await httpRequest.put(url, objectExceptNull({
            carId: car ? car.id : null,
            vin: car ? car.vin : null,
            truckId: driver ? driver.item.truck_id : null,
            truckNum: driver ? driver.item.truck_num : null,
            driveId: driver ? driver.id : null,
            driveName: driver ? driver.value : null,
            damageExplain: damageRemark
        }))
        if (res.success) {
            dispatch({ type: applyDamageSubmitActionTypes.modify_Damage_success, payload: {} })
            dispatch(demageListAction.getDemageList())
            ToastAndroid.showWithGravity(`修改成功！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        } else {
            dispatch({ type: applyDamageSubmitActionTypes.modify_Damage_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`修改失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: applyDamageSubmitActionTypes.modify_Damage_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`修改成功！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)

    }
}


export const createDamage = param => async (dispatch, getState) => {
    try {
        dispatch({ type: applyDamageSubmitActionTypes.create_Damage_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const { values: { car, driver, damageRemark }, parent } = param
        const url = `${base_host}/user/${uid}/damage`
        const res = await httpRequest.post(url, objectExceptNull({
            carId: car.id,
            vin: car.value,
            truckId: driver ? driver.item.truck_id : null,
            truckNum: driver ? driver.item.truck_num : null,
            driveId: driver ? driver.id : null,
            driveName: driver ? driver.value : null,
            damageExplain: damageRemark
        }))
        if (res.success) {
            ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: applyDamageSubmitActionTypes.create_Damage_success, payload: { damageId: res.id, vin: car.value } })
            dispatch(demageListAction.getDemageList())
            routerDirection.applyDamageUploadImage(parent)()
        } else {
            ToastAndroid.showWithGravity(`提交失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: applyDamageSubmitActionTypes.create_Damage_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: applyDamageSubmitActionTypes.create_Damage_error, payload: { errorMsg: err } })
    }
}


export const resetCreateDamage = param => (dispatch) => {
    dispatch({ type: applyDamageSubmitActionTypes.reset_create_Damage, payload: {} })
    dispatch({ type: applyDamageUploadImageTypes.clean_upload_DamageImage, payload: {} })
}