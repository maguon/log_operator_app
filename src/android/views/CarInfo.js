import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions
} from 'react-native'

const window = Dimensions.get('window')

export default class CarInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>VIN码：<Text style={{fontWeight:'100'}}>12345678901234567</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>品牌：<Text style={{fontWeight:'100'}}>东风日产</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>发动机号：<Text style={{fontWeight:'100'}}>123456789</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>生产日期：<Text style={{fontWeight:'100'}}>2017-02-25</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>起始地城市：<Text style={{fontWeight:'100'}}>大连</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>委托方：<Text style={{fontWeight:'100'}}>2017-02-25</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>目的地城市：<Text style={{fontWeight:'100'}}>大连</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>经销商：<Text style={{fontWeight:'100'}}>2017-02-25</Text></Text>
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