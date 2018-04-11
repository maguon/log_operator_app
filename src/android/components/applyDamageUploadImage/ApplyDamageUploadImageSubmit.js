import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'

const ApplyDamageUploadImageSubmit = props => {
    const { parent } = props
    return (
        <Button transparent onPress={() => Actions.pop({ popNum: 2 })}>
            <Text style={[globalStyles.midText, styles.text]}>完成</Text>
        </Button>
    )
}

export default ApplyDamageUploadImageSubmit

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
