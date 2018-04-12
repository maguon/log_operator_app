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
import * as commandListAction from './CommandListAction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Thumbnail, Container, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as RouterDirection from '../../../util/RouterDirection'
import globalStyles, { styleColor } from '../../GlobalStyles'


const CommandList = props => {
    const { commandListReducer: { data: { commandList, isComplete }, getCommandList }, commandListReducer, getCommandListMore } = props
    if (getCommandList.isResultStatus == 1) {
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
                    data={commandList}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getCommandList.isResultStatus == 2 && !isComplete) {
                            getCommandListMore()
                        }
                    }}
                    ListFooterComponent={commandListReducer.getCommandListMore.isResultStatus == 1 ? ListFooterComponent : <View style={{ height: 10 }} />}
                    renderItem={({ item, index }) => renderListItem({
                        item,
                        index
                    })} />
            </Container>
        )
    }
}

const renderListItem = props => {
    const { item, index } = props
    return (
        <TouchableOpacity key={index}
            onPress={() => Actions.taskInfoAtWork({ initParam: { taskInfo: item } })}>
            <View style={{ borderWidth: 1, borderColor: '#dedede', marginHorizontal: 10, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='truck-delivery' size={16} color={styleColor} />
                        <Text style={[globalStyles.midText, { paddingLeft: 5, fontWeight: 'bold', color: '#8c989f' }]}>{item.addr_name ? `${item.addr_name}` : ''}</Text>
                        <MaterialCommunityIcons name='ray-start-arrow' size={16} style={{ paddingLeft: 5, color: '#8c989f' }} />
                        <Text style={[globalStyles.midText, { paddingLeft: 5, fontWeight: 'bold', color: '#8c989f' }]}>{item.city_name ? `${item.city_name}` : ''}{item.short_name ? `(${item.short_name})` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>司机：{item.drive_name ? `${item.drive_name}` : ''}</Text>
                    </View>
                    <View>
                        <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>货车：{item.truck_num ? `${item.truck_num}` : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 10, paddingBottom: 10, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>实际装车：<Text style={{ color: styleColor }}>{item.car_count || item.car_count == 0 ? `${item.car_count}` : ''}</Text></Text>
                    </View>
                    <View>
                        <Text style={[globalStyles.smallText, { color: '#8c989f' }]}>{item.load_date ? `${moment(`${item.load_date}`).format('YYYY-MM-DD HH:mm')}` : '未装车'}</Text>
                    </View>
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
        commandListReducer: state.commandListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCommandListMore: () => {
        dispatch(commandListAction.getCommandListMore())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(CommandList)