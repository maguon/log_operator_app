import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback,
    InteractionManager,
    ActivityIndicator,
} from 'react-native'
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import * as taskInfoAtWorkAction from '../../actions/TaskInfoAtWorkAction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import * as RouterDirection from '../../util/RouterDirection'

class TaskInfoAtWork extends Component {
    constructor(props) {
        super(props)
        this.renderHeader = this.renderHeader.bind(this)
        this.renderItem = this.renderItem.bind(this)
    }

    componentDidMount() {
        this.props.getRouteLoadTaskDetailWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getRouteLoadTaskDetail({ requiredParam: { routeLoadTaskId: this.props.initParam.taskInfo.id } }))
    }

    renderHeader() {
        const { taskInfo } = this.props.initParam
        return (<View>
            <View style={{ padding: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                <View >
                    <Text style={{ fontSize: 11, color: '#8c989f' }}>指令编号：{taskInfo.dp_route_task_id ? `${taskInfo.dp_route_task_id}` : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map-marker-multiple' size={20} color='#00cade' />
                        <Text style={{ paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }}>大连 -> {taskInfo.city_name ? `${taskInfo.city_name}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='account' size={16} color='#aaa' />
                        <Text style={{ paddingLeft: 5, color: '#00cade' }}>{taskInfo.drive_name ? `${taskInfo.drive_name}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map-marker' size={13} color='#aaa' />
                        <Text style={{ fontSize: 13, paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }}>装车地：{taskInfo.addr_name ? `${taskInfo.addr_name}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map-marker' size={13} color='#aaa' />
                        <Text style={{ fontSize: 13, paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }}>送达地：{taskInfo.short_name ? `${taskInfo.short_name}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='phone' size={11} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>电话：{taskInfo.tel ? `${taskInfo.tel}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='truck' size={11} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>货车牌号：{taskInfo.truck_num ? `${taskInfo.truck_num}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='clock' size={11} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>装车时间：{taskInfo.load_date ? `${moment(taskInfo.load_date).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='account' size={11} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>指令调度：{taskInfo.task_op_name ? `${taskInfo.task_op_name}` : ''}</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='clock' size={11} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>执行时间：2017-09-06</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: '#00cade' }}>
                <Text style={{ fontSize: 11 }}>计划运送：{taskInfo.plan_count ? `${taskInfo.plan_count}` : ''}</Text>
                <Text style={{ fontSize: 11 }}>实际运送：<Text style={{ color: '#00cade' }}>{taskInfo.real_count ? `${taskInfo.real_count}` : ''}</Text></Text>
            </View>
        </View>)
    }

    renderItem(item, index) {
        return (
            <TouchableNativeFeedback key={index}
                onPress={() => RouterDirection.carInfo(this.props.parent)({ initParam: { carId: item.car_id,vin:item.vin } })}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: '#eee', alignItems: 'center' }}>
                    <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='car' size={14} style={{ color: '#8c989f' }} />
                        <Text style={{ fontSize: 11, paddingLeft: 10 }}>VIN：{item.vin ? `${item.vin}` : ''}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 11 }}>{item.make_name ? `${item.make_name}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                        <Icon name='ios-arrow-forward' style={{ fontSize: 14, color: '#8c989f' }} />
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    render() {
        const { routeLoadTaskDetail } = this.props.taskInfoAtWorkReducer.data
        const { getRouteLoadTaskDetail } = this.props.taskInfoAtWorkReducer
        if (getRouteLoadTaskDetail.isResultStatus == 1) {
            return (
                <View style={{ borderColor: '#dedede', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getRouteLoadTaskDetail.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={this.renderHeader()}
                        data={routeLoadTaskDetail}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                    />
                </View>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        taskInfoAtWorkReducer: state.taskInfoAtWorkReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRouteLoadTaskDetail: (param) => {
        dispatch(taskInfoAtWorkAction.getRouteLoadTaskDetail(param))
    },
    getRouteLoadTaskDetailWaiting: () => {
        dispatch(taskInfoAtWorkAction.getRouteLoadTaskDetailWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoAtWork)