import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    Modal,
    ART,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Icon, Container, Spinner } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as homeAction from './HomeAction'
import * as RouterDirection from '../../../../util/RouterDirection'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../GlobalStyles'

const { width, height } = Dimensions.get('window')

const HomeHeader = props => {
    const { carriedCount, isWaiting } = props
    return (
        <View style={styles.header}>
            <View style={styles.headerIconView}>
                <MaterialCommunityIcons name='truck' size={40} color='#fff' />
            </View>
            <View style={styles.headerTextView}>
                <Text style={[globalStyles.smallText, styles.headerTagText]}>本月装车次</Text>
                {isWaiting && <Text style={[globalStyles.midText, styles.headerText]}>----</Text>}
                {!isWaiting && <Text style={[globalStyles.midText, styles.headerText]}>{carriedCount.load_number ? `${carriedCount.load_number}` : '0'}</Text>}
            </View>
            <View style={styles.headerIconView}>
                <MaterialCommunityIcons name='car-side' size={40} color='#fff' />
            </View>
            <View style={styles.headerTextView}>
                <Text style={[globalStyles.smallText, styles.headerTagText]}>本月装车量</Text>
                {isWaiting && <Text style={[globalStyles.midText, styles.headerText]}>----</Text>}
                {!isWaiting && <Text style={[globalStyles.midText, styles.headerText]}>{carriedCount.load_count ? `${carriedCount.load_count}` : '0'}</Text>}
            </View>
        </View>
    )
}

const ListItem = props => {
    const { item, index } = props
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => Actions.command({ initParam: { taskInfo: item } })}>
            <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='truck-delivery' size={20} color={styleColor} />
                    <Text style={[globalStyles.midText, styles.itemTagText]}>{item.city_route_start ? `${item.city_route_start}` : ''}</Text>
                    <MaterialCommunityIcons name='ray-start-arrow' size={18} style={{ paddingLeft: 5, color: '#8c989f' }} />
                    <Text style={[globalStyles.midText, styles.itemTagText]}>
                        {item.city_route_end ? `${item.city_route_end}` : ''}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name='account' size={20} color={styleColor} />
                    <Text style={[globalStyles.midText, styles.itemTagText]}>{item.drive_name ? `${item.drive_name}` : ''}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between' }}>
                <Text style={[globalStyles.smallText, styles.itemText]}>执行时间：{item.task_start_date ? moment(`${item.task_start_date}`).format('YYYY-MM-DD HH:mm') : ''}</Text>
                <Text style={[globalStyles.smallText, styles.itemText]}>指定装载：{item.plan_count ? `${item.plan_count}` : ''}</Text>
            </View>
        </TouchableOpacity>
    )
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.onSelectQRCode = this.onSelectQRCode.bind(this)
    }

    componentDidMount() {
        this.props.getHomeDataWaiting()
        InteractionManager.runAfterInteractions(this.props.getHomeData)
    }

    onSelectQRCode(result) {
        InteractionManager.runAfterInteractions(() => Actions.task({ initParam: { driverInfo: result } }))
    }

    render() {
        const { homeReducer: { data: { carriedCount, taskList }, getHomeData } } = this.props
        if (getHomeData.isResultStatus == 1) {
            return (
                <Container>
                    <HomeHeader carriedCount={carriedCount} isWaiting={getHomeData.isResultStatus == 1} />
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container>
                    <HomeHeader carriedCount={carriedCount} isWaiting={getHomeData.isResultStatus == 1} />
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={taskList}
                        ListFooterComponent={<View style={{ height: 10 }} />}
                        renderItem={ListItem} />
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: styleColor,
        paddingVertical: 10
    },
    headerIconView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    headerTextView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTagText: {
        color: '#fff'
    },
    headerText: {
        color: '#fefcc1',
        fontWeight: 'bold'
    },
    listItem: {
        borderWidth: 0.5,
        borderColor: '#ddd',
        marginHorizontal: 10,
        marginTop: 10
    },
    itemText: {
        color: '#8c989f'
    },
    itemTagText: {
        fontWeight: 'bold',
        paddingLeft: 5,
    }

})

const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer,
        formReducer: state.form
    }
}

const mapDispatchToProps = (dispatch) => ({
    getHomeData: () => {
        dispatch(homeAction.getHomeData())
    },
    getHomeDataWaiting: () => {
        dispatch(homeAction.getHomeDataWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)