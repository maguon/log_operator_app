import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    InteractionManager,
    ActivityIndicator,
    FlatList
} from 'react-native'

import { connect } from 'react-redux'
import * as carInfoAction from '../../actions/CarInfoAction'
import moment from 'moment'
import ImageItem from '../components/ForFlatLast/ImageItem'
import { file_host } from '../../config/Host'

const window = Dimensions.get('window')

class CarInfo extends Component {
    constructor(props) {
        super(props)
        this.renderListHeader = this.renderListHeader.bind(this)
    }

    componentDidMount() {
        this.props.getCarInfoWaiting()
        const { user } = this.props.userReducer.data
        InteractionManager.runAfterInteractions(() => this.props.getCarInfo({
            OptionalParam: { vin: this.props.initParam.vin },
            requiredParam: {
                userId: user.userId,
                carId: this.props.initParam.carId
            }
        }))
    }

    renderListHeader() {
        const { carInfo } = this.props.carInfoReducer.data
        return (
            <View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>VIN：<Text style={{ fontWeight: '100' }}>{carInfo.vin ? `${carInfo.vin}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>品牌：<Text style={{ fontWeight: '100' }}>{carInfo.make_name ? `${carInfo.make_name}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>发动机号：<Text style={{ fontWeight: '100' }}>{carInfo.engine_num ? `${carInfo.engine_num}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>起始地城市：<Text style={{ fontWeight: '100' }}>{carInfo.route_start ? `${carInfo.route_start}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>委托方：<Text style={{ fontWeight: '100' }}>{carInfo.entrust_name ? `${carInfo.entrust_name}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>目的地城市：<Text style={{ fontWeight: '100' }}>{carInfo.route_end ? `${carInfo.route_end}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>经销商：<Text style={{ fontWeight: '100' }}>{carInfo.receive_name ? `${carInfo.receive_name}` : ''}</Text></Text>
                </View>
            </View>
        )

    }

    renderImage(item, i) {
        const numColumns = 2
        if (i % numColumns == 1) {
            return <ImageItem
                key={i}
                imageUrl={`${file_host}/image/${item.url}`}
                containerStyle={{ marginLeft: 5, marginRight: 10 }}
            />
        } else {
            return <ImageItem
                key={i}
                imageUrl={`${file_host}/image/${item.url}`}
                containerStyle={{ marginLeft: 10, marginRight: 5 }}
            />
        }
    }

    render() {
        const { carInfo, imageList } = this.props.carInfoReducer.data
        const { getCarInfo } = this.props.carInfoReducer
        // console.log('this.props.initParam', this.props.initParam)
        // console.log('this.props.carInfoReducer.carInfo', carInfo)
        // console.log('this.props.carInfoReducer.imageList', imageList)
        if (getCarInfo.isResultStatus == 1) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator
                            animating={getCarInfo.isResultStatus == 1}
                            style={{ height: 80 }}
                            size="large"
                        />
                    </View>
                </View>)
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={imageList}
                        renderItem={({ item, index }) => this.renderImage(item, index)}
                        ListHeaderComponent={this.renderListHeader} 
                        ListFooterComponent={<View style={{height:10}}/>}/>
                </View>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        carInfoReducer: state.carInfoReducer,
        userReducer: state.userReducer
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