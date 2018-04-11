import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    InteractionManager
} from 'react-native'
import { Button } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import * as demageListAction from '../../views/demageList/DemageListAction'

const SearchDamageOP = props => {
    const { submit, getDemageListWaiting, getDemageList } = props
    return (
        <Button transparent onPress={() => {
            submit()
            getDemageListWaiting()
            Actions.pop()
            InteractionManager.runAfterInteractions(getDemageList)
        }}>
            <Text style={[globalStyles.midText, styles.text]}>搜索</Text>
        </Button>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})

const mapDispatchToProps = (dispatch) => ({
    submit: () => {
        dispatch(submit('searchDamageform'))
    },
    getDemageList: () => {
        dispatch(demageListAction.getDemageList())
    },
    getDemageListWaiting: () => {
        dispatch(demageListAction.getDemageListWaiting())
    }
})

export default connect(null, mapDispatchToProps)(SearchDamageOP)