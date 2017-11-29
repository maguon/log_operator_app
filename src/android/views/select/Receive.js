import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import * as receiveAction from '../../../actions/ReceiveAction'
import { Actions } from 'react-native-router-flux'

class Receive extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
        
    }

    componentDidMount() {
        this.props.getReceiveListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getReceiveList({ OptionalParam: { cityId: this.props.cityId } }))
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    render() {
        const { receiveList } = this.props.receiveReducer.data
        const { getRecevieList } = this.props.receiveReducer
        if (getRecevieList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getRecevieList.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={receiveList}
                        renderItem={({ item, index }) => <TouchableOpacity key={index} onPress={() => this._onPress(item)}>
                            <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                                <Text style={{ fontSize: 12 }}>{item.short_name}</Text>
                            </View>
                        </TouchableOpacity>}
                    />
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        receiveReducer: state.receiveReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getReceiveList: (param) => {
        dispatch(receiveAction.getReceiveList(param))
    },
    getReceiveListWaiting: () => {
        dispatch(receiveAction.getReceiveListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Receive)