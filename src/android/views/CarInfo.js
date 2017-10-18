import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'

export default class CarInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>CarInfo</Text>
            </View>
        )
    }
}