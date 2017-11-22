import * as actionTypes from '../actionTypes'
import httpRequest from '../util/HttpRequest.js'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import { base_host } from '../config/Host'
import requestHeaders from '../util/RequestHeaders'
import { ObjectToUrl } from '../util/ObjectToUrl'
import XGPush from 'react-native-xinge-push'


/** 
 * 
 * loginFlow : 登录流程
 * 
 * param : 对应执行步骤执行时所需要的参数
 * currentStep : 执行到第N步（从1开始）
 * tryCount : 当遇到网络错误的时候尝试的次数（从1开始）
 * 
 * 
 * 初始化流程：
 * 第一步：获取推送消息需要的deviceToken
 * 第二步：登录
 *
 */
export const loginFlow = (param, tryCount = 1, currentStep = 1) => (dispatch) => {
    if (currentStep == 1) {
        //执行第一步
        // console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
        initPush(param, tryCount, currentStep)(dispatch)
    } else if (currentStep == 2) {
        //执行第二步
        //console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
        login(param, tryCount, currentStep)(dispatch)
    }
}


//获取deviceToken
export const initPush = (param, tryCount = 1, currentStep = 1) => async (dispatch) => {
    try {
        XGPush.init(2100270818, 'AK3E3I847AMD')
        const deviceToken = await XGPush.register('jeepeng')
        if (deviceToken) {
            dispatch({ type: actionTypes.loginTypes.Init_Push_Success, payload: { step: currentStep, deviceToken } })
            param.OptionalParam.deviceToken = deviceToken
            loginFlow(param, 1, currentStep + 1)(dispatch)
        } else {
            dispatch({ type: actionTypes.loginTypes.Init_Push_Failed, payload: { step: currentStep } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.loginTypes.Init_Push_Error, payload: { step: currentStep, errorMsg: err.message } })
    }
}

//登录
export const login = (param, tryCount = 1, currentStep = 1) => async (dispatch) => {
    try {
        const url = `${base_host}/mobileUserLogin?${ObjectToUrl(param.OptionalParam)}`
        const res = await httpRequest.post(url, param.postParam)
        console.log(res)
        if (res.success) {
            //判断请求是否成功，如果成功，更新token
            if (res.result.type == 39||res.result.type == 31) {
                const user = {
                    userId: res.result.userId,
                    token: res.result.accessToken,
                    userType: res.result.type,
                    userStatus: res.result.userStatus,
                    mobile: res.result.phone
                }
                requestHeaders.set('auth-token', res.result.accessToken)
                requestHeaders.set('user-type', res.result.type)
                requestHeaders.set('user-name', res.result.phone)
                localStorage.save({
                    key: localStorageKey.USER,
                    data: user
                })
                dispatch({ type: actionTypes.loginTypes.Login_Success, payload: { user, step: currentStep } })
            }
            else {
                dispatch({ type: actionTypes.loginTypes.Login_Failed, payload: { failedMsg: '身份错误！', step: currentStep } })
            }
        } else {
            //登录失败重新登录
            dispatch({ type: actionTypes.loginTypes.Login_Failed, payload: { failedMsg: res.msg, step: currentStep } })
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                initApp(param, tryCount + 1, currentStep)(dispatch)
            } else {
                dispatch({ type: actionTypes.loginTypes.Login_NetWorkError, payload: { networkError: err.message, step: currentStep } })
            }
        } else {
            dispatch({ type: actionTypes.loginTypes.Login_Error, payload: { errorMsg: err.message, step: currentStep } })
        }
    }
}

export const loginFlowWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.loginTypes.LoginFlow_Waiting, payload: {} })
}

export const cleanLogin = () => (dispatch) => {
    dispatch({ type: actionTypes.loginTypes.CLEAN_LOGIN, payload: {} })
}
