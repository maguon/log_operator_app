import React, { Component } from 'react'
import { Header, Title, Button, Icon } from 'native-base'
import { View, StatusBar, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class TopBar extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        rightType: 0, //0：不显示right 1:add
        onPressRight: () => { },
        leftType: 0, //0：不显示left 1:add
        onPressLeft: () => { },
        leftButtonTitle: ''
    }

    render() {
        const { title, layout } = this.props
        return (
            <View androidStatusBarColor='#00cade' style={{ flex: 1, position: 'absolute', top: 0, backgroundColor: '#fff', width: layout.initWidth }}>
                <StatusBar hidden={false} />
                <Header androidStatusBarColor='#00cade' style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                    {this.props.leftType == 1 && <View style={{ position: 'absolute', left: 0 }}>
                        <Button transparent onPress={this.props.onPressLeft}>
                            <Icon name="ios-pin" style={{ fontSize: 15, color: '#8cf8f6' }} />
                            <Text style={{ fontSize: 12, color: '#8cf8f6' }}>{this.props.leftButtonTitle}</Text>
                        </Button>
                    </View>}
                    <Title>{title}</Title>
                    {this.props.rightType == 1 && <View style={{ position: 'absolute', right: 0 }}>
                        <Button transparent onPress={this.props.onPressRight}>
                            <Icon name="md-add" style={{ fontSize: 20, color: '#8cf8f6' }} />
                        </Button>
                    </View>}
                </Header>
            </View>
        )
    }
}