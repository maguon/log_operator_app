import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    TouchableNativeFeedback,
    Modal,
    ART,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import { Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as homeAction from '../../../actions/HomeAction'
import * as settingAction from '../../../actions/SettingAction'
import * as RouterDirection from '../../../util/RouterDirection'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('window');
let mwidth = 70;
let mheight = 100;
const top = 46

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuModalIsVisible: false
        }
        this.renderListHeader = this.renderListHeader.bind(this)
        this.getTaskListMore = this.getTaskListMore.bind(this)
        this.renderMenu = this.renderMenu.bind(this)
        this._onSaveBaseAddr=this._onSaveBaseAddr.bind(this)
    }

    componentDidMount() {
        const { user } = this.props.userReducer.data
        const { data } = this.props.settingReducer
        this.props.getHomeDataWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getHomeData({
            getCarriedCount: {
                OptionalParam: {
                    loadDateStart: moment().format('YYYY-MM-01'),
                    loadDateEnd: moment().format('YYYY-MM-DD'),
                    loadTaskStatusArr: '3,7,9',
                    fieldOpId: user.userId
                }
            },
            getTaskList: {
                OptionalParam: {
                    baseAddrId: data.baseAddrId,
                    start: 0,
                    size: 12
                }
            }
        }))
    }

    _onSaveBaseAddr(param) {
        this.props.saveBaseAddr({
            baseAddrId: param.id,
            baseAddr: param.addr_name,
            cityId: param.city_id,
            cityName: param.city_name
        })
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps.settingReducer
        const { user } = nextProps.userReducer.data
        if(data.baseAddrId!=this.props.settingReducer.data.baseAddrId) {
            this.props.getHomeDataWaiting()
            InteractionManager.runAfterInteractions(() => this.props.getHomeData({
                getCarriedCount: {
                    OptionalParam: {
                        loadDateStart: moment().format('YYYY-MM-01'),
                        loadDateEnd: moment().format('YYYY-MM-DD'),
                        loadTaskStatusArr: '3,7,9',
                        fieldOpId: user.userId
                    }
                },
                getTaskList: {
                    OptionalParam: {
                        baseAddrId: data.baseAddrId,
                        start: 0,
                        size: 12
                    }
                }
            }))  
        }else if (nextProps.leftButtonTitle!=data.baseAddr) {
            Actions.refresh({ 
                onPressLeft: () => RouterDirection.selectCity(this.props.parent)({onSelect:this._onSaveBaseAddr,  isMultistep: true }),
                leftButtonTitle: data.baseAddr,
                onPressRight: () => this.setState({ menuModalIsVisible: true })
             })
        }
    }

    getTaskListMore() {
        const { taskList, listLoadComplete } = this.props.homeReducer.data
        const { getTaskListMore } = this.props.homeReducer
        const { data } = this.props.settingReducer
        if (!listLoadComplete && getTaskListMore.isResultStatus != 1) {
            this.props.getTaskListMore({
                OptionalParam: {
                    baseAddrId: data.baseAddrId,
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

    renderMenu() {
        const path = ART.Path();
        path.moveTo(width - 10 - mwidth * 1 / 3 + 3, top);
        path.lineTo(width - 10 - mwidth * 1 / 3 + 9, top - 7);
        path.lineTo(width - 10 - mwidth * 1 / 3 + 15, top);
        path.close();
        return (
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={this.state.menuModalIsVisible}
                onRequestClose={() => { }}>
                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }} onPress={() => this.setState({ menuModalIsVisible: false })}>
                    <View style={{ position: 'absolute', top: 0, right: 10 }}>
                        <ART.Surface width={width} height={top} >
                            <ART.Shape d={path} fill={'#fff'} />
                        </ART.Surface>
                        <View style={{
                            backgroundColor: '#fff',
                            alignSelf: 'flex-end',
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            borderRadius: 3
                        }}>
                            <TouchableOpacity style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='ios-qr-scanner' style={{ fontSize: 12 }} />
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>扫一扫</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    this.setState({ menuModalIsVisible: false })
                                    RouterDirection.addRequirement(this.props.parent)()
                                }}>
                                <Icon name='ios-clipboard-outline' style={{ fontSize: 12 }} />
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>增加需求</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    this.setState({ menuModalIsVisible: false })
                                    RouterDirection.addCar(this.props.parent)()
                                }}>
                                <Icon name='ios-car-outline' style={{ fontSize: 12 }} />
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>增加商品车</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableHighlight>
            </Modal>
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
                    {this.renderMenu()}
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
                    {this.renderMenu()}
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        homeReducer: state.homeReducer,
        settingReducer: state.settingReducer
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
    },
    saveBaseAddr: (param) => {
        dispatch(settingAction.saveBaseAddr(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)