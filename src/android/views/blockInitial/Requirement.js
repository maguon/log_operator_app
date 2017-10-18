import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import {Button} from 'native-base'
import Select from '../../components/form/Select'
import DateTimePicker from '../../components/form/DateTimePicker'

export default class Requirement extends Component {
    constructor(props) {
        super(props)
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
                                value={'请选择'}
                                onValueChange={() => { }}
                            />
                            <DateTimePicker
                                title='到：'
                                defaultValue={'请选择'}
                                value={'请选择'}
                                onValueChange={() => { }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <DateTimePicker
                                title='指令时间从：'
                                defaultValue={'请选择'}
                                value={'请选择'}
                                onValueChange={() => { }}
                            />
                            <DateTimePicker
                                title='到：'
                                defaultValue={'请选择'}
                                value={'请选择'}
                                onValueChange={() => { }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Select
                                title='起始城市：'
                                value={'请选择'}
                                onValueChange={() => { }}
                                defaultValue={'请选择'}
                            />
                            <Select
                                title='目的城市：'
                                value={'请选择'}
                                onValueChange={() => { }}
                                defaultValue={'请选择'}
                            />
                        </View>
                        <Select
                            title='装车地点：'
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
                        <Button full style={{ backgroundColor: '#00cade', justifyContent: 'center', marginHorizontal: 10, marginTop: 30 }} onPress={() => { }}>
                            <Text style={{ color: '#fff' }}>确 定</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}