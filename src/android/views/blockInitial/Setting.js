import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Linking
} from 'react-native'
import Select from '../../components/form/Select'
import { Icon, Button } from 'native-base'
import * as RouterDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import * as settingAction from '../../../actions/SettingAction'
import { connect } from 'react-redux'
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'
import * as loginAction from '../../../actions/LoginAction'


class Setting extends Component {
    constructor(props) {
        super(props)
        this._onShowBaseAddr = this._onShowBaseAddr.bind(this)
        this._onSaveBaseAddr = this._onSaveBaseAddr.bind(this)
        this._onPressExit = this._onPressExit.bind(this)
    }

    _onShowBaseAddr(param) {
        return RouterDirection.selectCity(this.props.parent)({ ...param, isMultistep: true })
    }

    _onSaveBaseAddr(param) {
        this.props.saveBaseAddr({
            baseAddrId: param.id,
            baseAddr: param.addr_name,
            cityId: param.city_id,
            cityName: param.city_name
        })
    }

    linkDownload(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.error('An error occurred', err))
    }

    _onPressExit() {
        localStorage.save({
            key: localStorageKey.USER,
            data: { mobile: this.props.userReducer.data.user.mobile }
        })
        this.props.cleanLogin()
        Actions.popTo('login')
    }

    render() {
        const { baseAddrId, baseAddr } = this.props.settingReducer.data
        const { version } = this.props.initializationReducer.data
        return (
            <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
                <ScrollView>
                    <View style={{ margin: 10, borderWidth: 2, borderColor: '#eee' }}>
                        <View style={{ backgroundColor: '#fff' }}>
                            <Select
                                title='装车地点：'
                                value={baseAddr ? baseAddr : '请选择'}
                                showList={this._onShowBaseAddr}
                                onValueChange={this._onSaveBaseAddr}
                                defaultValue={'请选择'}
                            />
                        </View>
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.1)'
                            onPress={Actions.password}>
                            <View style={{ backgroundColor: '#fff', padding: 10, borderBottomWidth: 1, flexDirection: 'row', borderColor: '#eee', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>设置密码</Text>
                                <Icon name='ios-arrow-forward' style={{ fontSize: 18, color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                        <View style={{ backgroundColor: '#fff', padding: 10, borderBottomWidth: 1, borderColor: '#eee',justifyContent: 'space-between',flexDirection:'row' }}>
                        
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>版本信息：<Text style={{ fontWeight: '100' }}>{`v${version.currentVersion}`}</Text></Text>
                            {version.force_update==2&&                            <Text
                                    onPress={() => this.linkDownload(version.url)}
                                    style={{
                                        backgroundColor: 'red',
                                        color: '#fff',
                                        borderRadius: 5,
                                        textAlign: 'center',
                                        paddingHorizontal: 4
                                    }}>new</Text>}

                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 50 }}>
                        <Button full style={{ backgroundColor: '#00cade' }} onPress={this._onPressExit}>
                            <Text style={{ color: '#fff' }}>退出登陆</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settingReducer: state.settingReducer,
        initializationReducer: state.initializationReducer,
        userReducer:state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveBaseAddr: (param) => {
        dispatch(settingAction.saveBaseAddr(param))
    },
    cleanLogin: () => {
        dispatch(loginAction.cleanLogin())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Setting)