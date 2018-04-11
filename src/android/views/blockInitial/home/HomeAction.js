import httpRequest from '../../../../util/HttpRequest'
import { base_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import moment from 'moment'

export const getHomeData = (param) => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } },
            settingReducer: { data: { baseAddrId } } } = getState()
        const urls = [`${base_host}/dpRouteLoadTaskCount?${ObjectToUrl({
            loadDateStart: moment().format('YYYY-MM-01'),
            loadDateEnd: moment().format('YYYY-MM-DD'),
            loadTaskStatusArr: '3,7,9',
            fieldOpId: uid
        })}`,
        `${base_host}/dpRouteTask?${ObjectToUrl({
            baseAddrId: baseAddrId,
            loadTaskStatus: '1'
        })}`]  
        const res = await Promise.all(urls.map(url => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.homeTypes.get_HomeData_success, payload: {
                    carriedCount: res[0].result[0],
                    taskList: res[1].result
                }
            })
        } else {
            dispatch({ type: actionTypes.homeTypes.get_HomeData_failed, payload: { failedMsg: `${res[0].msg}&&${res[1].msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.get_HomeData_error, payload: { errorMsg: err } })
    }
}

export const getHomeDataWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.get_HomeData_waiting, payload: {} })
}

