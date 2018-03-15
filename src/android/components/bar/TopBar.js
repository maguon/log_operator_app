import React, { Component } from 'react'
import { Header, Title, Button, Icon } from 'native-base'
import { View, StatusBar, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'
import moment from 'moment'
import * as homeAction from '../../../actions/HomeAction'

class TopBar extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        rightType: 0, //0：不显示right 1:add
        onPressRight: () => { },
        leftType: 0, //0：不显示left 1:add
        onPressLeft: () => { },
        leftButtonTitle: ''
    }

    render() {
        const { title, layout } = this.props
        const { user } = this.props.userReducer.data
        const { data } = this.props.settingReducer
        return (
            <View androidStatusBarColor='#00cade' style={{ flex: 1, position: 'absolute', top: 0, backgroundColor: '#fff', width: layout.initWidth }}>
                <StatusBar hidden={false} />
                <Header androidStatusBarColor='#00cade' style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                    {this.props.leftType == 1 && <View style={{ position: 'absolute', left: 0 }}>
                        <Button transparent onPress={this.props.onPressLeft}>
                            <Icon name="ios-pin" style={{ fontSize: 15, color: '#8cf8f6' }} />
                            <Text style={{ fontSize: 12, color: '#8cf8f6' }}>{this.props.leftButtonTitle}</Text>
                        </Button>
                    </View>}
                    <Title>{title}</Title>
                    {this.props.rightType == 2 && <View style={{ position: 'absolute', right: 0, flexDirection: 'row' }}>
                        <Button transparent onPress={() => this.props.getHomeData({
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
                                    loadTaskStatus: '1',
                                    start: 0,
                                    size: 12
                                }
                            }
                        })}>
                            <Text style={{ color: '#fff' }} >刷新</Text>
                        </Button>
                        <Button transparent onPress={this.props.onPressRight}>
                            <EntypoIcon name="dots-three-vertical" style={{ fontSize: 20, color: '#8cf8f6', marginRight: 10 }} />
                        </Button>
                    </View>}
                    {this.props.rightType == 1 && <View style={{ position: 'absolute', right: 0, flexDirection: 'row' }}>
                        <Button transparent onPress={this.props.onPressRight}>
                            <Icon name="ios-add" style={{ fontSize: 30, color: '#8cf8f6', marginRight: 10 }} />
                        </Button>
                    </View>}
                </Header>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        settingReducer: state.settingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getHomeData: (param) => {
        dispatch(homeAction.getHomeData(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)