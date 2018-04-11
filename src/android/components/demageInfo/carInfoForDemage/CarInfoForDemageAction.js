import * as httpRequest from '../../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../../config/Host'
import * as carInfoForDemageActionTypes from './CarInfoForDemageActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getCarInfo = (param) => async (dispatch, getState) => {
    const { car_id } = param
    try {
        const url = `${base_host}/carList?${ObjectToUrl({ carId: car_id })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: carInfoForDemageActionTypes.get_CarInfoForDemage_success, payload: { carInfo: res.result[0] } })
        } else {
            dispatch({ type: carInfoForDemageActionTypes.get_CarInfoForDemage_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: carInfoForDemageActionTypes.get_CarInfoForDemage_error, payload: { failedMsg: err} })
    }
}

export const getCarInfoWaiting = () => (dispatch) => {
    dispatch({ type: carInfoForDemageActionTypes.get_CarInfoForDemage_waiting, payload: {} })
}