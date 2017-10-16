import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'

import NavBar from './components/bar/NavBar'
import TopBar from './components/bar/TopBar'

import TabIcon from './components/TabIcon'

import Home from './views/blockInitial/Home'


const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 56
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#ccc',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ccc',
    },
    navigationBarStyle: {

    }
})

export default class App extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Router getSceneStyle={getSceneStyle}>
                <Scene key="root">
                    <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                        <Scene key="homeBlock" initial={true} icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                            <Scene key="home" initial={true} title='首页' component={Home} hideNavBar={false} navBar={TopBar} />
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}