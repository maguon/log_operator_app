import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native'

import { Button } from 'native-base'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import DateTimePicker from '../components/form/DateTimePicker'
import * as RouterDirection from '../../util/RouterDirection'

import { connect } from 'react-redux'
import * as addCarAction from '../../actions/AddCarAction'
import { Actions } from 'react-native-router-flux'

class AddCar extends Component {
    constructor(props) {
        super(props)
        const { cityId, cityName } = this.props.settingReducer.data
        this.state = {
            vin: '',
            engineNum: '',
            makeId: 0,
            makeName: '',
            routeStartId: cityId ? cityId : 0,
            routeStart: cityName ? cityName : '',
            routeEndId: 0,
            routeEnd: '',
            receiveId: 0,
            receive: '',
            entrustId: 0,
            entrust: ''
        }
        //console.log('this.props.settingReducer',this.props.settingReducer)
        this._onPressOK = this._onPressOK.bind(this)
        this._onPressReset = this._onPressReset.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { addCar } = nextProps.addCarReducer
        if (addCar.isResultStatus == 2) {
            ToastAndroid.show('创建成功！', ToastAndroid.SHORT)
            // console.log('nextProps.addCarReducer',nextProps.addCarReducer)
            RouterDirection.addCarImage(this.props.parent)({ initParam: { carId: nextProps.addCarReducer.data.carId, vin: this.state.vin } })
            this.props.onSelect({ id: nextProps.addCarReducer.data.carId, vin: this.state.vin, make_name: this.state.makeName })
            this.props.resetAddCar()
        }
    }

    static defaultProps = {
        onSelect: (param) => { }
    }

    _onPressOK() {
        const { user } = this.props.userReducer.data
        const { vin, engineNum, makeId, makeName, routeStartId, routeStart, routeEndId, routeEnd, receiveId, entrustId } = this.state
        const initParam = { vin, engineNum, makeId, makeName, routeStartId, routeStart, routeEndId, routeEnd, receiveId, entrustId }
        for (key in initParam) {
            if (!initParam[key]) {
                delete initParam[key]
            }
        }
        this.props.addCar({
            requiredParam: {
                userId: user.userId
            },
            postParam: initParam
        })
    }

    _onPressReset() {
        this.setState(
            {
                vin: '',
                engineNum: '',
                makeId: 0,
                makeName: '',
                routeStartId: 0,
                routeStart: '',
                routeEndId: 0,
                routeEnd: '',
                receiveId: 0,
                receive: '',
                entrustId: 0,
                entrust: ''
            }
        )
    }

    render() {
        //console.log(this.props.userReducer)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <TextBox
                            title='VIN：'
                            value={this.state.vin ? `${this.state.vin}` : ''}
                            defaultValue={''}
                            onValueChange={(param) => {
                                if (this.state.vin != param) { this.setState({ vin: param }) }
                            }}
                            placeholder='请输入vin'
                        />
                        <Select
                            title='品牌：'
                            value={this.state.makeName ? `${this.state.makeName}` : '请选择'}
                            showList={RouterDirection.make(this.props.parent)}
                            onValueChange={(param) => {
                                if (this.state.makeId != param.id) { this.setState({ makeId: param.id, makeName: param.make_name }) }
                            }}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            title='发动机号：'
                            value={this.state.engineNum ? `${this.state.engineNum}` : ''}
                            defaultValue={''}
                            onValueChange={(param) => {
                                if (this.state.engineNum != param) { this.setState({ engineNum: param }) }
                            }}
                            placeholder='请输入发动机号'
                        />
                        <Select
                            title='起始城市：'
                            value={this.state.routeStart ? `${this.state.routeStart}` : '请选择'}
                            showList={RouterDirection.selectCity(this.props.parent)}
                            onValueChange={(param) => {
                                if (this.state.routeStartId != param.id) { this.setState({ routeStartId: param.id, routeStart: param.city_name }) }
                            }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='委托方：'
                            value={this.state.entrust ? `${this.state.entrust}` : '请选择'}
                            showList={RouterDirection.selectEntrust(this.props.parent)}
                            onValueChange={(param) => {
                                if (this.state.entrustId != param.id) { this.setState({ entrustId: param.id, entrust: param.short_name }) }
                            }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='目的城市：'
                            value={this.state.routeEnd ? `${this.state.routeEnd}` : '请选择'}
                            showList={RouterDirection.selectCity(this.props.parent)}
                            onValueChange={(param) => {
                                if (this.state.routeEndId != param.id) { 
                                    this.setState({ routeEndId: param.id, routeEnd: param.city_name ,receiveId:0,receive:''}) 
                                }
                            }}
                            defaultValue={'请选择'}
                        />
                        {this.state.routeEndId ? <Select
                            title='经销商：'
                            value={this.state.receive ? `${this.state.receive}` : '请选择'}
                            showList={(param) => RouterDirection.selectReceive(this.props.parent)({ ...param, cityId: this.state.routeEndId })}
                            onValueChange={(param) => {
                                if (this.state.receiveId != param.id) { this.setState({ receiveId: param.id, receive: param.short_name }) }
                            }}
                            defaultValue={'请选择'}
                        /> : <View style={{ padding: 10, backgroundColor: '#eee' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>经销商：<Text style={{ fontWeight: '100' }}>请先选择目的城市</Text></Text>
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

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        settingReducer: state.settingReducer,
        addCarReducer: state.addCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    addCar: (param) => {
        dispatch(addCarAction.addCar(param))
    },
    resetAddCar: () => {
        dispatch(addCarAction.resetAddCar())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCar)