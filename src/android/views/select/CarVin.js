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
import * as carVinAction from '../../../actions/CarVinAction'
import TextBox from '../../components/form/TextBox'
import { Actions } from 'react-native-router-flux'

class CarVin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
        }
        this._onPress = this._onPress.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.vin != nextState.vin) {
            if (nextState.vin == '') {
                this.props.cleanCarVin()
            } else {
                this.props.getCarVinList({
                    OptionalParam: {
                        vinCode: nextState.vin,
                        start: 0,
                        size: 12
                    }
                })
            }
        }
        return true
    }

    _onPress(item) {
        this.props.onSelect(item.vin)
        Actions.pop()
    }

    render() {
        const { carVinList } = this.props.carVinReducer.data
        return (
            <View style={{ flex: 1 }}>
                <TextBox
                    title='VIN码：'
                    value={this.state.vin ? this.state.vin : ''}
                    defaultValue={''}
                    onValueChange={(param) => this.setState({ vin: param })}
                    placeholder='请输入车牌'
                />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={carVinList}
                        renderItem={({ item, index }) => <TouchableNativeFeedback key={index} onPress={() => this._onPress(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                                <Text style={{ fontSize: 12 }}>{item.vin ? `${item.vin}` : ''}</Text>
                            </View>
                        </TouchableNativeFeedback>} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carVinReducer: state.carVinReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarVinList: (param) => {
        dispatch(carVinAction.getCarVinList(param))
    },
    cleanCarVin: () => {
        dispatch(carVinAction.cleanCarVin())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarVin)