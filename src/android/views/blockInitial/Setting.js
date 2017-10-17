import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'

export default class Setting extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Setting</Text>
            </View>
        )
    }
}