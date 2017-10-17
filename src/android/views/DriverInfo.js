import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon } from 'native-base'
import FontTag from '../components/FontTag'

const window = Dimensions.get('window')

export default class DriverInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#a8a8a8', backgroundColor: '#f2f6f9' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='account' size={18} color='#00cade' />
                            <Text style={{ paddingLeft: 10, color: '#00cade', fontWeight: 'bold' }}>王宝全</Text>
                        </View>
                        <View>
                            <Icon name='ios-man' style={{ fontSize: 15, color: '#00cade' }} />
                            {/* <Icon name='ios-woman' style={{ fontSize: 15, color: '#00cade' }} /> */}
                        </View>
                        <View>
                            <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff'/>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='domain' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5 }}>安吉物流</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='cellphone-android' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5 }}>18928374567</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                    <Text style={{ fontSize: 11,fontWeight:'bold' }}>关联货车：<Text style={{fontWeight:'100'}}>辽B12345</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                    <Text style={{ fontSize: 11 ,fontWeight:'bold'}}>驾照类型：<Text style={{fontWeight:'100'}}>A1</Text></Text>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', margin: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: (window.width - 30) / 2, backgroundColor: '#000', height: ((window.width - 30) / 2) / 16 * 9 }}>
                        </View>
                        <View style={{ width: (window.width - 30) / 2, marginLeft: 10, backgroundColor: '#000', height: ((window.width - 30) / 2) / 16 * 9 }}>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: (window.width - 30) / 2, backgroundColor: '#000', height: ((window.width - 30) / 2) / 16 * 9 }}>
                        </View>
                        <View style={{ width: (window.width - 30) / 2, marginLeft: 10, backgroundColor: '#000', height: ((window.width - 30) / 2) / 16 * 9 }}>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}