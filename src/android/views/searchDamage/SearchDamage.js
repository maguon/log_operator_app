import React, { Component } from 'react'
import {
    Text,
    View,
} from 'react-native'
import { Container } from 'native-base'
import DatePicker from '../../components/share/form/DatePicker'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as searchDamageAction from './SearchDamageAction'

const SearchDamage = props => {
    return (
        <Container>
            <Field
                label='申报启始时间：'
                name='createdOnStart'
                component={DatePicker} />
            <Field
                label='申报终止时间：'
                name='createdOnEnd'
                component={DatePicker} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    const { searchDamageReducer: { data: { searchDamageForm } } } = state
    return {
        initialValues: {
            ...searchDamageForm
        }
    }
}

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'searchDamageform',
    onSubmit: (values, dispatch, props) => {
        const { parent } = props
        dispatch(searchDamageAction.setSearchDamageForm(values))
    }
})(SearchDamage))