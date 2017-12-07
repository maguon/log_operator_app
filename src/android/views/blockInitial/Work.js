import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'

import { Button } from 'native-base'
import * as RouterDirection from '../../../util/RouterDirection'
import TextBox from '../../components/form/TextBox'
import Select from '../../components/form/Select'
import DateTimePicker from '../../components/form/DateTimePicker'
import { connect } from 'react-redux'

class Work extends Component {
    constructor(props) {
        super(props)
        const { data } = this.props.settingReducer
        this.state = {
            loadDateStart: '',
            loadDateEnd: '',
            routeEndId: 0,
            routeEnd: '',
            routeStart: data.cityId  ? data.cityName : '',
            routeStartId: data.cityId,
            receiveId: 0,
            receive: '',
            baseAddrId: data.baseAddrId,
            baseAddr: data.baseAddrId  ? data.baseAddr : '',
            vin: '',
            driveId: 0,
            driveName: '',
            truckId: 0,
            truckNum: '',
            dpRouteTaskId: ''
        }
        this._onPressOK = this._onPressOK.bind(this)
        this._onPressReset = this._onPressReset.bind(this)
    }

    _onPressOK() {
        const { loadDateStart, loadDateEnd, routeEndId, routeStartId, vin, driveId, truckId, dpRouteTaskId,baseAddrId } = this.state
        let initParam = { loadDateStart, loadDateEnd, routeEndId, routeStartId, vin, driveId, truckId, dpRouteTaskId,baseAddrId }
        for (key in initParam) {
            if (!initParam[key]) {
                delete initParam[key]
            }
        }
        RouterDirection.commandList(this.props.parent)({ initParam })
    }

    _onPressReset() {
        const { data } = this.props.settingReducer
        this.setState({
            loadDateStart: '',
            loadDateEnd: '',
            routeEndId: 0,
            routeEnd: '',
            routeStart: data.cityId  ? data.cityName : '',
            routeStartId: data.cityId,
            receiveId: 0,
            receive: '',
            baseAddrId: data.baseAddrId,
            baseAddr: data.baseAddrId  ? data.baseAddr : '',
            vin: '',
            driveId: 0,
            driveName: '',
            truckId: 0,
            truckNum: '',
            dpRouteTaskId: ''
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <DateTimePicker
                                title='装车时间从：'
                                defaultValue={'请选择'}
                                value={this.state.loadDateStart ? this.state.loadDateStart : '请选择'}
                                onValueChange={(param) => {
                                    if (this.state.loadDateStart != param) {
                                        this.setState({ loadDateStart: param })
                                    }
                                }}
                            />
                            <DateTimePicker
                                title='到：'
                                defaultValue={'请选择'}
                                value={this.state.loadDateEnd ? this.state.loadDateEnd : '请选择'}
                                onValueChange={(param) => {
                                    if (this.state.loadDateEnd != param) {
                                        this.setState({ loadDateEnd: param })
                                    }
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Select
                                title='起始城市：'
                                value={this.state.routeStart ? this.state.routeStart : '请选择'}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => {
                                    if (this.state.routeStartId != param.id) {
                                        this.setState({ routeStartId: param.id, routeStart: param.city_name, baseAddr: '', baseAddrId: 0 })
                                    }
                                }}
                                defaultValue={'请选择'}
                            />
                            <Select
                                title='目的城市：'
                                value={this.state.routeEnd ? this.state.routeEnd : '请选择'}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => {
                                    if (this.state.routeEndId != param.id) {
                                        this.setState({ routeEndId: param.id, routeEnd: param.city_name, receiveId: 0, receive: '' })
                                    }
                                }}
                                defaultValue={'请选择'}
                            />
                        </View>
                        {this.state.routeStartId ? <Select
                            title='装车地点：'
                            value={this.state.baseAddr ? this.state.baseAddr : '请选择'}
                            showList={(param) => RouterDirection.selectBaseAddr(this.props.parent)({ ...param, cityId: this.state.routeStartId })}
                            onValueChange={(param) => {
                                if (this.state.baseAddrId != param.id) {
                                    this.setState({ baseAddr: param.address, baseAddrId: param.id })
                                }
                            }}
                            defaultValue={'请选择'}
                        /> : <View style={{ padding: 10, backgroundColor: '#eee' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>装车地点：<Text style={{ fontWeight: '100' }}>请先选择起始城市</Text></Text>
                            </View>}
                        {this.state.routeEndId ? <Select
                            title='送达地点：'
                            value={this.state.receive ? this.state.receive : '请选择'}
                            showList={(param) => RouterDirection.selectReceive(this.props.parent)({ ...param, cityId: this.state.routeEndId })}
                            onValueChange={(param) => {
                                if (this.state.receiveId != param.id) {
                                    this.setState({ receiveId: param.id, receive: param.short_name })
                                }
                            }}
                            defaultValue={'请选择'}
                        /> : <View style={{ padding: 10, backgroundColor: '#eee' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>送达地点：<Text style={{ fontWeight: '100' }}>请先选择目的城市</Text></Text>
                            </View>}
                        <TextBox
                            title='执行指令编号：'
                            value={this.state.dpRouteTaskId ? this.state.dpRouteTaskId : ''}
                            defaultValue={''}
                            onValueChange={(param) => {
                                if (this.state.dpRouteTaskId != param) {
                                    this.setState({ dpRouteTaskId: param })
                                }
                            }}
                            placeholder='请输入执行指令编号'
                        />
                        <Select
                            title='VIN：'
                            value={this.state.vin ? this.state.vin : '请选择'}
                            showList={RouterDirection.selectCarVin(this.props.parent)}
                            onValueChange={(param) => {

                                if (this.state.vin != param.vin) {
                                    this.setState({ vin: param.vin })
                                }
                            }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='司机：'
                            value={this.state.driveName ? this.state.driveName : '请选择'}
                            showList={RouterDirection.selectDriver(this.props.parent)}
                            onValueChange={(param) => {
                                if (this.state.driveId != param.id) {
                                    this.setState({ driveName: param.drive_name, driveId: param.id })
                                }
                            }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='货车：'
                            value={this.state.truckNum ? this.state.truckNum : '请选择'}
                            showList={RouterDirection.selectTruck(this.props.parent)}
                            onValueChange={(param) => {
                                if (this.state.truckId != param.id) {
                                    this.setState({ truckId: param.id, truckNum: param.truck_num })
                                }
                            }}
                            defaultValue={'请选择'}
                        />
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


const mapStateToProps = (state) => {
    return {
        settingReducer: state.settingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Work)
