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

export default class Work extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateIdStart: '',
            dateIdEnd: '',
            routeEndId: 0,
            routeEnd: '',
            routeStart: '',
            routeStartId: 0
        }
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
                        <Select
                            title='执行指令编号：'
                            value={'请选择'}
                            onValueChange={() => { }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='商品车VIN码：'
                            value={'请选择'}
                            onValueChange={() => { }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='司机：'
                            value={'请选择'}
                            onValueChange={() => { }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='货车：'
                            value={'请选择'}
                            onValueChange={() => { }}
                            defaultValue={'请选择'}
                        />
                        <Button full style={{ backgroundColor: '#00cade', justifyContent: 'center', marginHorizontal: 10, marginTop: 30 }} onPress={() => { }}>
                            <Text style={{ color: '#fff' }}>确 定</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
