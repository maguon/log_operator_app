import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Task extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name='account' size={12} color='#aaa' />
                            <Text style={{ color: '#00cade', fontWeight: 'bold', paddingLeft: 5 }}>张宝全</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name='phone' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5 }}>18949385746</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name='truck-delivery' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5 }}>货车牌号：辽B12345</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 11 }}>剩余车位：14</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#fafafa', flex: 1, paddingHorizontal: 10, paddingTop: 10 }}>
                    <View style={{ borderWidth: 0.5, borderColor: '#a8a8a8' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eff3f5', padding: 10, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name='truck-delivery' size={20} color='#00cade' />
                                <Text style={{ paddingLeft: 10, fontWeight: 'bold', color: '#8c989f' }}>大连->沈阳</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingLeft: 10, fontSize: 11, color: '#8c989f' }}>指定编号：123456789</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 11, color: '#8c989f' }}>装车地点：大连港</Text>
                            <Text style={{ fontSize: 11, color: '#8c989f' }}>指定装载：14</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}