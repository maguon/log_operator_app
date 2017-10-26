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
import * as truckAction from '../../../actions/TruckAction'
import { Actions } from 'react-native-router-flux'

class Truck extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
        this.getTruckListMore = this.getTruckListMore.bind(this)

    }

    componentDidMount() {
        this.props.getTruckListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getTruckList({ OptionalParam: { start: 0, size: 30 } }))
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }

    getTruckListMore() {
        const { truckList, listLoadComplete } = this.props.truckReducer.data
        const { getTruckListMore } = this.props.truckReducer
        if (!listLoadComplete && getTruckListMore.isResultStatus != 1) {
            this.props.getTruckListMoreWaiting()
            this.props.getTruckListMore({ OptionalParam: { start: truckList.length, size: 30 } })
        }
    }

    render() {
        const { truckList } = this.props.truckReducer.data
        const { getTruckList,getTruckListMore } = this.props.truckReducer
        console.log(truckList)
        if (getTruckList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getTruckList.isResultStatus == 1}
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
                        onEndReached={this.getTruckListMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={getTruckListMore.isResultStatus == 1 ? <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator
                                animating={getTruckListMore.isResultStatus == 1}
                                style={{ height: 20 }}
                                size="large"
                            />
                            <Text style={{ fontSize: 11, paddingLeft: 10 }}>正在加载……</Text>
                        </View> : <View />}
                        data={truckList}
                        renderItem={({ item, index }) => <TouchableNativeFeedback key={index} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                                <Text style={{ fontSize: 12 }}>{item.truck_num}</Text>
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
        truckReducer: state.truckReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckList: (param) => {
        dispatch(truckAction.getTruckList(param))
    },
    getTruckListWaiting: () => {
        dispatch(truckAction.getTruckListWaiting())
    },
    getTruckListMore: (param) => {
        dispatch(truckAction.getTruckListMore(param))
    },
    getTruckListMoreWaiting: () => {
        dispatch(truckAction.getTruckListMoreWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Truck)