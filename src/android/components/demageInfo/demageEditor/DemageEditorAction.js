import * as httpRequest from '../../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../../config/Host'
import * as demageEditorActionTypes from './DemageEditorActionTypes'
import * as demageListActionTypes from '../../../views/demageList/DemageListActionTypes'
import { ObjectToUrl, objectExceptNull } from '../../../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'

export const updateDamage = (param) => async (dispatch, getState) => {
    try {
        dispatch({ type: demageEditorActionTypes.update_Damage_waiting, payload: {} })
        const { values: { car, damageRemark, driver }, parent, damageId } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()
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
            dispatch({
                type: demageListActionTypes.update_Demage, payload: objectExceptNull({
                    id: damageId,
                    truck_id: driver ? driver.item.truck_id : null,
                    truck_num: driver ? driver.item.truck_num : null,
                    drive_id: driver ? driver.id : null,
                    drive_name: driver ? driver.value : null,
                    damage_explain: damageRemark
                })
            })
            dispatch({ type: demageEditorActionTypes.update_Damage_success, payload: {} })
            ToastAndroid.showWithGravity(`修改成功！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        } else {
            dispatch({ type: demageEditorActionTypes.update_Damage_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`修改失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: demageEditorActionTypes.update_Damage_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`修改成功！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)

    }
}