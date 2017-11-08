import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    TouchableNativeFeedback
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as homeAction from '../../../actions/HomeAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

class Home extends Component {
    constructor(props) {
        super(props)
        this.renderListHeader = this.renderListHeader.bind(this)
        this.getTaskListMore = this.getTaskListMore.bind(this)
    }

    componentDidMount() {
        this.props.getHomeDataWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getHomeData({
            getCarriedCount: {
                OptionalParam: {
                    loadDateStart: '2017-10-01',
                    loadDateEnd: '2017-10-30',
                    loadTaskStatusArr: '3,7,9'
                }
            },
            getTaskList: {
                OptionalParam: {
                     baseAddrId: 102,
                    start: 0,
                    size: 12
                }
            }
        }))
    }



    getTaskListMore() {
        const { taskList, listLoadComplete } = this.props.homeReducer.data
        const { getTaskListMore } = this.props.homeReducer
        if (!listLoadComplete && getTaskListMore.isResultStatus != 1) {
            this.props.getTaskListMore({
                OptionalParam: {
                    baseAddrId: 102,
                    start: taskList.length,
                    size: 12
                }
            })
        }
    }


    renderListHeader() {
        const { carriedCount } = this.props.homeReducer.data
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#00cade', paddingVertical: 10, borderTopWidth: 0.2, borderColor: '#00e5f6' }}>
                <View style={{ flex: 1, flexDirection: 'row', borderRightWidth: 0.2, borderColor: '#00e5f6' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='truck' size={40} color='#fff' />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 12 }}>本月装车次</Text>
                        <Text style={{ color: '#fefcc1', fontWeight: 'bold' }}>{carriedCount.load_number ? `${carriedCount.load_number}` : '0'}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='car-side' size={40} color='#fff' />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 12 }}>本月装车量</Text>
                        <Text style={{ color: '#fefcc1', fontWeight: 'bold' }}>{carriedCount.load_count ? `${carriedCount.load_count}` : '0'}</Text>
                    </View>
                </View>
            </View>
        )
    }


    renderListItem(item, index) {
        return (
            <TouchableNativeFeedback key={index} onPress={() => Actions.command({ initParam: { taskInfo: item } })} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ borderWidth: 1, borderColor: '#eee', marginHorizontal: 10, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='truck-delivery' size={20} color='#00cade' />
                            <Text style={{ paddingLeft: 10, fontWeight: 'bold', color: '#8c989f' }}>{item.city_route_start ? `${item.city_route_start}` : ''} -> {item.city_route_end ? `${item.city_route_end}` : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='account' size={20} color='#00cade' />
                            <Text style={{ paddingLeft: 10, fontWeight: 'bold', color: '#8c989f' }}>{item.drive_name ? `${item.drive_name}` : ''}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 11, color: '#8c989f' }}>执行时间：{item.task_start_date ? moment(`${item.task_start_date}`).format('YYYY-MM-DD HH:mm') : ''}</Text>
                        <Text style={{ fontSize: 11, color: '#8c989f' }}>指定装载：{item.plan_count ? `${item.plan_count}` : ''}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    render() {
        const { carriedCount, taskList, listLoadComplete } = this.props.homeReducer.data
        const { getHomeData, getTaskListMore } = this.props.homeReducer
        if (getHomeData.isResultStatus == 1) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#00cade', paddingVertical: 10, borderTopWidth: 0.2, borderColor: '#00e5f6' }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderRightWidth: 0.2, borderColor: '#00e5f6' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <MaterialCommunityIcons name='truck' size={40} color='#fff' />
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 12 }}>本月装车次</Text>
                                <Text style={{ color: '#fefcc1', fontWeight: 'bold' }}>----</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <MaterialCommunityIcons name='car-side' size={40} color='#fff' />
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 12 }}>本月装车量</Text>
                                <Text style={{ color: '#fefcc1', fontWeight: 'bold' }}>----</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fafafa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator
                            animating={getHomeData.isResultStatus == 1}
                            style={{ height: 80 }}
                            size="large"
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        data={taskList}
                        onEndReached={this.getTaskListMore}
                        ListHeaderComponent={this.renderListHeader}
                        ListFooterComponent={getTaskListMore.isResultStatus == 1 ? <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator
                                animating={getTaskListMore.isResultStatus == 1}
                                style={{ height: 20 }}
                                size="large"
                            />
                            <Text style={{ fontSize: 11, paddingLeft: 10 }}>正在加载……</Text>
                        </View> : <View style={{ height: 10 }} />}
                        renderItem={({ item, index }) => this.renderListItem(item, index)} />
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getHomeData: (param) => {
        dispatch(homeAction.getHomeData(param))
    },
    getHomeDataWaiting: () => {
        dispatch(homeAction.getHomeDataWaiting())
    },
    getTaskListMore: (param) => {
        dispatch(homeAction.getTaskListMore(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)