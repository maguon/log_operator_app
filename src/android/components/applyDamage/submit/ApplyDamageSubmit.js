import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Spinner } from 'native-base'
import { submit } from 'redux-form'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import * as routerDirection from '../../../../util/RouterDirection'

const ApplyDamageSubmit = props => {
    const { submit,
        applyDamageSubmitReducer: { data: { status },
            createDamage, modifyDamage }, parent } = props
   // console.log('props', props)
    if (createDamage.isResultStatus == 1) {
        return (
            <Spinner color='#fff' size={'small'} />
        )
    } else {
        return (
            <View style={{ flexDirection: 'row' }}>
                {status == 0 && createDamage.isResultStatus != 1 && <Button transparent onPress={submit}>
                    <Text style={[globalStyles.midText, styles.text]}>下一步</Text>
                </Button>}
                {status == 0 && createDamage.isResultStatus == 1 && <Spinner color='#fff' size={'small'} />}
                {status == 1 && modifyDamage.isResultStatus != 1 && <Button transparent onPress={submit}>
                    <Text style={[globalStyles.midText, styles.text]}>修改</Text>
                </Button>}
                {status == 1 && modifyDamage.isResultStatus == 1 && <Spinner color='#fff' size={'small'} />}
                {status == 1 && <Button transparent onPress={routerDirection.applyDamageUploadImage(parent)}>
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
        applyDamageSubmitReducer: state.applyDamageSubmitReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    submit: () => {
        dispatch(submit('applyDamageform'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyDamageSubmit)
