import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableHighlight
} from 'react-native'
import Select from '../../components/form/Select'
import { Icon, Button } from 'native-base'
import * as RouterDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import * as settingAction from '../../../actions/SettingAction'
import { connect } from 'react-redux'
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'


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
            id: 1,
            value: {
                baseAddrId: param.id,
                baseAddr: param.address
            }
        })
    }

    _onPressExit() {

    }

    render() {
        const { baseAddrId, baseAddr } = this.props.settingReducer.data
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
                        <View style={{ backgroundColor: '#fff', padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>版本信息：<Text style={{ fontWeight: '100' }}>v</Text></Text>
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
        settingReducer: state.settingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveBaseAddr: (param) => {
        dispatch(settingAction.saveBaseAddr(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Setting)