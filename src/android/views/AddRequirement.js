import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
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
            baseAddrId: 102,
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
        this.props.addRequirement({
            requiredParam: { userId: 81 },
            postParam: {
                routeStartId: this.state.routeStartId,
                routeStart: this.state.routeStart,
                baseAddrId: this.state.baseAddrId,
                routeEndId: this.state.routeEndId,
                routeEnd: this.state.routeEnd,
                receiveId: this.state.receiveId,
                preCount: this.state.preCount,
                dateId: this.state.dateId
            }
        })
    }

    render() {
        console.log('this.props.addRequirementReducer', this.props.addRequirementReducer)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <Select
                            title='起始城市：'
                            value={this.state.routeStart ? this.state.routeStart : '请选择'}
                            showList={RouterDirection.selectCity(this.props.parent)}
                            onValueChange={(param) => this.setState({ routeStartId: param.id, routeStart: param.city_name })}
                            defaultValue={'请选择'}
                        />
                        <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>装车地点：<Text style={{ fontWeight: '100' }}>大连港口</Text></Text>
                        </View>
                        <Select
                            title='目的城市：'
                            value={this.state.routeEnd ? this.state.routeEnd : '请选择'}
                            showList={RouterDirection.selectCity(this.props.parent)}
                            onValueChange={(param) => this.setState({ routeEndId: param.id, routeEnd: param.city_name })}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='送达地点：'
                            value={this.state.receive ? this.state.receive : '请选择'}
                            showList={RouterDirection.selectReceive(this.props.parent)}
                            onValueChange={(param) => this.setState({ receiveId: param.id, receive: param.address })}
                            defaultValue={'请选择'}
                        />
                        <TextBox
                            title='运送车辆数：'
                            value={this.state.preCount ? this.state.preCount : ''}
                            defaultValue={''}
                            onValueChange={(param) => this.setState({ preCount: param })}
                            placeholder='请输入车牌'
                        />
                        <DateTimePicker
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
        addRequirementReducer: state.addRequirementReducer
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