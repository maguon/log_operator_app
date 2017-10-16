import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#00cade', paddingVertical: 10, borderTopWidth: 0.2, borderColor: '#00e5f6' }}>
                    <View style={{ flex: 1, flexDirection: 'row', borderRightWidth: 0.2, borderColor: '#00e5f6' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name='truck' size={40} color='#fff' />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>本月装车次</Text>
                            <Text style={{ color: '#fefcc1', fontWeight: 'bold' }}>120</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name='car-side' size={40} color='#fff' />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>本月装车量</Text>
                            <Text style={{ color: '#fefcc1', fontWeight: 'bold' }}>1500</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#fafafa', flex: 1, paddingHorizontal: 10, paddingTop: 10 }}>
                    <View style={{ borderWidth: 0.5, borderColor: '#a8a8a8' }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name='truck-delivery' size={20} color='#00cade' />
                                <Text style={{ paddingLeft: 10, fontWeight: 'bold', color: '#8c989f' }}>大连->沈阳</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name='account' size={20} color='#00cade' />
                                <Text style={{ paddingLeft: 10, fontWeight: 'bold', color: '#8c989f' }}>张宝全</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 11, color: '#8c989f' }}>执行时间：2017-09-06 11:30</Text>
                            <Text style={{ fontSize: 11, color: '#8c989f' }}>指定装载：14</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}