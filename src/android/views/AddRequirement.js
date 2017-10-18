import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import {Button} from 'native-base'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import DateTimePicker from '../components/form/DateTimePicker'

export default class AddRequirement extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <Select
                            title='委托方：'
                            value={'请选择'}
                            onValueChange={() => { }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='起始城市：'
                            value={'请选择'}
                            onValueChange={() => { }}
                            defaultValue={'请选择'}
                        />
                        <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>装车地点：<Text style={{ fontWeight: '100' }}>大连港口</Text></Text>
                        </View>
                        <Select
                            title='目的城市：'
                            value={'请选择'}
                            onValueChange={() => { }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='送达地点：'
                            value={'请选择'}
                            onValueChange={() => { }}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            title='运送车辆数：'
                            value={''}
                            defaultValue={''}
                            onValueChange={() => { }}
                            placeholder='请输入车牌'
                        />
                        <DateTimePicker
                            title='指令时间：'
                            defaultValue={'请选择'}
                            value={'请选择'}
                            onValueChange={() => { }}
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