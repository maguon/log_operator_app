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
import * as cityAction from '../../../actions/CityAction'
import { Actions } from 'react-native-router-flux'
import * as RouterDirection from '../../../util/RouterDirection'

class City extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    static defaultProps = {
        isMultistep: false
    }


    componentDidMount() {
        this.props.getCityListWaiting()
        InteractionManager.runAfterInteractions(this.props.getCityList)
    }

    _onPress(param) {
        if (!this.props.isMultistep) {
            this.props.onSelect(param)
            Actions.pop()
        } else {
            RouterDirection.selectBaseAddr(this.props.parent)({
                isMultistep: true,
                lastStep: true,
                stepNum: 2,
                cityId: param.id,
                onSelect: this.props.onSelect
            })
        }
    }

    render() {
        const { cityList } = this.props.cityReducer.data
        const { getCityList } = this.props.cityReducer
        if (getCityList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getCityList.isResultStatus == 1}
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
                        data={cityList}
                        renderItem={({ item, index }) => <TouchableNativeFeedback key={index} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                                <Text style={{ fontSize: 12 }}>{item.city_name}</Text>
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
        cityReducer: state.cityReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCityList: () => {
        dispatch(cityAction.getCityList())
    },
    getCityListWaiting: () => {
        dispatch(cityAction.getCityListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(City)