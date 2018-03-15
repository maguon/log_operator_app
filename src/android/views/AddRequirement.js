import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import DateTimePicker from '../components/form/DateTimePicker'
import * as RouterDirection from '../../util/RouterDirection'
import * as addRequirementAction from '../../actions/AddRequirementAction'

class AddRequirement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            routeStartId: 0,
            routeStart: '',
            routeEndId: 0,
            routeEnd: '',
            receiveId: 0,
            receive: '',
            preCount: 0,
            dateId: ''
        }
        this.addRequirement = this.addRequirement.bind(this)
    }

    addRequirement() {
        const { user } = this.props.userReducer.data
        if (this.props.settingReducer.data.baseAddrId) {
            this.props.addRequirement({
                requiredParam: { userId: user.userId },
                postParam: {
                    routeStartId: this.props.settingReducer.data.cityId,
                    routeStart: this.props.settingReducer.data.cityName,
                    baseAddrId: this.props.settingReducer.data.baseAddrId,
                    routeEndId: this.state.routeEndId,
                    routeEnd: this.state.routeEnd,
                    receiveId: this.state.receiveId,
                    preCount: this.state.preCount,
                    dateId: this.state.dateId
                }
            })
        } else {
            ToastAndroid.showWithGravity('您未选择装车地点，请先设置装车地点', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { addRequirement } = nextProps.addRequirementReducer
        if (addRequirement.isResultStatus == 2) {
            ToastAndroid.showWithGravity('需求创建成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
            this.setState({
                routeStartId: 0,
                routeStart: '',
                routeEndId: 0,
                routeEnd: '',
                receiveId: 0,
                receive: '',
                preCount: 0,
                dateId: ''
            })
            this.props.resetAddRequirement()
        } else if (addRequirement.isResultStatus == 3) {
            ToastAndroid.showWithGravity('需求创建失败，请重试', ToastAndroid.SHORT, ToastAndroid.CENTER)
            this.props.resetAddRequirement()
        } else if (addRequirement.isResultStatus == 4) {
            ToastAndroid.showWithGravity(`需求创建失败，请重试`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            this.props.resetAddRequirement()
        } else if (addRequirement.isResultStatus == 5) {
            ToastAndroid.showWithGravity('需求创建失败，请重试', ToastAndroid.SHORT, ToastAndroid.CENTER)
            this.props.resetAddRequirement()
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>起始城市：<Text style={{ fontWeight: '100' }}>{this.props.settingReducer.data.cityName ? this.props.settingReducer.data.cityName : '未选择装车城市'}</Text></Text>
                        </View>
                        <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>装车地点：<Text style={{ fontWeight: '100' }}>{this.props.settingReducer.data.baseAddr ? this.props.settingReducer.data.baseAddr : '未选择装车地点'}</Text></Text>
                        </View>
                        <Select
                            title='目的城市：'
                            isRequire={true}
                            value={this.state.routeEnd ? this.state.routeEnd : '请选择'}
                            showList={RouterDirection.selectCity(this.props.parent)}
                            onValueChange={(param) => {
                                if (this.state.routeEndId != param.id) {
                                    this.setState({ routeEndId: param.id, routeEnd: param.city_name, receiveId: 0, receive: '' })
                                }
                            }}
                            defaultValue={'请选择'}
                        />
                        {this.state.routeEndId ? <Select
                            isRequire={true}
                            title='送达地点：'
                            value={this.state.receive ? this.state.receive : '请选择'}
                            showList={(param) => RouterDirection.selectReceive(this.props.parent)({ ...param, cityId: this.state.routeEndId })}
                            onValueChange={(param) => {
                                if (this.state.receiveId != param.id) {
                                    this.setState({ receiveId: param.id, receive: param.short_name })
                                }
                            }}
                            defaultValue={'请选择'}
                        /> : <View style={{ paddingLeft: 4,paddingVertical:10, backgroundColor: '#eee' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}><Text style={{ color: 'red' }}>*</Text>送达地点：<Text style={{ fontWeight: '100' }}>请先选择目的城市</Text></Text>
                            </View>}
                        <TextBox
                            isRequire={true}
                            title='运送车辆数：'
                            value={this.state.preCount ? this.state.preCount : ''}
                            defaultValue={''}
                            onValueChange={(param) => this.setState({ preCount: param })}
                            placeholder='请输入车辆数'
                        />
                        <DateTimePicker
                            isRequire={true}
                            title='指令时间：'
                            defaultValue={'请选择'}
                            value={this.state.dateId ? this.state.dateId : '请选择'}
                            onValueChange={(param) => this.setState({ dateId: param })}
                        />
                        <Button full style={{ backgroundColor: '#00cade', justifyContent: 'center', marginHorizontal: 10, marginTop: 30 }} onPress={this.addRequirement}>
                        
                            <Text style={{ color: '#fff' }}>确 定</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settingReducer: state.settingReducer,
        addRequirementReducer: state.addRequirementReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRequirement: (param) => {
        dispatch(addRequirementAction.addRequirement(param))
    },
    addRequirementWaiting: () => {
        dispatch(addRequirementAction.addRequirementWaiting())
    },
    resetAddRequirement: () => {
        dispatch(addRequirementAction.resetAddRequirement())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(AddRequirement)