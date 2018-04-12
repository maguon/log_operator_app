import React, { Component } from 'react'
import { Text, View, Dimensions, InteractionManager } from 'react-native'
import { Button, Container, Content } from 'native-base'
import { connect } from 'react-redux'
import { getFormValues, Field, reduxForm, change } from 'redux-form'
import Select from '../../components/share/form/Select'
import DatePicker from '../../components/share/form/DatePicker'
import CheckBox from '../../components/share/form/CheckBox'
import TextBox from '../../components/share/form/TextBox'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import * as RouterDirection from '../../../util/RouterDirection'
import * as selectDriverAction from '../select/driver/SelectDriverAction'
import * as commandListAction from '../commandList/CommandListAction'

const { width } = Dimensions.get('window')

const Work = props => {
    const { parent, queryWorkFormValues, resetBaseAddr, resetReceive, getSelectDriverListWaiting, getSelectDriverList, reset, getCommandListWaiting,
        getCommandList } = props
    return (
        <Container>
            <Content>
                <View style={{ flexDirection: 'row' }}>
                    <Field
                        label='装车时间：'
                        name='loadDateStart'
                        component={DatePicker}
                        itemStyle={{ width: width / 2 - 30 }} />
                    <Field
                        label='至：'
                        name='loadDateEnd'
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
                                if (queryWorkFormValues.baseAddr.item && id && queryWorkFormValues.baseAddr.item.city_id != id) {
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
                                if (queryWorkFormValues.receive.item && id && queryWorkFormValues.receive.item.city_id != id) {
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
                            cityId: queryWorkFormValues.routeStart.id,
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
                            cityId: queryWorkFormValues.routeEnd.id
                        })
                    }}
                />
                <Field label='执行指令编号：'
                    name='dpRouteTaskId'
                    component={TextBox}
                />
                <Field
                    name='car'
                    label='vin：'
                    component={Select}
                    onPress={({ onChange }) => RouterDirection.searchCar(parent)({ onSelect: onChange, hasAll: true })}
                />
                <Field
                    name='driver'
                    label='司机：'
                    component={Select}
                    onPress={({ onChange }) => {
                        getSelectDriverListWaiting()
                        RouterDirection.selectDriver(parent)({
                            onSelect: onChange,
                            searchFieldPlaceholder: '请输入司机姓名或电话',
                            hasAll: true
                        })
                        InteractionManager.runAfterInteractions(getSelectDriverList)
                    }}
                />
                <Field
                    name='truck'
                    label='货车：'
                    component={Select}
                    onPress={({ onChange }) => {
                        RouterDirection.selectTruck(parent)({
                            onSelect: (param) => {
                                const { id, truck_num } = param
                                onChange({ id, value: truck_num, item: param })
                            },
                            searchFieldPlaceholder: '请输入车牌号',
                            hasAll: true
                        })
                    }}
                />
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    <View style={{ flex: 1 }}>
                        <Button full
                            style={{ backgroundColor: styleColor, justifyContent: 'center', marginRight: 7.5 }}
                            onPress={() => {
                                getCommandListWaiting()
                                RouterDirection.commandList(parent)()
                                InteractionManager.runAfterInteractions(() => getCommandList(queryWorkFormValues))
                            }}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>确 定</Text>
                        </Button>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button full style={{ backgroundColor: styleColor, justifyContent: 'center', marginLeft: 7.5 }} onPress={reset}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>重 置</Text>
                        </Button>
                    </View>
                </View>
            </Content>
        </Container>
    )
}


const mapStateToProps = (state) => ({
    queryWorkFormValues: getFormValues('queryWorkForm')(state),
    initialValues: {
        routeStart: { id: null, value: '全部' },
        routeEnd: { id: null, value: '全部' },
        baseAddr: { id: null, value: '全部' },
        receive: { id: null, value: '全部' },
        driver: { id: null, value: '全部' },
        car: { id: null, value: '全部' },
        truck: { id: null, value: '全部' }
    }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    resetBaseAddr: () => {
        dispatch(change('queryWorkForm', 'baseAddr', { id: null, value: '全部' }))
    },
    resetReceive: () => {
        dispatch(change('queryWorkForm', 'receive', { id: null, value: '全部' }))
    },
    getSelectDriverListWaiting: () => {
        dispatch(selectDriverAction.getSelectDriverListWaiting())
    },
    getSelectDriverList: () => {
        dispatch(selectDriverAction.getSelectDriverList())
    },
    getCommandList: param => {
        dispatch(commandListAction.getCommandList(param))
    },
    getCommandListWaiting: () => {
        dispatch(commandListAction.getCommandListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'queryWorkForm',
        enableReinitialize: true
    })(Work))