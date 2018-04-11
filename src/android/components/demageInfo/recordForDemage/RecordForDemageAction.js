import * as httpRequest from '../../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../../config/Host'
import * as recordForDemageActionTypes from './RecordForDemageActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getCarInfoRecord = (param) => async (dispatch, getState) => {
    const { car_id } = param
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        const url = `${record_host}/user/${uid}/car/${car_id}/record`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: recordForDemageActionTypes.get_RecordForDemage_success, payload: { carInfoRecord: res.result[0] } })
        } else {
            dispatch({ type: recordForDemageActionTypes.get_RecordForDemage_failed, payload: { errorMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: recordForDemageActionTypes.get_RecordForDemage_error, payload: { errorMsg: err } })
    }
}

export const getCarInfoRecordWaiting = () => (dispatch) => {
    dispatch({ type: recordForDemageActionTypes.get_RecordForDemage_waiting, payload: {} })
}