import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    InteractionManager
} from 'react-native'

import { connect } from 'react-redux'
import * as carInfoAction from '../../actions/CarInfoAction'
import moment from 'moment'

const window = Dimensions.get('window')

class CarInfo extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarInfoWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getCarInfo({ OptionalParam: { vin: this.props.initParam.vin } }))
    }

    render() {
        let carInfo =this.props.carInfoReducer.data.carInfo
        console.log('this.props.carInfoReducer.carInfo',carInfo)
        return (
            <View style={{ flex: 1 }}>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>VIN码：<Text style={{ fontWeight: '100' }}>{carInfo.vin ? `${carInfo.vin}` : ''}</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>品牌：<Text style={{fontWeight:'100'}}>{carInfo.make_name ? `${carInfo.make_name}` : ''}</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>发动机号：<Text style={{fontWeight:'100'}}>{carInfo.engine_num ? `${carInfo.engine_num}` : ''}</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>起始地城市：<Text style={{fontWeight:'100'}}>{carInfo.route_start ? `${carInfo.route_start}` : ''}</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>委托方：<Text style={{fontWeight:'100'}}>{carInfo.entrust_name ? `${carInfo.entrust_name}` : ''}</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>目的地城市：<Text style={{fontWeight:'100'}}>{carInfo.route_end ? `${carInfo.route_end}` : ''}</Text></Text>
                </View>
                <View style={{padding:10, borderBottomWidth: 0.5, borderColor: '#ccc'}}>
                    <Text style={{fontSize:12,fontWeight:'bold'}}>经销商：<Text style={{fontWeight:'100'}}>{carInfo.receive_name ? `${carInfo.receive_name}` : ''}</Text></Text>
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


const mapStateToProps = (state) => {
    return {
        carInfoReducer: state.carInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarInfo: (param) => {
        dispatch(carInfoAction.getCarInfo(param))
    },
    getCarInfoWaiting: () => {
        dispatch(carInfoAction.getCarInfoWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(CarInfo)