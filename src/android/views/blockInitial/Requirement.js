import React, { Component } from 'react'
import {
    Text,
    View,
    InteractionManager,
    Dimensions
} from 'react-native'
import { Button, Container, Content } from 'native-base'
import Select from '../../components/share/form/Select'
import DatePicker from '../../components/share/form/DatePicker'
import CheckBox from '../../components/share/form/CheckBox'
import * as RouterDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import * as requirementListAction from '../requirementList/RequirementListAction'
const { width } = Dimensions.get('window')

const Requirement = props => {
    const { parent, reset, handleSubmit, resetBaseAddr, resetReceive, queryRequirementFormValues } = props
    return (
        <Container>
            <Content>
                <View style={{ flexDirection: 'row' }}>
                    <Field
                        label='创建时间：'
                        name='createdOnStart'
                        component={DatePicker}
                        itemStyle={{ width: width / 2 - 30 }} />
                    <Field
                        label='至：'
                        name='createdOnEnd'
                        component={DatePicker}
                        itemStyle={{ width: width / 2 - 30 }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Field
                        label='指令时间：'
                        name='dateIdStart'
                        component={DatePicker}
                        itemStyle={{ width: width / 2 - 30 }} />
                    <Field
                        label='至：'
                        name='dateIdEnd'
                        component={DatePicker}
                        itemStyle={{ width: width / 2 - 30 }} />
                </View>
                <Field
                    name='routeStart'
                    label='起始城市：'
                    component={Select}
                    onPress={({ onChange }) => {
                        RouterDirection.selectCity(parent)({
                            onSelect: (param) => {
                                const { id, city_name } = param
                                if (queryRequirementFormValues.baseAddr.item && id && queryRequirementFormValues.baseAddr.item.city_id != id) {
                                    resetBaseAddr()
                                }
                                onChange({ id, value: city_name, item: param })
                            },
                            hasAll: true
                        })
                    }}
                />
                <Field
                    name='routeEnd'
                    label='目的城市：'
                    component={Select}
                    onPress={({ onChange }) => {
                        RouterDirection.selectCity(parent)({
                            onSelect: (param) => {
                                const { id, city_name } = param
                                if (queryRequirementFormValues.receive.item && id && queryRequirementFormValues.receive.item.city_id != id) {
                                    resetReceive()
                                }
                                onChange({ id, value: city_name, item: param })
                            },
                            hasAll: true
                        })
                    }}
                />
                <Field
                    name='baseAddr'
                    label='装车地点：'
                    component={Select}
                    onPress={({ onChange }) => {
                        RouterDirection.selectBaseAddr(parent)({
                            onSelect: (param) => {
                                const { id, addr_name } = param
                                onChange({ id, value: addr_name, item: param })
                            },
                            cityId: queryRequirementFormValues.routeStart.id,
                            hasAll: true
                        })
                    }}
                />
                <Field
                    name='receive'
                    label='送达地点：'
                    component={Select}
                    onPress={({ onChange }) => {
                        RouterDirection.selectReceive(parent)({
                            onSelect: (param) => {
                                const { id, short_name } = param
                                onChange({ id, value: short_name, item: param })
                            },
                            hasAll: true,
                            cityId: queryRequirementFormValues.routeEnd.id
                        })
                    }}
                />
                <Field
                    label='需求状态：'
                    name='demandStatus'
                    listTitle='维修类型'
                    itemList={[{ id: '0', value: '已取消' }, { id: '1', value: '未完成' }, { id: '2', value: '完成' }, { id: null, value: '全部' }]}
                    component={CheckBox} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Button full style={{ backgroundColor: styleColor, justifyContent: 'center', marginHorizontal: 10, marginTop: 30 }} onPress={handleSubmit}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>确 定</Text>
                        </Button>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button full style={{ backgroundColor: styleColor, justifyContent: 'center', marginHorizontal: 10, marginTop: 30 }} onPress={reset}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>重 置</Text>
                        </Button>
                    </View>
                </View>
            </Content>
        </Container>
    )
}



const mapStateToProps = (state) => ({
    queryRequirementFormValues: getFormValues('queryRequirementForm')(state),
    initialValues: {
        routeStart: { id: null, value: '全部' },
        routeEnd: { id: null, value: '全部' },
        baseAddr: { id: null, value: '全部' },
        receive: { id: null, value: '全部' },
        demandStatus: { id: null, value: '全部' }
    }

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    resetBaseAddr: () => {
        dispatch(change('queryRequirementForm', 'baseAddr', { id: null, value: '全部' }))
    },
    resetReceive: () => {
        dispatch(change('queryRequirementForm', 'receive', { id: null, value: '全部' }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'queryRequirementForm',
        enableReinitialize: true,
        onSubmit: (values, dispatch, props) => {
            dispatch(requirementListAction.getRequirementListWaiting())
            Actions.requirementList()
            InteractionManager.runAfterInteractions(() => dispatch(requirementListAction.getRequirementList(values)))
        }
    })(Requirement))