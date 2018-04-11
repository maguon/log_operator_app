import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Button, Icon, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import * as routerDirection from '../../../util/RouterDirection'

const CreateCarOP = props => {
    const { submit, addCarReducer: { data: { status }, modifyCar, createCar }, parent } = props
    if (createCar.isResultStatus == 1) {
        return (
            <Spinner color='#fff' size={'small'} />
        )
    } else {
        return (
            <View style={{ flexDirection: 'row' }}>
                {status == 0 && createCar.isResultStatus != 1 && <Button transparent onPress={submit}>
                    <Text style={[globalStyles.midText, styles.text]}>下一步</Text>
                </Button>}
                {status == 0 && createCar.isResultStatus == 1 && <Spinner color='#fff' size={'small'} />}
                {status == 1 && modifyCar.isResultStatus != 1 && <Button transparent onPress={submit}>
                    <Text style={[globalStyles.midText, styles.text]}>修改</Text>
                </Button>}
                {status == 1 && modifyCar.isResultStatus == 1 && <Spinner color='#fff' size={'small'} />}
                {status == 1 && <Button transparent onPress={routerDirection.addCarImage(parent)}>
                    <Text style={[globalStyles.midText, styles.text]}>下一步</Text>
                </Button>}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})


const mapStateToProps = (state) => {
    return {
        addCarReducer: state.addCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    submit: () => {
        dispatch(submit('createCarForm'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCarOP)