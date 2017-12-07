import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator,
    Button
} from 'react-native'
import { connect } from 'react-redux'
import * as requirementListAction from '../../actions/RequirementListAction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

class RequirementList extends Component {
    constructor(props) {
        super(props)
        this.getRequirementListMore = this.getRequirementListMore.bind(this)
    }

    componentDidMount() {
        this.props.getRequirementListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getRequirementList({ OptionalParam: { ...this.props.initParam, start: 0, size: 10 } }))
    }


    getRequirementListMore() {
        const { requirementList, listLoadComplete } = this.props.requirementListReducer.data
        const { getRequirementListMore } = this.props.requirementListReducer
        if (!listLoadComplete && getRequirementListMore.isResultStatus != 1) {
            this.props.getRequirementListMoreWaiting()
            this.props.getRequirementListMore({ OptionalParam: { ...this.props.initParam, start: requirementList.length, size: 10 } })
        }
    }

    render() {
        const { requirementList } = this.props.requirementListReducer.data
        const { getRequirementList, getRequirementListMore } = this.props.requirementListReducer
        if (getRequirementList.isResultStatus == 1) {
            return (
                <View style={{ borderColor: '#dedede', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getRequirementList.isResultStatus == 1}
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
                        onEndReached={this.getRequirementListMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={getRequirementListMore.isResultStatus == 1 ? <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator
                                animating={getRequirementListMore.isResultStatus == 1}
                                style={{ height: 20 }}
                                size="large"
                            />
                            <Text style={{ fontSize: 11, paddingLeft: 10 }}>正在加载……</Text>
                        </View> : <View style={{ height: 10 }} />}
                        data={[...requirementList]}
                        renderItem={({ item, index }) => <TouchableOpacity key={index}
                            onPress={() => Actions.requirementInfo({ initParam: { requirementInfo: item } })}>
                            <View style={{ borderWidth: 1, borderColor: '#dedede', marginHorizontal: 10, marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eff3f5', padding: 10, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name='truck-delivery' size={20} color='#00cade' />
                                        <Text style={{ paddingLeft: 5, fontWeight: 'bold', color: '#8c989f' }}>{item.route_start ? `${item.route_start}` : ''}</Text>
                                        <MaterialCommunityIcons name='ray-start-arrow' size={18} style={{ paddingLeft: 5, color: '#8c989f' }} />
                                        <Text style={{ paddingLeft: 5, fontWeight: 'bold', color: '#8c989f' }}>{item.route_end ? `${item.route_end}` : ''}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 11, color: '#8c989f' }}>{item.created_on ? moment(`${item.created_on}`).format('YYYY-MM-DD HH:mm') : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 11, color: '#8c989f' }}>指令时间：{item.date_id ? moment(`${item.date_id}`).format('YYYY-MM-DD') : ''}</Text>
                                    <Text style={{ fontSize: 11, color: '#8c989f' }}>派送车辆：<Text style={{ color: '#00cade' }}>{item.pre_count ? `${item.pre_count}` : ''}</Text></Text>
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
        requirementListReducer: state.requirementListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRequirementList: (param) => {
        dispatch(requirementListAction.getRequirementList(param))
    },
    getRequirementListWaiting: () => {
        dispatch(requirementListAction.getRequirementListWaiting())
    },
    getRequirementListMore: (param) => {
        dispatch(requirementListAction.getRequirementListMore(param))
    },
    getRequirementListMoreWaiting: () => {
        dispatch(requirementListAction.getRequirementListMoreWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(RequirementList)