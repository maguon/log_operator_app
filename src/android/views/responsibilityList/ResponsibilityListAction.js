import * as httpRequest from '../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../config/Host'
import * as responsibilityListActionTypes from './ResponsibilityListActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { sleep } from '../../../util/util'

const pageSize = 50

export const getResponsibilityList = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        const url = `${base_host}/damage?${ObjectToUrl({ underUserId: uid, start: 0, size: pageSize })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: responsibilityListActionTypes.get_ResponsibilityList_success,
                payload: {
                    responsibilityList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                ToastAndroid.showWithGravity('数据已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            }
        } else {
            dispatch({ type: responsibilityListActionTypes.get_ResponsibilityList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: responsibilityListActionTypes.get_ResponsibilityList_error, payload: { errorMsg: err } })
    }
}

export const getResponsibilityListWaiting = () => (dispatch, getState) => {
    dispatch({ type: responsibilityListActionTypes.get_ResponsibilityList_waiting, payload: {} })
}

export const getResponsibilityListMore = () => async (dispatch, getState) => {

    const {
        loginReducer: { data: { user: { uid } } },
        responsibilityListReducer: { data: { responsibilityList, isComplete } },
        responsibilityListReducer } = getState()
    if (responsibilityListReducer.getResponsibilityListMore.isResultStatus == 1) {
        await sleep(1000)
        getResponsibilityListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: responsibilityListActionTypes.get_ResponsibilityListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/damage?${ObjectToUrl({ underUserId: uid, start: responsibilityList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: responsibilityListActionTypes.get_ResponsibilityListMore_success, payload: { responsibilityList: res.result, isComplete: true } })
                        ToastAndroid.showWithGravity('数据已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    } else {
                        dispatch({ type: responsibilityListActionTypes.get_ResponsibilityListMore_success, payload: { responsibilityList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: responsibilityListActionTypes.get_ResponsibilityListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: responsibilityListActionTypes.get_ResponsibilityListMore_error, payload: { errorMsg: err } })
            }
        }
        // else {
        //     ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        // }
    }

}