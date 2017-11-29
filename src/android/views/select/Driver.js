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
import * as driverAction from '../../../actions/DriverAction'
import { Actions } from 'react-native-router-flux'

class Driver extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
        this.getDriverListMore = this.getDriverListMore.bind(this)
    }

    componentDidMount() {
        this.props.getDriverListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getDriverList({ OptionalParam: { start: 0, size: 30 } }))
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    getDriverListMore() {
        const { driverList, listLoadComplete } = this.props.driverReducer.data
        const { getDriverListMore } = this.props.driverReducer
        if (!listLoadComplete && getDriverListMore.isResultStatus != 1) {
            this.props.getDriverListMoreWaiting()
            this.props.getDriverListMore({ OptionalParam: { start: driverList.length, size: 30 } })
        }
    }

    render() {
        const { driverList } = this.props.driverReducer.data
        const { getDriverList,getDriverListMore } = this.props.driverReducer
        if (getDriverList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getDriverList.isResultStatus == 1}
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
                        onEndReached={this.getDriverListMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={getDriverListMore.isResultStatus == 1 ? <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator
                                animating={getDriverListMore.isResultStatus == 1}
                                style={{ height: 20 }}
                                size="large"
                            />
                            <Text style={{ fontSize: 11, paddingLeft: 10 }}>正在加载……</Text>
                        </View> : <View />}
                        data={driverList}
                        renderItem={({ item, index }) => <TouchableOpacity key={index} onPress={() => this._onPress(item)}>
                            <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                                <Text style={{ fontSize: 12 }}>{item.drive_name}</Text>
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
        driverReducer: state.driverReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverList: (param) => {
        dispatch(driverAction.getDriverList(param))
    },
    getDriverListWaiting: () => {
        dispatch(driverAction.getDriverListWaiting())
    },
    getDriverListMore: (param) => {
        dispatch(driverAction.getDriverListMore(param))
    },
    getDriverListMoreWaiting: () => {
        dispatch(driverAction.getDriverListMoreWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Driver)