import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import moment from 'moment'

export default class RequirementInfo extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('this.props.initParam', this.props.initParam)
    }

    render() {
        const { requirementInfo } = this.props.initParam
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>生成时间：<Text style={{ fontWeight: '100' }}>{requirementInfo.created_on ? moment(`${requirementInfo.created_on}`).format('YYYY-MM-DD HH:mm') : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>起始城市：<Text style={{ fontWeight: '100' }}>{requirementInfo.route_start ? `${requirementInfo.route_start}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>装车地点：<Text style={{ fontWeight: '100' }}>{requirementInfo.addr_name ? `${requirementInfo.addr_name}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>目的城市：<Text style={{ fontWeight: '100' }}>{requirementInfo.route_end ? `${requirementInfo.route_end}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>送达地点：<Text style={{ fontWeight: '100' }}>{requirementInfo.short_name ? `${requirementInfo.short_name}` : ''}</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>运送车辆数：<Text style={{ color: '#fe8a95' }}>{requirementInfo.pre_count ? `${requirementInfo.pre_count}` : ''}</Text><Text style={{ fontWeight: '100' }}>辆</Text></Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>指令时间：<Text style={{ fontWeight: '100' }}>{requirementInfo.date_id ? moment(`${requirementInfo.date_id}`).format('YYYY-MM-DD') : ''}</Text></Text>
                </View>
            </View>
        )
    }
}