import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ToastAndroid
} from 'react-native'
import Camera from 'react-native-camera'
import { Actions } from 'react-native-router-flux'

export default class QRCodeScreen extends Component {
    constructor(props) {
        super(props)
        this._onBarCodeRead=this._onBarCodeRead.bind(this)
    }

    _onBarCodeRead(result) {
        try{
            if(result.type=="QR_CODE"){
                const res=JSON.parse(result.data)
                if(res.userId){
                    Actions.pop()
                    this.props.onSelectQRCode(res)
                }else{
                    ToastAndroid.show(`二维码无法识别，请重试！`, ToastAndroid.SHORT)
                }
            }
        }catch(err){
            ToastAndroid.show(`二维码无法识别，请重试！`, ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle} />
                </View>
            </Camera>
        )
    }
}

var styles = StyleSheet.create({
    camera: {
        height: 568,
        alignItems: 'center',
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },

    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 15,
        width: 100,
        bottom: 10,
    },
    cancelButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0097CE',
    },
});