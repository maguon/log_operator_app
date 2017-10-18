import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'

export default class RequirementInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>生成时间：<Text style={{  fontWeight: '100' }}>2017-02-25 11:25</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>委托方：<Text style={{  fontWeight: '100' }}>东风日产</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>起始城市：<Text style={{  fontWeight: '100' }}>大连</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>装车地点：<Text style={{  fontWeight: '100' }}>大连港口</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>目的城市：<Text style={{  fontWeight: '100' }}>沈阳</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>送达地点：<Text style={{  fontWeight: '100' }}>经销商一</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>运送车辆数：<Text style={{color:'#fe8a95'}}>100</Text><Text style={{  fontWeight: '100' }}>辆</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>指令时间：<Text style={{  fontWeight: '100' }}>2017-02-28</Text></Text>
                </View>
            </View>
        )
    }
}