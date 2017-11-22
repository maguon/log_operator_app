import React, { Component } from 'react'
import {
    Text,
    View,
    ToastAndroid
} from 'react-native'
import { Button } from 'native-base'
import TextBox from '../components/form/TextBox'
import { connect } from 'react-redux'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import * as passwordAction from '../../actions/PasswordAction'
import * as loginAction from '../../actions/LoginAction'
import { Actions } from 'react-native-router-flux'

class Password extends Component {
    constructor(props) {
        super(props)
        this.state = {
            originPassword: '',
            newPassword: '',
            againPassword: ''
        }
        this.changePassword = this.changePassword.bind(this)
    }

    changePassword() {
        if (this.state.newPassword == this.state.againPassword) {
            this.props.changePassword({
                requiredParam: {
                    userId: this.props.userReducer.data.user.userId
                },
                putParam: {
                    originPassword: this.state.originPassword,
                    newPassword: this.state.newPassword
                }
            })
        } else {
            ToastAndroid.showWithGravity('两次输入的新密码不同', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { isResult, isSuccess } = nextProps.password
        if (isResult) {
            if (isSuccess) {
                ToastAndroid.showWithGravity('修改成功，请重新登录', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetPassword()
                localStorage.save({
                    key: localStorageKey.USER,
                    data: { mobile: this.props.userReducer.data.user.mobile }
                })
                this.props.cleanLogin()
                Actions.popTo('login')
            }
            else {
                ToastAndroid.showWithGravity('修改失败，请检查密码是否正确', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetPassword()
            }
            return false
        }
        return true
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextBox
                    title='原始密码：'
                    secureTextEntry={true}
                    value={this.state.originPassword ? this.state.originPassword : ''}
                    defaultValue={''}
                    onValueChange={(param) => this.setState({ originPassword: param })}
                    placeholder='请输入原始密码'
                />
                <TextBox
                    title='新密码：'
                    secureTextEntry={true}
                    value={this.state.newPassword ? this.state.newPassword : ''}
                    defaultValue={''}
                    onValueChange={(param) => this.setState({ newPassword: param })}
                    placeholder='请输入原始密码'
                />
                <TextBox
                    title='再次输入密码：'
                    secureTextEntry={true}
                    value={this.state.againPassword ? this.state.againPassword : ''}
                    defaultValue={''}
                    onValueChange={(param) => this.setState({ againPassword: param })}
                    placeholder='请输入原始密码'
                />
                <View style={{marginHorizontal:10,marginTop:50}}>
                    <Button full style={{backgroundColor:'#00cade'}} onPress={this.changePassword}>
                        <Text style={{color:'#fff'}}>修改密码</Text>
                    </Button >
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        password: state.passwordReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    changePassword: (param) => {
        dispatch(passwordAction.changePassword(param))
    },
    resetPassword: () => {
        dispatch(passwordAction.resetPassword())
    },
    cleanLogin: () => {
        dispatch(loginAction.cleanLogin())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Password)