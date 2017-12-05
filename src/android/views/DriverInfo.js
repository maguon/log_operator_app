import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    Image
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon } from 'native-base'
import FontTag from '../components/FontTag'
import DrivingLicenseTypeList from '../../config/DrivingLicenseType.json'
import { file_host } from '../../config/Host'

const window = Dimensions.get('window')

export default class DriverInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { initParam: { driverInfo } } = this.props
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#a8a8a8', backgroundColor: '#f2f6f9' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='account' size={18} color='#00cade' />
                            <Text style={{ paddingLeft: 10, color: '#00cade', fontWeight: 'bold' }}>{driverInfo.drive_name ? `${driverInfo.drive_name}` : ''}</Text>
                        </View>
                        <View>
                            {driverInfo.gender == 0 && <Icon name='ios-woman' style={{ fontSize: 15, color: '#f7656a' }} />}
                            {driverInfo.gender == 1 && <Icon name='ios-man' style={{ fontSize: 15, color: '#00cade' }} />}
                        </View>
                        <View>
                            {driverInfo.operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                            {driverInfo.operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                            {driverInfo.operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                            {driverInfo.operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='domain' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5 }}>{driverInfo.company_name ? `${driverInfo.company_name}` : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='cellphone-android' size={12} color='#aaa' />
                            <Text style={{ fontSize: 11, paddingLeft: 5 }}>{driverInfo.tel ? `${driverInfo.tel}` : ''}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>关联货车：<Text style={{ fontWeight: '100' }}>{driverInfo.truck_num ? `${driverInfo.truck_num}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>驾照类型：<Text style={{ fontWeight: '100' }}>{driverInfo.license_type ? DrivingLicenseTypeList.find((item) => item.id == driverInfo.license_type).value : ''}</Text></Text>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', margin: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: (window.width - 30) / 2, backgroundColor: '#fff', height: ((window.width - 30) / 2) / 16 * 9 }}>
                            {driverInfo.drive_image && <Image
                                source={{ uri: `${file_host}/image/${driverInfo.drive_image}` }}
                                style={{ width: (window.width - 30) / 2, height: ((window.width - 30) / 2) / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />}
                            {!driverInfo.drive_image && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 11 }}>暂无</Text>
                            </View>}
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: (window.width - 30) / 2, position: 'absolute', bottom: 0 }}>
                                <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>身份证正面</Text>
                            </View>
                        </View>
                        <View style={{ width: (window.width - 30) / 2, marginLeft: 10, backgroundColor: '#000', height: ((window.width - 30) / 2) / 16 * 9 }}>
                            {driverInfo.driver_image_re && <Image
                                source={{ uri: `${file_host}/image/${driverInfo.driver_image_re}` }}
                                style={{ width: (window.width - 30) / 2, height: ((window.width - 30) / 2) / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />}
                            {!driverInfo.driver_image_re && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 11 }}>暂无</Text>
                            </View>}
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: (window.width - 30) / 2, position: 'absolute', bottom: 0 }}>
                                <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>身份证背面</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: (window.width - 30) / 2, backgroundColor: '#000', height: ((window.width - 30) / 2) / 16 * 9 }}>
                            {driverInfo.license_image && <Image
                                source={{ uri: `${file_host}/image/${driverInfo.license_image}` }}
                                style={{ width: (window.width - 30) / 2, height: ((window.width - 30) / 2) / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />}
                            {!driverInfo.license_image && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 11 }}>暂无</Text>
                            </View>}
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: (window.width - 30) / 2, position: 'absolute', bottom: 0 }}>
                                <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>驾驶证</Text>
                            </View>
                        </View>
                        <View style={{ width: (window.width - 30) / 2, marginLeft: 10, backgroundColor: '#000', height: ((window.width - 30) / 2) / 16 * 9 }}>
                            {driverInfo.op_license_image && <Image
                                source={{ uri: `${file_host}/image/${driverInfo.op_license_image}` }}
                                style={{ width: (window.width - 30) / 2, height: ((window.width - 30) / 2) / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />}
                            {!driverInfo.op_license_image && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 11 }}>暂无</Text>
                            </View>}
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: (window.width - 30) / 2, position: 'absolute', bottom: 0 }}>
                                <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>准驾证</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' , marginTop: 10}}>
                        <View style={{ width: (window.width - 30) / 2, backgroundColor: '#fff', height: ((window.width - 30) / 2) / 16 * 9 }}>
                            {driverInfo.driver_avatar_image && <Image
                                source={{ uri: `${file_host}/image/${driverInfo.driver_avatar_image}` }}
                                style={{ width: (window.width - 30) / 2, height: ((window.width - 30) / 2) / 16 * 9, borderColor: '#e4e4e4', borderWidth: 1 }} />}
                            {!driverInfo.driver_avatar_image && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 11 }}>暂无</Text>
                            </View>}
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: (window.width - 30) / 2, position: 'absolute', bottom: 0 }}>
                                <Text style={{ textAlign: 'center', fontSize: 10, paddingVertical: 4, color: '#fff' }}>司机个人照片</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}