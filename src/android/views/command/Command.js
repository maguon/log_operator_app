import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    InteractionManager,
    ToastAndroid,
    TouchableOpacity,
    Alert
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'native-base'
import * as commandAction from './CommandAction'
import { connect } from 'react-redux'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../GlobalStyles'

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
        InteractionManager.runAfterInteractions(this.props.getCommandList)
    }

    componentWillReceiveProps(nextProps) {
        const { commandList } = nextProps.commandReducer.data
        let command = commandList.find(item => item.cancelCommand.isResultStatus == 2)
        if (command) {
            ToastAndroid.show('取消成功！', ToastAndroid.SHORT)
            this.props.removeCancelCommand(command.data.id)
        } else {
            command = commandList.find(item => item.cancelCommand.isResultStatus == 4)
            if (command) {
                ToastAndroid.show(`${command.cancelCommand.failedMsg}`, ToastAndroid.SHORT)
            }
        }
    }


    cancelCommand(item) {
        const { user } = this.props.loginReducer.data
        InteractionManager.runAfterInteractions(() => this.props.cancelCommand({
            requiredParam: {
                dpRouteLoadTaskId: item.data.id,
                userId: user.uid
            }
        }))
    }

    carry(param) {
        const { truck_id } = this.props.taskInfo
        Actions.cars({ initParam: { commandInfo: { ...param.data, truck_id } } })
    }

    renderListHeader() {
        const { taskInfo } = this.props
        console.log('taskInfo',taskInfo)
        return (
            <View style={{ padding: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                <View>
                    <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>指令编号：{taskInfo.id ? `${taskInfo.id}` : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map-marker-multiple' size={20} color={styleColor} />
                        <Text style={[globalStyles.largeText, { paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }]}>{taskInfo.city_route_start ? `${taskInfo.city_route_start}` : ''}</Text>
                        <MaterialCommunityIcons name='ray-start-arrow' size={18} style={{ paddingLeft: 5, color: '#8c989f' }} />
                        <Text style={[globalStyles.largeText, { paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }]}>{taskInfo.city_route_end ? `${taskInfo.city_route_end}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='account-box' size={12} color='#aaa' />
                        <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8c989f' }]}>{taskInfo.drive_name ? `${taskInfo.drive_name}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='phone' size={12} color='#aaa' />
                        <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8c989f' }]}>电话：{taskInfo.mobile ? `${taskInfo.mobile}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='truck' size={12} color='#aaa' />
                        <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8c989f' }]}>货车牌号：{taskInfo.truck_num ? `${taskInfo.truck_num}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='clock' size={12} color='#aaa' />
                        <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8c989f' }]}>指令时间：{taskInfo.task_plan_date ? `${moment(taskInfo.task_plan_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='account' size={12} color='#aaa' />
                        <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8c989f' }]}>指令调度：{taskInfo.route_op_name ? `${taskInfo.route_op_name}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='clock' size={12} color='#aaa' />
                        <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8c989f' }]}>执行时间：{taskInfo.task_start_date ? moment(`${taskInfo.task_start_date}`).format('YYYY-MM-DD HH:mm') : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='car' size={12} color='#aaa' />
                        <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8c989f' }]}>计划运送：{taskInfo.plan_count ? `${taskInfo.plan_count}` : ''}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderListItem(item, index) {
        const { taskInfo } = this.props
        if (item.data.load_task_status == 3) {
            return (
                <TouchableOpacity onPress={() => this.carry(item)}>
                    <View key={index} style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#eee' }}>
                        <View>
                            <Text style={[globalStyles.largeText, { color: '#8c989f', fontWeight: 'bold' }]}>{item.data.city_name ? `${item.data.city_name}` : ''}{item.data.short_name ? `(${item.data.short_name})` : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                            <View>
                                <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>计划装车：{item.data.plan_count ? `${item.data.plan_count}` : '0'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>已装车</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.data.load_task_status == 7) {
            return (
                <TouchableOpacity onPress={() => this.carry(item)}>
                    <View key={index} style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#eee' }}>
                        <View>
                            <Text style={[globalStyles.largeText, { color: '#8c989f', fontWeight: 'bold' }]}>{item.data.city_name ? `${item.data.city_name}` : ''}{item.data.short_name ? `(${item.data.short_name})` : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                            <View>
                                <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>计划装车：{item.data.plan_count ? `${item.data.plan_count}` : '0'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>已送达</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <View key={index} style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#eee' }}>
                    <View>
                        <Text style={[globalStyles.largeText, { color: '#8c989f', fontWeight: 'bold' }]}>{item.data.city_name ? `${item.data.city_name}` : ''}{item.data.short_name ? `(${item.data.short_name})` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <View>
                            <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>计划装车：{item.data.plan_count ? `${item.data.plan_count}` : '0'}</Text>
                        </View>
                        {item.cancelCommand.isResultStatus == 1 && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 110 }}>
                            <ActivityIndicator
                                animating={true}
                                style={{ height: 20, alignSelf: 'center' }}
                                size="small" />
                        </View>}
                        {item.cancelCommand.isResultStatus != 1 && item.data.load_task_status == 1 && taskInfo.task_status >= 3 && <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Button small rounded style={{ backgroundColor: '#fe8a95', width: 50, height: 20, justifyContent: 'center' }} onPress={() => {
                                    Alert.alert(
                                        '提示',
                                        '您确定取消装车任务？',
                                        [
                                            { text: '取消', onPress: () => { }, style: 'cancel' },
                                            { text: '确定', onPress: () => this.cancelCommand(item) },
                                        ],
                                        { cancelable: false }
                                    )
                                }}>
                                    <Text style={[globalStyles.smallText, { color: '#fff', fontWeight: 'bold' }]}>取 消</Text>
                                </Button>
                            </View>
                            <View style={{ paddingLeft: 10 }}>
                                <Button small rounded style={{ backgroundColor: styleColor, width: 50, height: 20, justifyContent: 'center' }} onPress={() => this.carry(item)}>
                                    <Text style={[globalStyles.smallText, { color: '#fff', fontWeight: 'bold' }]}>查 看</Text>
                                </Button>
                            </View>
                        </View>}
                        {item.cancelCommand.isResultStatus != 1 && taskInfo.task_status < 3 && <View style={{ flexDirection: 'row' }}>
                            <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>未达到装车条件</Text>
                        </View>}
                        {/* {item.cancelCommand.isResultStatus != 1 && item.data.load_task_status == 8 && <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 11, color: '#8c989f' }}>已取消</Text>
                        </View>} */}
                    </View>
                </View >
            )
        }
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
                        keyExtractor={(item, index) => index}
                        data={commandList}
                        ListHeaderComponent={this.renderListHeader}
                        renderItem={({ item, index }) => this.renderListItem(item, index)} />
                </View>
            )
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        commandReducer: state.commandReducer,
        loginReducer: state.loginReducer,
        taskInfo: state.homeReducer.data.taskList.find(item => item.id == ownProps.initParam.taskInfo.id)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCommandList: () => {
        const { initParam: { taskInfo: { id } } } = ownProps
        dispatch(commandAction.getCommandList({ dpRouteTaskId: id }))
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