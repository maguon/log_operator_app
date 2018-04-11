import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import * as requirementListAction from './RequirementListAction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Container, Spinner, Thumbnail } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../GlobalStyles'


const RequirementList = props => {
    const { requirementListReducer: { data: { requirementList, isComplete }, getRequirementList }, requirementListReducer, getRequirementListMore } = props
    if (getRequirementList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container style={globalStyles.listBackgroundColor}>
                <FlatList
                    keyExtractor={(item, index) => index}
                    ListEmptyComponent={renderEmpty}
                    data={requirementList}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getRequirementList.isResultStatus == 2 && !isComplete) {
                            getRequirementListMore()
                        }
                    }}
                    ListFooterComponent={requirementListReducer.getRequirementListMore.isResultStatus == 1 ? ListFooterComponent : <View style={{ height: 10 }} />}
                    renderItem={({ item, index }) => renderListItem({
                        item,
                        index
                    })} />
            </Container>
        )
    }
}

const renderListItem = props => {
    const { item } = props
    return (
        <TouchableOpacity
            onPress={() => Actions.requirementInfo({ initParam: { requirementInfo: item } })}>
            <View style={{ borderWidth: 1, borderColor: '#dedede', marginHorizontal: 10, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eff3f5', padding: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='truck-delivery' size={20} color={styleColor} />
                        <Text style={{ paddingLeft: 5, fontWeight: 'bold', color: '#8c989f' }}>{item.route_start ? `${item.route_start}` : ''}</Text>
                        <MaterialCommunityIcons name='ray-start-arrow' size={18} style={{ paddingLeft: 5, color: '#8c989f' }} />
                        <Text style={{ paddingLeft: 5, fontWeight: 'bold', color: '#8c989f' }}>{item.route_end ? `${item.route_end}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {item.demand_status == 0 && <Text style={{ fontSize: 11, color: styleColor }}>已取消</Text>}
                        {item.demand_status == 1 && <Text style={{ fontSize: 11, color: styleColor }}>未完成</Text>}
                        {item.demand_status == 2 && <Text style={{ fontSize: 11, color: styleColor }}>完成</Text>}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 11, color: '#8c989f' }}>指令时间：{item.date_id ? moment(`${item.date_id}`).format('YYYY-MM-DD') : ''}</Text>
                    <Text style={{ fontSize: 11, color: '#8c989f' }}>计划运送：<Text style={{ color: styleColor }}>{item.pre_count ? `${item.pre_count}` : ''}</Text></Text>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingBottom: 10, paddingHorizontal: 10, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 11, color: '#8c989f' }}>执行时间：{item.created_on ? moment(`${item.created_on}`).format('YYYY-MM-DD HH:mm') : ''}</Text>
                    <Text style={{ fontSize: 11, color: '#8c989f' }}>已派发：<Text style={{ color: styleColor }}>{item.plan_count ? `${item.plan_count}` : '0'}</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Thumbnail square source={{ uri: 'emptylisticon' }} />
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无责任记录</Text>
        </View>

    )
}

const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    listItemContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        borderWidth: 0.3,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    },
    listItemTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.3,
        borderColor: '#ddd',
        alignItems: 'center'
    },
    listItemBodyContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    listItemBottomContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    text: {
        paddingLeft: 5
    },
    itemGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    clockIcon: {
        fontSize: 15,
        color: '#00cade'
    },
    carIcon: {
        fontSize: 20,
        color: '#ccc'
    },
    alertIcon: {
        fontSize: 20,
        color: '#fa7376'
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})

const mapStateToProps = (state) => {
    return {
        requirementListReducer: state.requirementListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRequirementListMore: () => {
        dispatch(requirementListAction.getRequirementListMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RequirementList)