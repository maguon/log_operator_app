import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import * as truckAction from './TruckAction'
import { Actions } from 'react-native-router-flux'
import { Container, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { getFormValues } from 'redux-form'

class Truck extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    static defaultProps = {
        hasAll: false
    }

    componentDidMount() {
        this.props.getTruckListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getTruckList())
    }

    _onPress(param) {
        this.props.onSelect(param)
        Actions.pop()
    }



    render() {
        const { truckList } = this.props.truckReducer.data
        const { getTruckList } = this.props.truckReducer
        const { hasAll, searchTruckValues } = this.props
        if (getTruckList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            let list = !searchTruckValues && hasAll ? [{ id: null, truck_num: '全部' }, ...truckList] : truckList
            list = searchTruckValues ? list.filter(item => item.truck_num.indexOf(searchTruckValues.searchField) >= 0) : list
            return (
                <Container>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={list}
                        renderItem={({ item, index }) => <TouchableOpacity key={index} style={styles.item} onPress={() => this._onPress(item)}>
                            <Text style={globalStyles.midText}>{item.truck_num}</Text>
                        </TouchableOpacity>}
                    />
                </Container>
            )
        }
    }
}


const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = (state) => {
    return {
        truckReducer: state.truckReducer,
        searchTruckValues: getFormValues('searchForm')(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckList: (param) => {
        dispatch(truckAction.getTruckList(param))
    },
    getTruckListWaiting: () => {
        dispatch(truckAction.getTruckListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Truck)