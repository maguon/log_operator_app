import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import DateTimePicker from '../components/form/DateTimePicker'
import * as RouterDirection from '../../util/RouterDirection'

export default class AddCar extends Component {
    constructor(props) {
        super(props)
        this.state={
            
        }
        this._onPressOK=this._onPressOK.bind(this)
        this._onPressReset=this._onPressReset.bind(this)
    }

    _onPressOK(){

    }

    _onPressReset(){

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <TextBox
                            title='VIN码：'
                            value={''}
                            defaultValue={''}
                            onValueChange={() => { }}
                            placeholder='请输入车牌'
                        />
                        <Select
                            title='品牌：'
                            value={'请选择'}
                            onValueChange={() => { }}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            title='发动机号：'
                            value={''}
                            defaultValue={''}
                            onValueChange={() => { }}
                            placeholder='请输入车牌'
                        />
                        <DateTimePicker
                            title='生产日期：'
                            defaultValue={'请选择'}
                            value={'请选择'}
                            onValueChange={() => { }}
                        />
                        <Select
                            title='起始城市：'
                            value={'请选择'}
                            showList={RouterDirection.selectCity(this.props.parent)}
                            onValueChange={(param) => console.log(param)}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='委托方：'
                            value={'请选择'}
                            showList={RouterDirection.selectEntrust(this.props.parent)}
                            onValueChange={(param) => console.log(param)}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='目的城市：'
                            value={'请选择'}
                            showList={RouterDirection.selectCity(this.props.parent)}
                            onValueChange={(param) => console.log(param)}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='经销商：'
                            value={'请选择'}
                            showList={RouterDirection.selectReceive(this.props.parent)}
                            onValueChange={(param) => console.log(param)}
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