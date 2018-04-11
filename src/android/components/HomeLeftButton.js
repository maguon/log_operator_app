import React from 'react'
import { Text, InteractionManager } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import globalStyles from '../GlobalStyles'
import * as routerDirection from '../../util/RouterDirection'
import * as settingAction from '../views/blockInitial/setting/SettingAction'
import * as homeAction from '../views/blockInitial/home/HomeAction'
import moment from 'moment'

const HomeLeftButton = props => {
    const { saveBaseAddr, parent,
        loginReducer: { data: { user: { uid } } },
        settingReducer: { data: { baseAddr } },
        getHomeDataWaiting, getHomeData } = props
    return (
        <Button transparent onPress={() => routerDirection.selectCity(parent)({
            onSelect: (param) => {
                getHomeDataWaiting()
                InteractionManager.runAfterInteractions(getHomeData)
                saveBaseAddr({
                    baseAddrId: param.id,
                    baseAddr: param.addr_name,
                    cityId: param.city_id,
                    cityName: param.city_name
                })
            }, isMultistep: true
        })}>
            <Icon name="ios-pin" style={{ fontSize: 20, color: '#fff' }} />
            <Text style={[globalStyles.midText, { color: '#fff', paddingLeft: 5 }]}>{baseAddr ? baseAddr : '请选择装车地点'}</Text>
        </Button>
    )
}


const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        settingReducer: state.settingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveBaseAddr: (param) => {
        dispatch(settingAction.saveBaseAddr(param))
    },
    getHomeData: (param) => {
        dispatch(homeAction.getHomeData(param))
    },
    getHomeDataWaiting: () => {
        dispatch(homeAction.getHomeDataWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeLeftButton)
