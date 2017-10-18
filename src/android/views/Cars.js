import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button, Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Cars extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                    <Text style={{ fontSize: 11 }}>计划运送：5</Text>
                    <Button small rounded style={{ backgroundColor: '#00cade', width: 70, height: 20, justifyContent: 'center', flexDirection: 'row' }} onPress={() => { }}>
                        <MaterialCommunityIcons name='car' size={14} style={{ color: '#fff' }} />
                        <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold', paddingLeft: 10 }}>装 车</Text>
                    </Button>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 0.5, borderColor: '#a8a8a8', alignItems: 'center' }}>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='car' size={14} style={{ color: '#8c989f' }} />
                            <Text style={{ fontSize: 11, paddingLeft: 10 }}>VIN码：12345678901234567</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>一汽大众</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                            <Icon name='ios-close-circle' style={{ color: '#fe8a95', fontSize: 26 }} />
                            <Icon name='ios-arrow-dropright-circle' style={{ color: '#00cade', marginLeft: 10, fontSize: 26 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 0.5, borderColor: '#a8a8a8', alignItems: 'center' }}>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='car' size={14} style={{ color: '#8c989f' }} />
                            <Text style={{ fontSize: 11, paddingLeft: 10 }}>VIN码：12345678901234567</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>一汽大众</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                            <Icon name='ios-close-circle' style={{ color: '#fe8a95', fontSize: 26 }} />
                            <Icon name='ios-arrow-dropright-circle' style={{ color: '#00cade', marginLeft: 10, fontSize: 26 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 0.5, borderColor: '#a8a8a8', alignItems: 'center' }}>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='car' size={14} style={{ color: '#8c989f' }} />
                            <Text style={{ fontSize: 11, paddingLeft: 10 }}>VIN码：12345678901234567</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>一汽大众</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                            <Icon name='ios-close-circle' style={{ color: '#fe8a95', fontSize: 26 }} />
                            <Icon name='ios-arrow-dropright-circle' style={{ color: '#00cade', marginLeft: 10, fontSize: 26 }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}