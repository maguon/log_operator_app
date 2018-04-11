import * as actionTypes from '../../../actionTypes/index'
import httpRequest from '../../../util/HttpRequest.js'
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'
import { base_host } from '../../../config/Host'
import requestHeaders from '../../../util/RequestHeaders'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as initializationAction from '../initialization/InitializationAction'
import { change } from 'redux-form'
/** 
 * 
 * tryCount : 当遇到网络错误的时候尝试的次数（从1开始）
 *
 */


export const cleanLogin = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user } } } = getState()
    localStorage.save({
        key: localStorageKey.USER,
        data: {
            mobile: user.mobile
        }
    })
    dispatch({ type: actionTypes.loginTypes.clean_login, payload: { mobile: user.mobile } })
}

export const login = (param, tryCount = 1) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.loginTypes.login_waiting, payload: {} })
        const { mobile, password } = param
        const { initializationReducer: { data: {
            version: { currentVersion },
            deviceInfo: { deviceToken } } } } = getState()
        const url = `${base_host}/mobileUserLogin?${ObjectToUrl({
            version: currentVersion,
            appType: 3,
            deviceType: 1,
            deviceToken
        })}`
        const res = await httpRequest.post(url, { mobile, password })
        if (res.success) {
            if (res.result.type == 39 || res.result.type == 31) {
                const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: res.result.userId })}`
                const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
                if (getUserInfoRes.success) {
                    const { uid, mobile, real_name, type, gender, avatar_image, status } = getUserInfoRes.result[0]
                    const user = {
                        uid, mobile, real_name, type, gender, avatar_image, status,
                        token: res.result.accessToken,
                    }
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', type)
                    requestHeaders.set('user-name', mobile)
                    localStorage.save({
                        key: localStorageKey.USER,
                        data: user
                    })
                    await dispatch(initializationAction.getBaseAddr())
                    dispatch({ type: actionTypes.loginTypes.login_success, payload: { user } })
                } else {
                    ToastAndroid.showWithGravity(`登陆失败：无法获取用户信息！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: '无法获取用户信息！' } })
                }
            }
            else {
                ToastAndroid.showWithGravity(`登陆失败：身份错误！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: '身份错误！' } })
            }
        } else {
            //登录失败重新登录
            ToastAndroid.showWithGravity(`登陆失败：${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                dispatch(login(param, tryCount + 1))
            } else {
                ToastAndroid.showWithGravity(`登陆失败：网络链接失败！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.loginTypes.login_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity(`登陆失败：${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.loginTypes.login_error, payload: { errorMsg: err } })
        }
    }

}