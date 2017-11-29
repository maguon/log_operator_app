import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import * as commandListAction from '../../actions/CommandListAction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import * as RouterDirection from '../../util/RouterDirection'

class CommandList extends Component {
    constructor(props) {
        super(props)
        this.getCommandListMore = this.getCommandListMore.bind(this)
    }

    componentDidMount() {
        this.props.getCommandListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getCommandList({ OptionalParam: { ...this.props.initParam, start: 0, size: 10 } }))
    }


    getCommandListMore() {
        const { commandList, listLoadComplete } = this.props.commandListReducer.data
        const { getCommandListMore } = this.props.commandListReducer
        if (!listLoadComplete && getCommandListMore.isResultStatus != 1) {
            this.props.getCommandListMoreWaiting()
            this.props.getCommandListMore({ OptionalParam: { ...this.props.initParam, start: commandList.length, size: 10 } })
        }
    }

    render() {
        const { commandList } = this.props.commandListReducer.data
        const { getCommandList, getCommandListMore } = this.props.commandListReducer
        if (getCommandList.isResultStatus == 1) {
            return (
                <View style={{ borderColor: '#dedede', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getCommandList.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ backgroundColor: '#fafafa', flex: 1 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onEndReached={this.getCommandListMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={getCommandListMore.isResultStatus == 1 ? <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator
                                animating={getCommandListMore.isResultStatus == 1}
                                style={{ height: 20 }}
                                size="large"
                            />
                            <Text style={{ fontSize: 11, paddingLeft: 10 }}>正在加载……</Text>
                        </View> : <View style={{ height: 10 }} />}
                        data={[...commandList]}
                        renderItem={({ item, index }) => <TouchableOpacity key={index}
                            onPress={() => Actions.taskInfoAtWork({ initParam: { taskInfo: item } })}>
                            <View style={{ borderWidth: 1, borderColor: '#dedede', marginHorizontal: 10, marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialCommunityIcons name='truck-delivery' size={14} color='#00cade' />
                                        <Text style={{ fontSize: 11, paddingLeft: 10, fontWeight: 'bold', color: '#8c989f' }}>{item.addr_name ? `${item.addr_name}` : ''} -> {item.city_name ? `${item.city_name}` : ''} {item.short_name ? `${item.short_name}` : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontSize: 10, color: '#8c989f' }}>司机：{item.drive_name ? `${item.drive_name}` : ''}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, color: '#8c989f' }}>货车：{item.truck_num ? `${item.truck_num}` : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 10, paddingBottom: 10, justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontSize: 10, color: '#8c989f' }}>实际装车：<Text style={{ color: '#00cade' }}>{item.car_count || item.car_count == 0 ? `${item.car_count}` : ''}</Text></Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, color: '#8c989f' }}>{item.created_on ? `${moment(`${item.created_on}`).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>}
                    />
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        commandListReducer: state.commandListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCommandList: (param) => {
        dispatch(commandListAction.getCommandList(param))
    },
    getCommandListWaiting: () => {
        dispatch(commandListAction.getCommandListWaiting())
    },
    getCommandListMore: (param) => {
        dispatch(commandListAction.getCommandListMore(param))
    },
    getCommandListMoreWaiting: () => {
        dispatch(commandListAction.getCommandListMoreWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(CommandList)