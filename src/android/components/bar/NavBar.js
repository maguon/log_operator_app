import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { Header, Title, Button, Icon, Right, Left, Body } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import  moment  from 'moment'
import * as homeAction from '../../../actions/HomeAction'
import * as settingAction from '../../../actions/SettingAction'
import * as commandAction from '../../../actions/CommandAction'

class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        isRequirePopRefresh: false,
        rightType: 0,
    }

    render() {
        let { title, layout, rightType } = this.props
        const { userId } = this.props.userReducer.data.user
        const { baseAddrId } = this.props.settingReducer.data
        return (
            <View androidStatusBarColor='#00cade' style={{ flex: 1, position: 'absolute', top: 0, backgroundColor: '#fff', width: layout.initWidth }}>
                <StatusBar hidden={false} />
                <Header androidStatusBarColor='#00cade' style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                    <Title>{title}</Title>
                    <View style={{ position: 'absolute', left: 0 }}>
                        <Button transparent onPress={() => Actions.pop({ refresh: { isPopRefresh: this.props.isRequirePopRefresh } })}>
                            <Icon name="ios-arrow-back" size={30} color='#ffffff' />
                        </Button>
                    </View>
                    {rightType == 1 && <View style={{ position: 'absolute', right: 10 }}>
                        <Button transparent onPress={()=>this.props.refresh(userId,baseAddrId)}>
                            <Text style={{ color: '#fff' }} >刷新</Text>
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

const mapDispatchToProps = (dispatch,ownProps) => ({
    refresh: (userId, baseAddrId) => {
        const {taskInfo} =ownProps.initParam
        dispatch(homeAction.getHomeData({
            getCarriedCount: {
                OptionalParam: {
                    loadDateStart: moment().format('YYYY-MM-01'),
                    loadDateEnd: moment().format('YYYY-MM-DD'),
                    loadTaskStatusArr: '3,7,9',
                    fieldOpId: userId
                }
            },
            getTaskList: {
                OptionalParam: {
                    baseAddrId: baseAddrId,
                    loadTaskStatus: '1',
                    start: 0,
                    size: 12
                }
            }
        }))
        dispatch(commandAction.getCommandList({
            OptionalParam: {
                dpRouteTaskId: taskInfo.id
            }
        }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
