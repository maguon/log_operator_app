import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'native-base'



export default class Command extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('this.props',this.props)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                    <View>
                        <Text style={{ fontSize: 11, color: '#8c989f' }}>指令编号：1234567890</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <MaterialCommunityIcons name='map-marker-multiple' size={20} color='#00cade' />
                        <Text style={{ paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }}>大连 -> 沈阳</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='clock' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>指令时间：2017-09-06</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='account' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>指令调度：张某某</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='clock' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>执行时间：2017-09-06</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='car' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>计划运送：14</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                        <View>
                            <Text style={{ color: '#8c989f', fontWeight: 'bold' }}>沈阳 - 经销商一</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                            <View>
                                <Text style={{ fontSize: 11, color: '#8c989f' }}>计划装车：5</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Button small rounded style={{ backgroundColor: '#fe8a95', width: 50, height: 20, justifyContent: 'center' }} onPress={() => { }}>
                                        <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>取 消</Text>
                                    </Button>
                                </View>
                                <View style={{ paddingLeft: 10 }}>
                                    <Button small rounded style={{ backgroundColor: '#00cade', width: 50, height: 20, justifyContent: 'center' }} onPress={() => { }}>
                                        <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>装 车</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}