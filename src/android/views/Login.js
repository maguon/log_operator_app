import React, { Component, PropTypes } from 'react'
import { View, Image, Dimensions, ToastAndroid, Platform, StatusBar } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../reducers/index'
import * as LoginAction from '../../actions/LoginAction'
import { Actions } from 'react-native-router-flux'
import LoginLayout from '../components/Login'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import { Button, Icon, Form, Item, Text, Label, Input, Left, Body, Right, Title, List, ListItem } from 'native-base'
//import XGPush from 'react-native-xinge-push';


const window = Dimensions.get('window')

class Login extends Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.state = {
            textUserName: '',
            textPassword: ''
        }
    }

    login(param) {
        const { version } = this.props.initializationReducer.data
        const { loginFlow } = this.props.userReducer
        if (loginFlow.step == 0 || loginFlow.step == 1) {
            this.props.loginFlow({
                OptionalParam: {
                    version: version.currentVersion,
                    appType: 3,
                    deviceType:1
                },
                postParam: {
                    mobile: this.state.textUserName,
                    password: this.state.textPassword
                }
            })
        } else if (loginFlow.step == 2) {
            const { initPush } = this.props.userReducer
            this.props.loginFlow({
                OptionalParam: {
                    version: version.currentVersion,
                    appType: 3,
                    deviceToken: initPush.deviceToken,
                    deviceType:1
                },
                postParam: {
                    mobile: this.state.textUserName,
                    password: this.state.textPassword
                }
            }, 1, 2)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { initPush, login, loginFlow, data } = nextProps.userReducer
        if (loginFlow.step == 1 && loginFlow.isResultStatus == 2) {
            if (initPush.isResultStatus == 4) {
                ToastAndroid.showWithGravity(`${initPush.failedMsg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }  else if (initPush.isResultStatus == 3) {
                ToastAndroid.showWithGravity(`${initPush.errorMsg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        } else if (loginFlow.step == 2 && loginFlow.isResultStatus == 2) {
            if (login.isResultStatus == 4) {
                ToastAndroid.showWithGravity(`${login.failedMsg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else if (login.isResultStatus == 5) {
                ToastAndroid.showWithGravity(`${login.networkError}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else if (login.isResultStatus == 3) {
                ToastAndroid.showWithGravity(`${login.errorMsg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        }
    }

    render() {
        //console.log(this.props.userReducer)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar hidden={true} />
                <Image
                    source={{ uri: 'login_back' }}
                    style={{ width: window.width, height: window.width / 9 * 16 }} />
                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ borderRadius: 60, backgroundColor: 'rgba(255,255,255,1)', borderColor: 'rgba(255,255,255,0.5)', borderWidth: 20, width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'logo' }}
                            style={{ width: 80, height: 80 }} />
                    </View>
                    <View>
                        <Image
                            source={{ uri: 'app_name' }}
                            style={{ width: 125, height: 38, marginTop: 20 }} />
                    </View>
                    <View>
                        <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.15)', width: window.width / 4 * 3, borderWidth: 0, marginTop: 50 }}>
                            <Icon active name='md-person' style={{ color: '#d1bae3', marginLeft: 10 }} />
                            <Input placeholder='请输入用户名'
                                placeholderTextColor='#d1bae3'
                                style={{ color: '#d1bae3' }}
                                onChangeText={(text) => this.setState({ textUserName: text })}
                                value={this.state.textUserName} />
                        </Item>
                        <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.15)', width: window.width / 4 * 3, borderWidth: 0, marginTop: 20 }}>
                            <Icon active name='md-lock' style={{ color: '#d1bae3', marginLeft: 10 }} />
                            <Input placeholder='请输入密码'
                                placeholderTextColor='#d1bae3'
                                style={{ color: '#d1bae3' }}
                                secureTextEntry
                                onChangeText={(text) => this.setState({ textPassword: text })}
                                value={this.state.textPassword} />
                        </Item>
                        <Button style={{ marginTop: 50, width: window.width / 4 * 3, borderRadius: 25, backgroundColor: '#7a36bd', justifyContent: 'center' }}
                            onPress={this.login}>
                            <Text>登录</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (param) => {
        dispatch(LoginAction.login(param))
    },
    loginFlow: (param, tryCount = 1, currentStep = 1) => {
        dispatch(LoginAction.loginFlow(param, tryCount, currentStep))
    },
    resetLogin: () => {
        dispatch(LoginAction.resetLogin())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)