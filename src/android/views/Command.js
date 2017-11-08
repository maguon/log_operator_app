import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableNativeFeedback,
    InteractionManager,
    ToastAndroid
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'native-base'
import * as commandAction from '../../actions/CommandAction'
import { connect } from 'react-redux'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

class Command extends Component {
    constructor(props) {
        super(props)
        this.renderListHeader = this.renderListHeader.bind(this)
        this.renderListItem = this.renderListItem.bind(this)
        this.cancelCommand = this.cancelCommand.bind(this)
        this.carry = this.carry.bind(this)
    }


    componentDidMount() {
        this.props.getCommandListWaiting()
        const { taskInfo } = this.props.initParam
        InteractionManager.runAfterInteractions(() => this.props.getCommandList({
            OptionalParam: {
                dpRouteTaskId: taskInfo.id
            }
        }))
    }

    componentWillReceiveProps(nextProps) {

        const { commandList } = nextProps.commandReducer.data
        const command = commandList.find(item => item.cancelCommand.isResultStatus == 2)
        if (command) {
            ToastAndroid.show('取消成功！', ToastAndroid.SHORT)
            this.props.removeCancelCommand(command.data.id)
        }
    }


    cancelCommand(item) {
        InteractionManager.runAfterInteractions(() => this.props.cancelCommand({
            requiredParam: {
                dpRouteLoadTaskId: item.data.id,
                userId: 38,
                loadTaskStatus: 8
            }
        }))
    }

    carry(param) {
        Actions.cars({ initParam: { commandInfo: param.data } })
    }

    renderListHeader() {
        const { taskInfo } = this.props.initParam
        return (
            <View style={{ padding: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                <View>
                    <Text style={{ fontSize: 11, color: '#8c989f' }}>指令编号：{taskInfo.id ? `${taskInfo.id}` : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <MaterialCommunityIcons name='map-marker-multiple' size={20} color='#00cade' />
                    <Text style={{ paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }}>{taskInfo.city_route_start ? `${taskInfo.city_route_start}` : ''} -> {taskInfo.city_route_end ? `${taskInfo.city_route_end}` : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='clock' size={12} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>指令时间：{taskInfo.task_plan_date ? `${moment(taskInfo.task_plan_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='account' size={12} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>指令调度：{taskInfo.route_op_name ? `${taskInfo.route_op_name}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='clock' size={12} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>执行时间：{taskInfo.task_start_date ? moment(`${taskInfo.task_start_date}`).format('YYYY-MM-DD HH:mm') : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='car' size={12} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>计划运送：{taskInfo.plan_count ? `${taskInfo.plan_count}` : ''}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderListItem(item, index) {
        return (
            <View key={index} style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#eee' }}>
                <View>
                    <Text style={{ color: '#8c989f', fontWeight: 'bold' }}>{item.data.city_name ? `${item.data.city_name}` : ''} - {item.data.short_name ? `${item.data.short_name}` : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View>
                        <Text style={{ fontSize: 11, color: '#8c989f' }}>计划装车：{item.data.plan_count ? `${item.data.plan_count}` : '0'}</Text>
                    </View>
                    {item.cancelCommand.isResultStatus == 1 ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 110 }}>
                        <ActivityIndicator
                            animating={true}
                            style={{ height: 20, alignSelf: 'center' }}
                            size="small"
                        /></View> : <View style={{ flexDirection: 'row' }}><View>
                            <Button small rounded style={{ backgroundColor: '#fe8a95', width: 50, height: 20, justifyContent: 'center' }} onPress={() => this.cancelCommand(item)}>
                                <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>取 消</Text>
                            </Button>
                        </View>
                            <View style={{ paddingLeft: 10 }}>
                                <Button small rounded style={{ backgroundColor: '#00cade', width: 50, height: 20, justifyContent: 'center' }} onPress={() => this.carry(item)}>
                                    <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>装 车</Text>
                                </Button>
                            </View>
                        </View>}
                </View>
            </View>
        )
    }

    render() {
        const { commandList } = this.props.commandReducer.data
        const { getCommandList } = this.props.commandReducer
        if (getCommandList.isResultStatus == 1) {
            return (
                <View style={{ flex: 1 }}>
                    {this.renderListHeader()}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator
                            animating={getCommandList.isResultStatus == 1}
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
                        data={commandList}
                        ListHeaderComponent={this.renderListHeader}
                        renderItem={({ item, index }) => this.renderListItem(item, index)} />
                </View>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        commandReducer: state.commandReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCommandList: (param) => {
        dispatch(commandAction.getCommandList(param))
    },
    getCommandListWaiting: () => {
        dispatch(commandAction.getCommandListWaiting())
    },
    cancelCommand: (param) => {
        dispatch(commandAction.cancelCommand(param))
    },
    removeCancelCommand: (param) => {
        dispatch(commandAction.removeCancelCommand(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Command)