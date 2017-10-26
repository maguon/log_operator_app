import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'

export default class TaskList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>TaskList</Text>
            </View>
        )
    }
}