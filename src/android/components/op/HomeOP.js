import React, { Component } from 'react'
import {
    Text,
    View,
    Modal,
    TouchableOpacity,
    ART,
    Dimensions,
    InteractionManager
} from 'react-native'
import { Button, Icon } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MenuForHeader from '../share/MenuForHeader'
import { Actions } from 'react-native-router-flux'
import * as routerDirection from '../../../util/RouterDirection'
import * as homeAction from '../../views/blockInitial/home/HomeAction'
import moment from 'moment'
import { connect } from 'react-redux'

class HomeOP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuModalIsVisible: false
        }
        this.changeMenuModalIsVisible = this.changeMenuModalIsVisible.bind(this)
    }

    changeMenuModalIsVisible(menuModalState) {
        this.setState({ menuModalIsVisible: menuModalState })
    }

    render() {
        const { parent, getHomeData, getHomeDataWaiting,
            loginReducer: { data: { user: { uid } } },
            settingReducer: { data: { baseAddrId } } } = this.props

        return (
            <View style={{ flexDirection: 'row' }}>
                <Button transparent onPress={() => {
                    getHomeDataWaiting()
                    InteractionManager.runAfterInteractions(getHomeData)
                }}>
                    <Text style={{ color: '#fff' }}>刷新</Text>
                </Button>
                <Button transparent onPress={() => this.setState({ menuModalIsVisible: true })}>
                    <EntypoIcon name="dots-three-vertical" style={{ fontSize: 20, color: '#fff' }} />
                </Button>
                <MenuForHeader
                    menuList={[
                        {
                            icon: () => <Icon name='ios-qr-scanner' style={{ fontSize: 20, color: '#777' }} />,
                            title: '扫一扫',
                            route: () => Actions.qrCodeScreen({
                                onSelectQRCode: (result) => InteractionManager.runAfterInteractions(() => Actions.task({ initParam: { driverInfo: result } }))
                            })
                        },
                        { icon: () => <Icon name='ios-clipboard-outline' style={{ fontSize: 20, color: '#777' }} />, title: '增加需求', route: routerDirection.addRequirement(parent) },
                        { icon: () => <Icon name='ios-car-outline' style={{ fontSize: 20, color: '#777' }} />, title: '增加商品车', route: routerDirection.addCar(parent) },
                        { icon: () => <Icon name='ios-alert-outline' style={{ fontSize: 20, color: '#777' }} />, title: '质损申报', route: routerDirection.applyDamage(parent) }
                    ]}
                    menuModalIsVisible={this.state.menuModalIsVisible}
                    changeMenuModalIsVisible={this.changeMenuModalIsVisible}
                />
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
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
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeOP)