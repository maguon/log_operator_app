import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'

const renderListItem = props => {
    const { item: { drive_name, tel, id }, item, onSelect } = props
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                onSelect({ id, value: drive_name, item })
                Actions.pop()
            }}>
            <Text style={globalStyles.midText}>{drive_name ? `${drive_name}` : ''}</Text>
            <Text style={globalStyles.midText}>{tel ? `${tel}` : ''}</Text>
        </TouchableOpacity>
    )
}

const SelectDriver = props => {
    const { onSelect,
        hasAll = false,
        searchDriverValues,
        selectDriverReducer: { data: { driverList }, getSelectDriverList } } = props
    if (getSelectDriverList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        let list = !searchDriverValues && hasAll ? [{ id: null, drive_name: '全部' }, ...driverList] : driverList
        list = searchDriverValues ? list.filter(item => item.drive_name.indexOf(searchDriverValues.searchField) >= 0 || item.tel.indexOf(searchDriverValues.searchField) >= 0) : list

        return (

            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={list}
                    renderItem={(param) => renderListItem({ onSelect, ...param })} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = (state) => {
    return {
        selectDriverReducer: state.selectDriverReducer,
        searchDriverValues: getFormValues('searchForm')(state)
    }
}

export default connect(mapStateToProps)(SelectDriver)