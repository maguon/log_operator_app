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
import * as baseAddrAction from './BaseAddrAction'
import { Actions } from 'react-native-router-flux'
import { Container, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'


class BaseAddr extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)

    }

    static defaultProps = {
        isMultistep: false,
        hasAll: false
    }

    componentDidMount() {
        this.props.getBaseAddrListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getBaseAddrList({ OptionalParam: { cityId: this.props.cityId } }))
    }

    _onPress(param) {
        if (!this.props.isMultistep) {
            this.props.onSelect(param)
            Actions.pop()
        } else {
            if (this.props.lastStep) {
                this.props.onSelect(param)
                Actions.pop({ popNum: this.props.stepNum })
            }
        }
    }

    render() {
        const { baseAddrList } = this.props.baseAddrReducer.data
        const { getBaseAddrList } = this.props.baseAddrReducer
        const { hasAll } = this.props
        if (getBaseAddrList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container >
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={hasAll ? [{ id: null, addr_name: '全部' }, ...baseAddrList] : baseAddrList}
                        renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => this._onPress(item)}>
                            <Text style={globalStyles.midText}>{item.addr_name}</Text>
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