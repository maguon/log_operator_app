import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon, ListItem, Button } from 'native-base'
import globalStyles, { textColor } from '../GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import Select from '../components/share/form/Select'
import RichTextBox from '../components/share/form/RichTextBox'
import * as routerDirection from '../../util/RouterDirection'
import * as selectDriverAction from './select/driver/SelectDriverAction'
import * as applyDamageSubmitAction from '../components/applyDamage/submit/ApplyDamageSubmitAction'

import { requiredObj, required } from '../../util/Validator'

const carValidator = requiredObj('必选')

class ApplyDamage extends Component {
    constructor(props) {
        super(props)
    }


    componentWillUnmount() {
        this.props.resetCreateDamage()
    }

    render() {
        const { getSelectDriverList, getSelectDriverListWaiting, parent, applyDamageFormValues = {}, applyDamageSubmitReducer: { data: { status } } } = this.props
        const { car, driver } = applyDamageFormValues
        return (
            <Container>
                <Content>
                    {status == 0 && <Field
                        name='car'
                        label='vin：'
                        component={Select}
                        isRequired={true}
                        validate={[carValidator]}
                        onPress={({ onChange }) => routerDirection.searchCar(parent)({ onSelect: onChange })}
                    />}
                    {status == 1 && <ListItem >
                        <Text>vin：{car.value}</Text>
                    </ListItem>}
                    {car && car.item.make_name && <ListItem >
                        <Text>品牌：{car.item.make_name}</Text>
                    </ListItem>}
                    {car && car.item.en_short_name && <ListItem >
                        <Text>委托方：{car.item.en_short_name}</Text>
                    </ListItem>}
                    {car && car.item.route_start && <ListItem >
                        <Text>始发地：{car.item.route_start}</Text>
                    </ListItem>}
                    {car && car.item.route_end && <ListItem >
                        <Text>目的地：{car.item.route_end}</Text>
                    </ListItem>}
                    {car && car.item.re_short_name && <ListItem >
                        <Text>经销商：{car.item.re_short_name}</Text>
                    </ListItem>}
                    <Field
                        name='driver'
                        label='货车司机：'
                        component={Select}
                        onPress={({ onChange }) => {
                            getSelectDriverListWaiting()
                            routerDirection.selectDriver(parent)({ onSelect: onChange, searchFieldPlaceholder: '请输入司机姓名或电话' })
                            InteractionManager.runAfterInteractions(getSelectDriverList)
                        }}
                    />
                    <Field
                        name='damageRemark'
                        label='质损描述：'
                        component={RichTextBox} />
                </Content>
            </Container >
        )
    }
}

const styles = StyleSheet.create({
    item: {
        margin: 15
    },
    label: {
        marginVertical: 15
    },
    itemSelectContainer: {
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingBottom: 15
    },
    itemSelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputArea: {
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 0.3,
        borderColor: '#777'
    }
})



const mapStateToProps = (state) => {
    return {
        applyDamageFormValues: getFormValues('applyDamageform')(state),
        applyDamageSubmitReducer: state.applyDamageSubmitReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getSelectDriverList: () => {
        dispatch(selectDriverAction.getSelectDriverList())
    },
    getSelectDriverListWaiting: () => {
        dispatch(selectDriverAction.getSelectDriverListWaiting())
    },
    resetCreateDamage: () => {
        dispatch(applyDamageSubmitAction.resetCreateDamage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'applyDamageform',
        onSubmit: (values, dispatch, props) => {
            const { parent } = props
            dispatch(applyDamageSubmitAction.submit({ values, parent }))
        }
    })(ApplyDamage)
)
