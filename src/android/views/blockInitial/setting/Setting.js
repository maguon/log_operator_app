import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    InteractionManager,
    TouchableOpacity,
    Linking
} from 'react-native'
import { Container, Content, List, Left, ListItem, Thumbnail, Separator, Body, Right, Icon, Button } from 'native-base'
import { connect } from 'react-redux'
import FoundationIcon from 'react-native-vector-icons/dist/Foundation'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../../GlobalStyles'
import * as demageListAction from '../../demageList/DemageListAction'
import * as responsibilityListAction from '../../responsibilityList/ResponsibilityListAction'
import * as loginAction from '../../login/LoginAction'
import { file_host } from '../../../../config/Host'
import ConfirmModal from '../../../components/share/ConfirmModal'
import * as routerDirection from '../../../../util/RouterDirection'
import * as settingAction from './SettingAction'
import * as android_app from '../../../../android_app.json'

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmModalVisible: false,
        }
        this.exitApp = this.exitApp.bind(this)
        this.onPressOk = this.onPressOk.bind(this)
        this.onPressCancel = this.onPressCancel.bind(this)
    }


    exitApp() {
        this.setState({ confirmModalVisible: true })
    }

    onPressOk() {
        this.setState({ confirmModalVisible: false })
        this.props.cleanLogin()
    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }

    render() {
        const { getDemageListWaiting,
            getDemageList,
            getResponsibilityListWaiting,
            getResponsibilityList,
            cleanLogin,
            saveBaseAddr,
            settingReducer: { data: { baseAddr } },
            loginReducer: { data: { user: { real_name, avatar_image, mobile } } },
            initializationReducer: { data: { version: { force_update, currentVersion, url } } }, initializationReducer } = this.props
        return (
            <Container>
                <Content style={globalStyles.container}>
                    <List style={styles.list}>
                        <Separator style={globalStyles.separator} />
                        <ListItem last onPress={Actions.personalCenter}>
                            <View style={styles.avatarContainer}>
                                <Thumbnail source={avatar_image ? { uri: `${file_host}/image/${avatar_image}` } : { uri: `personalicon` }} />
                                <View style={styles.userContainer}>
                                    <Text style={globalStyles.midText}>{real_name ? `${real_name}` : ''}</Text>
                                    <Text style={globalStyles.midText}>{mobile ? `${mobile}` : ''}</Text>
                                </View>
                            </View>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon onPress={() => {
                            routerDirection.selectCity(this.props.parent)({
                                onSelect: (param) => saveBaseAddr({
                                    baseAddrId: param.id,
                                    baseAddr: param.addr_name,
                                    cityId: param.city_id,
                                    cityName: param.city_name
                                }), isMultistep: true
                            })
                        }}>
                            <Left>
                                <Icon name="ios-pin-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>定位设置</Text>
                            </Body>
                            <Right>
                                <Text style={globalStyles.midText}>{baseAddr ? baseAddr : ''}</Text>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon last onPress={Actions.updatePassword}>
                            <Left>
                                <Icon name="ios-key-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>修改密码</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon onPress={() => {
                            getDemageListWaiting()
                            Actions.demageList()
                            InteractionManager.runAfterInteractions(() => {
                                getDemageList()
                            })
                        }}>
                            <Left>
                                <Icon name="ios-alert" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>我的质损</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon last onPress={() => {
                            getResponsibilityListWaiting()
                            Actions.responsibilityList()
                            InteractionManager.runAfterInteractions(() => {
                                getResponsibilityList()
                            })
                        }}>
                            <Left>
                                <Icon name="ios-umbrella" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>我的责任</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon last>
                            <Left>
                                <Icon name="ios-cube-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>版本信息：v{currentVersion}{`(${android_app.stageList.find(item => item.id == android_app.stage).value})`}</Text>
                            </Body>
                            <Right >
                                {force_update != 0 && <TouchableOpacity onPress={() => {
                                    if (url) {
                                        Linking.canOpenURL(url)
                                            .then(supported => {
                                                if (!supported) {
                                                    console.log('Can\'t handle url: ' + url)
                                                } else {
                                                    return Linking.openURL(url)
                                                }
                                            })
                                            .catch(err => console.error('An error occurred', err))
                                    }
                                }}>
                                    <FoundationIcon name="burst-new" size={30} color={'#ff0000'} />
                                </TouchableOpacity>}
                            </Right>
                        </ListItem>
                    </List>
                    <Button full style={[styles.button, globalStyles.styleBackgroundColor]} onPress={this.exitApp}>
                        <Text style={[globalStyles.midText, styles.buttonTitle]}>退出</Text>
                    </Button>
                </Content>
                <ConfirmModal
                    title='确认退出应用？'
                    isVisible={this.state.confirmModalVisible}
                    onPressOk={this.onPressOk.bind(this)}
                    onPressCancel={this.onPressCancel.bind(this)}
                />
            </Container>
        )
    }

}


const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userContainer: {
        marginLeft: 10
    },
    button: {
        margin: 15,
        marginTop: 40
    },
    buttonTitle: {
        color: '#fff'
    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        settingReducer: state.settingReducer,
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDemageList: () => {
        dispatch(demageListAction.getDemageList())
    },
    getDemageListWaiting: () => {
        dispatch(demageListAction.getDemageListWaiting())
    },
    getResponsibilityList: () => {
        dispatch(responsibilityListAction.getResponsibilityList())
    },
    getResponsibilityListWaiting: () => {
        dispatch(responsibilityListAction.getResponsibilityListWaiting())
    },
    cleanLogin: () => {
        dispatch(loginAction.cleanLogin())
    },
    saveBaseAddr: (param) => {
        dispatch(settingAction.saveBaseAddr(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)