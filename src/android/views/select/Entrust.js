import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import * as entrustAction from '../../../actions/EntrustAction'
import { Actions } from 'react-native-router-flux'

class Entrust extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    componentDidMount() {
        this.props.getEntrustListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getEntrustList({ OptionalParam: { cityId: this.props.cityId } }))
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    render() {
        const { entrustList } = this.props.entrustReducer.data
        const { getEntrustList } = this.props.entrustReducer
        if (getEntrustList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getEntrustList.isResultStatus == 1}
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
                    data={entrustList}
                    renderItem={({ item, index }) => <TouchableOpacity key={index} onPress={() => this._onPress(item)}>
                        <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                            <Text style={{ fontSize: 12 }}>{item.short_name}</Text>
                        </View>
                    </TouchableOpacity>}
                />
            </View>
        )
    }}
}

const mapStateToProps = (state) => {
    return {
        entrustReducer: state.entrustReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getEntrustList: (param) => {
        dispatch(entrustAction.getEntrustList(param))
    },
    getEntrustListWaiting: () => {
        dispatch(entrustAction.getEntrustListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Entrust)