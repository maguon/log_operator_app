import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button } from 'native-base'
import Select from '../../components/form/Select'
import DateTimePicker from '../../components/form/DateTimePicker'
import * as RouterDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'

export default class Requirement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            receiveId: 0,
            receive: '',
            routeStart: '',
            routeStartId: 0,
            routeEnd: '',
            routeEndId: 0,
            createdOnStart: '',
            createdOnEnd: '',
            dateIdStart: '',
            dateIdEnd: '',
            baseAddrId: 0,
            baseAddr: ''
        }
        this._onPressOK = this._onPressOK.bind(this)
        this._onPressReset = this._onPressReset.bind(this)
    }

    _onPressOK() {
        const { createdOnStart, createdOnEnd, dateIdStart, dateIdEnd, routeStartId, routeEndId, baseAddrId, receiveId } = this.state
        let initParam = { createdOnStart, createdOnEnd, dateIdStart, dateIdEnd, routeStartId, routeEndId, baseAddrId, receiveId }
        for (key in initParam) {
            if(!initParam[key]){
                delete initParam[key]
            }
        }
        //console.log('initParam',initParam)
        Actions.requirementList({ initParam })
    }

    _onPressReset() {
        this.setState({
            receiveId: 0,
            receive: '',
            routeStart: '',
            routeStartId: 0,
            routeEnd: '',
            routeEndId: 0,
            createdOnStart: '',
            createdOnEnd: '',
            dateIdStart: '',
            dateIdEnd: '',
            baseAddrId: 0,
            baseAddr: ''
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <DateTimePicker
                                title='提交时间从：'
                                defaultValue={'请选择'}
                                value={this.state.createdOnStart ? this.state.createdOnStart : '请选择'}
                                onValueChange={(param) => this.setState({ createdOnStart: param })}
                            />
                            <DateTimePicker
                                title='到：'
                                defaultValue={'请选择'}
                                value={this.state.createdOnEnd ? this.state.createdOnEnd : '请选择'}
                                onValueChange={(param) => this.setState({ createdOnEnd: param })}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <DateTimePicker
                                title='指令时间从：'
                                defaultValue={'请选择'}
                                value={this.state.dateIdStart ? this.state.dateIdStart : '请选择'}
                                onValueChange={(param) => this.setState({ dateIdStart: param })}
                            />
                            <DateTimePicker
                                title='到：'
                                defaultValue={'请选择'}
                                value={this.state.dateIdEnd ? this.state.dateIdEnd : '请选择'}
                                onValueChange={(param) => this.setState({ dateIdEnd: param })}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Select
                                title='起始城市：'
                                value={this.state.routeStart ? this.state.routeStart : '请选择'}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.setState({ routeStartId: param.id, routeStart: param.city_name })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                title='目的城市：'
                                value={this.state.routeEnd ? this.state.routeEnd : '请选择'}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.setState({ routeEndId: param.id, routeEnd: param.city_name })}
                                defaultValue={'请选择'}
                            />
                        </View>
                        {this.state.routeStartId ? <Select
                            title='装车地点：'
                            value={this.state.baseAddr ? this.state.baseAddr : '请选择'}
                            showList={(param) => RouterDirection.selectBaseAddr(this.props.parent)({ ...param, cityId: this.state.routeStartId })}
                            onValueChange={(param) => this.setState({ baseAddr: param.address, baseAddrId: param.id })}
                            defaultValue={'请选择'}
                        /> : <View style={{ padding: 10, backgroundColor: '#eee' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>装车地点：<Text style={{ fontWeight: '100' }}>请先选择起始城市</Text></Text>
                            </View>}
                        {this.state.routeEndId ? <Select
                            title='送达地点：'
                            value={this.state.receive ? this.state.receive : '请选择'}
                            showList={(param) => RouterDirection.selectReceive(this.props.parent)({ ...param, cityId: this.state.routeEndId })}
                            onValueChange={(param) => this.setState({ receiveId: param.id, receive: param.address })}
                            defaultValue={'请选择'}
                        /> : <View style={{ padding: 10, backgroundColor: '#eee' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>送达地点：<Text style={{ fontWeight: '100' }}>请先选择目的城市</Text></Text>
                            </View>}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Button full style={{ backgroundColor: '#00cade', justifyContent: 'center', marginHorizontal: 10, marginTop: 30 }} onPress={this._onPressOK}>
                                    <Text style={{ color: '#fff' }}>确 定</Text>
                                </Button>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button full style={{ backgroundColor: '#00cade', justifyContent: 'center', marginHorizontal: 10, marginTop: 30 }} onPress={this._onPressReset}>
                                    <Text style={{ color: '#fff' }}>重 置</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}