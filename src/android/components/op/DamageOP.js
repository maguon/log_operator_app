import React, { Component } from 'react'
import {
    Text,
    View,
    Modal,
    TouchableOpacity,
    ART,
    Dimensions
} from 'react-native'
import { Button, Icon } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MenuForHeader from '../share/MenuForHeader'
import { Actions } from 'react-native-router-flux'
import * as routerDirection from '../../../util/RouterDirection'

class DamageOP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuModalIsVisible: false
        }
        this.changeMenuModalIsVisible = this.changeMenuModalIsVisible.bind(this)
    }

    changeMenuModalIsVisible(menuModalState) {
        this.setState({ menuModalIsVisible: menuModalState })
    }

    render() {
        const { parent } = this.props
        return (
            <View>
                <Button transparent onPress={() => this.setState({ menuModalIsVisible: true })}>
                    <EntypoIcon name="dots-three-vertical" style={{ fontSize: 20, color: '#fff' }} />
                </Button>
                <MenuForHeader
                    menuList={[
                        { icon: () => <Icon name='ios-add' style={{ fontSize: 20, color: '#777' }} />, title: '质损申报', route: routerDirection.applyDamage(parent) },
                        { icon: () => <Icon name='ios-search' style={{ fontSize: 16, color: '#777' }} />, title: '搜索', route: Actions.searchDamage }
                    ]}
                    menuModalIsVisible={this.state.menuModalIsVisible}
                    changeMenuModalIsVisible={this.changeMenuModalIsVisible}
                />
            </View>
        )
    }
}

export default DamageOP