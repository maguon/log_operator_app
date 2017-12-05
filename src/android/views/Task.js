import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as taskAction from '../../actions/TaskAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

class Task extends Component {
    constructor(props) {
        super(props)
        this.initView=this.initView.bind(this)
    }

    static defaultProps = {
        initParam: {
            driverInfo: {
                userId: 93
            }
        }
    }

    componentDidMount() {
        this.props.getDriverCommandListWaiting()
        this.initView()

    }

    initView(){
        InteractionManager.runAfterInteractions(() => this.props.getDriverCommandList({
            getDriverId: {
                requiredParam: {
                    userId: this.props.initParam.driverInfo.userId
                }
            },
            getDriverCommandList: {
                OptionalParam: {
                    baseAddrId: this.props.settingReducer.data.baseAddrId,
                    loadTaskStatus: '1'
                }
            }
        }))
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        const { isPopRefresh } = nextProps
        if (isPopRefresh) {
            this.initView()
            Actions.refresh({ isPopRefresh: !isPopRefresh })
        }
    }


    render() {
        const { data: { commandList, driverInfo }, getDriverCommandList } = this.props.taskReducer
        if (getDriverCommandList.isResultStatus == 1) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator
                        animating={getDriverCommandList.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#a8a8a8' }} onPress={() => { Actions.driverInfo({ initParam: { driverInfo } }) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <MaterialCommunityIcons name='account' size={12} color='#aaa' />
                                <Text style={{ color: '#00cade', fontWeight: 'bold', paddingLeft: 5 }}>{driverInfo.drive_name ? `${driverInfo.drive_name}` : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <MaterialCommunityIcons name='phone' size={12} color='#aaa' />
                                <Text style={{ fontSize: 11, paddingLeft: 5 }}>{driverInfo.tel ? `${driverInfo.tel}` : ''}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <MaterialCommunityIcons name='truck-delivery' size={12} color='#aaa' />
                                <Text style={{ fontSize: 11, paddingLeft: 5 }}>货车牌号：{driverInfo.truck_num ? `${driverInfo.truck_num}` : ''}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#fafafa', flex: 1, padding:5 }}>
                        <FlatList
                            data={commandList}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity key={index} style={{ borderWidth: 0.5, borderColor: '#a8a8a8', margin:5}} onPress={() => Actions.command({ initParam: { taskInfo: item } })}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eff3f5', padding: 10, justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <MaterialCommunityIcons name='truck-delivery' size={20} color='#00cade' />
                                                <Text style={{ paddingLeft: 10, fontWeight: 'bold', color: '#8c989f' }}>{item.city_route_start ? `${item.city_route_start}` : ''}->{item.city_route_end ? `${item.city_route_end}` : ''}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ paddingLeft: 10, fontSize: 11, color: '#8c989f' }}>指定编号：{item.id ? `${item.id}` : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 11, color: '#8c989f' }}>计划执行时间：{item.task_plan_date ? `${moment(item.task_plan_date).format('YYYY-MM-DD')}` : ''}</Text>
                                            <Text style={{ fontSize: 11, color: '#8c989f' }}>指定装载：{item.plan_count ? `${item.plan_count}` : ''}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }} />
                    </View>
                </View>
            )
        }

    }
}


const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        taskReducer: state.taskReducer,
        settingReducer: state.settingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverCommandListWaiting: () => {
        dispatch(taskAction.getDriverCommandListWaiting())
    },
    getDriverCommandList: (param) => {
        dispatch(taskAction.getDriverCommandList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)