import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'


export const saveBaseAddr = (param) => (dispatch) => {
    console.log(param.value)
    // localStorage.save({
    //     key: localStorageKey.BASEADDR,
    //     data: param.value
    // })
    dispatch({ type: actionTypes.settingTypes.SAVE_BaseAddr, payload: { data: param.value } })
}