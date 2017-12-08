import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as requirementInfoAction from '../../actions/RequirementInfoAction'

class RequirementInfo extends Component {
    constructor(props) {
        super(props)
        this.renderHeader = this.renderHeader.bind(this)
        this.renderEmpty = this.renderEmpty.bind(this)
        this.renderCommandLsit = this.renderCommandLsit.bind(this)
        this.initView = this.initView.bind(this)
    }

    componentDidMount() {
        this.props.getRequirementInfoCommandListWaiting()
        this.initView()
    }

    initView() {
        const { requirementInfo } = this.props.initParam
        InteractionManager.runAfterInteractions(() => this.props.getRequirementInfoCommandList({
            OptionalParam: {
                dpDemandId: requirementInfo.id
            }
        }))
    }

    renderEmpty() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ paddingTop: 50 }}>暂无装车任务</Text>
            </View>
        )
    }

    renderHeader() {
        const { requirementInfo } = this.props.initParam
        return (<View style={{ flex: 1 }}>
            <View style={{ padding: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map-marker-multiple' size={20} color='#00cade' />
                        <Text style={{ paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }}>{requirementInfo.route_start ? `${requirementInfo.route_start}` : ''}</Text>
                        <MaterialCommunityIcons name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
                        <Text style={{ paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }}>{requirementInfo.route_end ? `${requirementInfo.route_end}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {requirementInfo.demand_status == 0 && <Text style={{ paddingLeft: 5, color: '#00cade' }}>已取消</Text>}
                        {requirementInfo.demand_status == 1 && <Text style={{ paddingLeft: 5, color: '#00cade' }}>未完成</Text>}
                        {requirementInfo.demand_status == 2 && <Text style={{ paddingLeft: 5, color: '#00cade' }}>完成</Text>}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map-marker' size={13} color='#aaa' />
                        <Text style={{ fontSize: 13, paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }}>装车地：{requirementInfo.addr_name ? `${requirementInfo.addr_name}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map-marker' size={13} color='#aaa' />
                        <Text style={{ fontSize: 13, paddingLeft: 5, color: '#8c989f', fontWeight: 'bold' }}>送达地：{requirementInfo.short_name ? `${requirementInfo.short_name}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='truck' size={11} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>计划运送：{requirementInfo.pre_count ? `${requirementInfo.pre_count}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='clock' size={11} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>生成时间：{requirementInfo.created_on ? moment(requirementInfo.created_on).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='account' size={11} color='#aaa' />
                        <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8c989f' }}>计划执行时间：{requirementInfo.date_id ? moment(`${requirementInfo.date_id}`).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#b6c6cd', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 11, color: '#fff' }}>已派发：{requirementInfo.plan_count ? `${requirementInfo.plan_count}` : ''}</Text>
                <Text style={{ fontSize: 11, color: '#fff' }}>未派发：{`${requirementInfo.pre_count - requirementInfo.plan_count}`}</Text>
            </View>
        </View>)
    }


    renderCommandLsit({ item, index }) {
        return (
            <TouchableOpacity key={index} style={{ borderColor: '#eee', borderWidth: 1, marginHorizontal: 10, marginTop: 10 }}
                onPress={() => Actions.taskInfoAtWorkAtRequirementBlock({ initParam: { taskInfo: item } })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', backgroundColor: '#f3f6f8', padding: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='format-list-bulleted' size={20} color='#00cade' />
                        <Text style={{ fontSize: 11, paddingLeft: 5 }}>指令编号：{item.dp_route_task_id ? `${item.dp_route_task_id}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {item.load_task_status == 1 && <Text style={{ fontSize: 11, color: '#fb9d9f' }}>未装车</Text>}
                        {item.load_task_status == 3 && <Text style={{ fontSize: 11, color: '#00cade' }}>已装车</Text>}
                        {item.load_task_status == 7 && <Text style={{ fontSize: 11, color: '#00cade' }}>已到达</Text>}
                        {item.load_task_status == 9 && <Text style={{ fontSize: 11, color: '#00cade' }}>已完成</Text>}
                    </View>
                </View>
                <View style={{ padding: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                        <Text style={{ fontSize: 11 }}>计划装车：{item.plan_date ? `${moment(item.plan_date).format('YYYY-MM-DD')}` : ''}</Text>
                        <Text style={{ fontSize: 11 }}>指令调度：{item.task_op_name ? `${item.task_op_name}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                        <Text style={{ fontSize: 11 }}>货车司机：{item.drive_name ? `${item.drive_name}` : ''}</Text>
                        <Text style={{ fontSize: 11 }}>货车牌号：{item.truck_num ? `${item.truck_num}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                        <Text style={{ fontSize: 11 }}>计划运送：<Text style={{ color: '#00cade' }}>{item.plan_count ? `${item.plan_count}` : ''}</Text></Text>
                        <Text style={{ fontSize: 11 }}>实际运送：<Text style={{ color: '#00cade' }}>{item.real_count ? `${item.real_count}` : ''}</Text></Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { requirementInfo } = this.props.initParam
        const { data: { commandList }, getRequirementInfoCommandList } = this.props.requirementInfoReducer
        if (getRequirementInfoCommandList.isResultStatus == 1) {
            return (
                <View style={{ flex: 1 }}>
                    {this.renderHeader()}
                    <View style={{ flex: 1 }}>
                        <ActivityIndicator
                            animating={getRequirementInfoCommandList.isResultStatus == 1}
                            style={{ height: 80 }}
                            size="large"
                        />
                    </View>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={commandList}
                    ListHeaderComponent={this.renderHeader()}
                    ListEmptyComponent={this.renderEmpty()}
                    renderItem={this.renderCommandLsit} />
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        requirementInfoReducer: state.requirementInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRequirementInfoCommandList: (param) => {
        dispatch(requirementInfoAction.getRequirementInfoCommandList(param))
    },
    getRequirementInfoCommandListWaiting: () => {
        dispatch(requirementInfoAction.getRequirementInfoCommandListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(RequirementInfo)