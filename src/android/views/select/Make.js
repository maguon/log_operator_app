import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import * as makeAction from '../../../actions/MakeAction'
import { Actions } from 'react-native-router-flux'

class Make extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    componentDidMount() {
        this.props.getMakeListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getMakeList())
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    render() {
        const { makeList } = this.props.makeReducer.data
        const { getMakeList } = this.props.makeReducer
        if (getMakeList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getMakeList.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={makeList}
                        renderItem={({ item, index }) => <TouchableNativeFeedback key={index} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                                <Text style={{ fontSize: 12 }}>{item.make_name}</Text>
                            </View>
                        </TouchableNativeFeedback>}
                    />
                </View>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        makeReducer: state.makeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMakeList: () => {
        dispatch(makeAction.getMakeList())
    },
    getMakeListWaiting: () => {
        dispatch(makeAction.getMakeListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Make)