import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native'
import { Button, Container, Content, ListItem, Spinner } from 'native-base'
import { connect } from 'react-redux'
import Select from '../../components/share/form/Select'
import DatePicker from '../../components/share/form/DatePicker'
import TextBox from '../../components/share/form/TextBox'
import * as RouterDirection from '../../../util/RouterDirection'
import * as addRequirementAction from './AddRequirementAction'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { requiredObj, required, trailerNumber } from '../../../util/Validator'

const validaterRequiredObj = requiredObj('必选')
const validaterRequired = required('必选')
const validaterTrailerNumber = trailerNumber('必须是1-99的数字')

const AddRequirement = props => {
    const { settingReducer: { data: { baseAddr, cityName, baseAddrId } }, parent, handleSubmit, createRequirementFormValues, resetReceive,
        addRequirementReducer: { addRequirement: { isResultStatus } } } = props
    return (
        <Container>
            <Content>
                <ListItem>
                    <Text style={globalStyles.midText}>起始城市：{cityName ? cityName : ''}</Text>
                </ListItem>
                <ListItem>
                    <Text style={globalStyles.midText}>装车地点：{baseAddr ? baseAddr : ''}</Text>
                </ListItem>
                <Field
                    name='routeEnd'
                    label='目的城市：'
                    isRequired={true}
                    component={Select}
                    validate={[validaterRequiredObj]}
                    onPress={({ onChange }) => {
                        RouterDirection.selectCity(parent)({
                            onSelect: (param) => {
                                const { id, city_name } = param
                                if (createRequirementFormValues.receive.item && createRequirementFormValues.receive.item.city_id != id) {
                                    resetReceive()
                                }
                                onChange({ id, value: city_name, item: param })
                            }
                        })
                    }}
                />
                <Field
                    name='receive'
                    label='送达地点：'
                    component={Select}
                    isRequired={true}
                    validate={[validaterRequiredObj]}
                    onPress={({ onChange }) => {
                        RouterDirection.selectReceive(parent)({
                            onSelect: (param) => {
                                const { id, short_name } = param
                                onChange({ id, value: short_name, item: param })
                            },
                            cityId: createRequirementFormValues.routeEnd.id
                        })
                    }}
                />
                <Field label='运车数量：'
                    name='preCount'
                    component={TextBox}
                    isRequired={true}
                    validate={[validaterRequired, validaterTrailerNumber]}
                />
                <Field
                    label='指令时间：'
                    isRequired={true}
                    validate={[validaterRequired]}
                    name='dateId'
                    component={DatePicker}
                />
                <View style={{ marginHorizontal: 15, marginTop: 30 }}>
                    {isResultStatus != 1 && <Button full style={{ backgroundColor: !baseAddrId ? '#ddd' : styleColor, justifyContent: 'center' }} disabled={!baseAddrId} onPress={handleSubmit}>
                        <Text style={{ color: '#fff' }}>确 定</Text>
                    </Button>}
                    {isResultStatus == 1 && <Spinner color={styleColor} />}
                </View>
                {!baseAddrId && <Text style={[globalStyles.midText, { color: 'red', padding: 15 }]}>*请先选择装车地点</Text>}
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        settingReducer: state.settingReducer,
        addRequirementReducer: state.addRequirementReducer,
        loginReducer: state.loginReducer,
        createRequirementFormValues: getFormValues('createRequirementForm')(state),
        initialValues: {
            routeEnd: {},
            receive: {}
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    resetReceive: () => {
        dispatch(change('createRequirementForm', 'receive', null))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createRequirementForm',
    enableReinitialize: true,
    onSubmit: (values, dispatch, props) => {
        dispatch(addRequirementAction.addRequirement(values))
    }
})(AddRequirement))
