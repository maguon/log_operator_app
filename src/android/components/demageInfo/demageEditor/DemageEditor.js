import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as routerDirection from '../../../../util/RouterDirection'
import { Container, Content, Input, Label, Icon, Button } from 'native-base'
import globalStyles, { textColor, styleColor } from '../../../GlobalStyles'
import * as selectDriverAction from '../../../views/select/driver/SelectDriverAction'
import * as demageEditorAction from './DemageEditorAction'
import moment from 'moment'
import RichTextBox from '../../share/form/RichTextBox'
import select from '../../share/form/Select'
import { Actions } from 'react-native-router-flux'

const DemageEditor = props => {
    const { getSelectDriverList,
        getSelectDriverListWaiting,
        handleSubmit,
        demageEditorReducer: { updateDamage: { isResultStatus } },
        parent,
        initParam: { id, created_on, car_id, vin, damage_status } } = props
    return (
        <Container>
            <Content>
                <View style={[styles.header]}>
                    <View style={styles.headerItem}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>质损编号：{id ? `${id}` : ''}</Text>
                        {damage_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>待处理</Text>}
                        {damage_status == 2 && <Text style={[globalStyles.midText, globalStyles.styleColor]}>处理中</Text>}
                        {damage_status == 3 && <Text style={[globalStyles.midText]}>已处理</Text>}
                    </View>
                    <View style={styles.headerStatusItem}>
                        <Text style={globalStyles.smallText}>申报时间：{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                </View>
                <Field
                    name='driver'
                    label='货车司机：'
                    component={select}
                    textStyle={globalStyles.styleColor}
                    onPress={({ onChange }) => {
                        getSelectDriverListWaiting()
                        routerDirection.selectDriver(parent)({ onSelect: onChange, searchFieldPlaceholder: '请输入司机姓名或电话' })
                        InteractionManager.runAfterInteractions(getSelectDriverList)
                    }}
                />
                <Field
                    name='damageRemark'
                    label='质损描述：'
                    textStyle={globalStyles.styleColor}
                    component={RichTextBox} />
                <View style={{ margin: 15 }}>
                    {isResultStatus != 1 && <Button full
                        style={[globalStyles.styleBackgroundColor]}
                        onPress={handleSubmit}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>修改</Text>
                    </Button>}
                    {isResultStatus == 1 && <ActivityIndicator color={styleColor} size='large' />}
                </View>
            </Content>
        </Container>
    )
}


const styles = StyleSheet.create({
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    header: {
        borderBottomWidth: 0.3,
        borderColor: '#ddd',
        backgroundColor: '#f4f4f4',
        padding: 15
    },
    headerStatusItem: {
        alignItems: 'flex-end',
        paddingVertical: 5
    }
})

const mapStateToProps = (state, ownProps) => {
    const { initParam: { damage_explain, drive_name, drive_id, truck_id, truck_num } } = ownProps
    return {
        initialValues: {
            damageRemark: damage_explain,
            driver: {
                id: drive_id,
                value: drive_name,
                item: { truck_id, truck_num }
            }
        },
        demageEditorReducer: state.demageEditorReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSelectDriverList: () => {
        dispatch(selectDriverAction.getSelectDriverList())
    },
    getSelectDriverListWaiting: () => {
        dispatch(selectDriverAction.getSelectDriverListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'demageEditorForm',
    onSubmit: (values, dispatch, props) => {
        const { parent, initParam: { car_id, vin, id } } = props
        dispatch(demageEditorAction.updateDamage({ values: { car: { id: car_id, vin }, ...values }, parent, damageId: id }))
    }
})(DemageEditor))
