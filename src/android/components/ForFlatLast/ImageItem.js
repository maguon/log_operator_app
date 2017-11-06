import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button, Icon, Spinner } from 'native-base'
import { isEqualKeys, isEqualOwnPropertys } from '../../../util/IsObjectValueEqual'

const window = Dimensions.get('window')

const styles = {
    spinner: {
        position: 'absolute',
        alignSelf: 'center'
    },
    container: {
        borderColor: '#ccc',
        justifyContent: 'center',
        borderWidth: 1,
        marginTop: 10
    },
    image: {
        flex: 1
    }
}

export default class CarCameraItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spinnerDisplay: true
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        //判断props与state中可枚举属性值是否相同，如果相同则不刷新组件
        if (isEqualKeys(this.props, nextProps) && isEqualKeys(this.state, nextState)) {
            return true
        } else {
            return true
        }
    }

    static defaultProps = {
        imageUrl: 'http://stg.myxxjs.com:9002/api/image/59fa839a100f67405a123c23', //图片地址
        containerStyle: {}, //View组件的样式以增加，同名替换的方式设置
        imageStyle: {},//Image组件的样式以增加，同名替换的方式设置
        spinnerStyle: {},//Spinner组件的样式以增加，同名替换的方式设置
        spinnerProps: {},//Spinner组件的属性以增加，同名替换的方式设置
        numColumns: 2//多列布局中的列数以增加，同名替换的方式设置
    }

    _getContainerWidth() {//通过this.props.numColumns设置的列数计算每列View组件的宽度
        return (window.width - (this.props.numColumns + 1) * 10) / this.props.numColumns
    }

    _getContainerHeight() {//通过_getContainerWidth()设置的列数计算每列View组件的高度(默认图片显示比例16:9)
        return this._getContainerWidth() / 16 * 9
    }

    render() {
        return <View style={{ ...styles.container, width: this._getContainerWidth(), height: this._getContainerHeight(), ...this.props.containerStyle }}>
            <Image source={{ uri: this.props.imageUrl }}
                style={{ ...styles.image, ...this.props.imageStyle }}
                onLoadStart={() => { this.setState({ spinnerDisplay: true }) }}
                LonLoad={() => { this.setState({ spinnerDisplay: false }) }}
                onLoadEnd={() => { this.setState({ spinnerDisplay: false }) }}
            />
            <Spinner
                animating={this.state.spinnerDisplay}
                style={{ ...styles.spinner, ...this.props.spinnerStyle }}
                color={'#00cade'}
                {...this.props.spinnerProps}
            />
        </View>
    }
}




