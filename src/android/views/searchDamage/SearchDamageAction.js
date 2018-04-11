import * as searchDamageTypes from './SearchDamageTypes'

export const setSearchDamageForm = param => (dispatch) => {
    dispatch({ type: searchDamageTypes.set_SearchDamageForm, payload: { searchDamageForm: { ...param } } })
}

export const cleanSearchDamageForm = param => (dispatch) => {
    dispatch({ type: searchDamageTypes.clean_SearchDamageForm, payload: {} })
}