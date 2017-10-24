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
import * as baseAddrAction from '../../../actions/BaseAddrAction'
import { Actions } from 'react-native-router-flux'


class BaseAddr extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)

    }

    componentDidMount() {
        this.props.getBaseAddrListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getBaseAddrList({ OptionalParam: { cityId: this.props.cityId } }))
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    render() {
        const { baseAddrList } = this.props.baseAddrReducer.data
        const { getBaseAddrList } = this.props.baseAddrReducer
        if (getBaseAddrList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getBaseAddrList.isResultStatus == 1}
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
                        data={baseAddrList}
                        renderItem={({ item, index }) => <TouchableNativeFeedback key={index} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                                <Text style={{ fontSize: 12 }}>{item.addr_name}</Text>
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
        baseAddrReducer: state.baseAddrReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getBaseAddrList: (param) => {
        dispatch(baseAddrAction.getBaseAddrList(param))
    },
    getBaseAddrListWaiting: () => {
        dispatch(baseAddrAction.getBaseAddrListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(BaseAddr)