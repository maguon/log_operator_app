import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'

import NavBar from './components/bar/NavBar'
import TopBar from './components/bar/TopBar'

import TabIcon from './components/TabIcon'

import Home from './views/blockInitial/Home'
import Requirement from './views/blockInitial/Requirement'
import Setting from './views/blockInitial/Setting'
import Work from './views/blockInitial/Work'
import Task from './views/Task'
import Command from './views/Command'
import DriverInfo from './views/DriverInfo'
import Cars from './views/Cars'


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
                        <Scene key="homeBlock" icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                            <Scene key="home" title='首页' component={Home} hideNavBar={false} navBar={TopBar} />
                            <Scene key="task" title='司机任务' component={Task} hideNavBar={false} navBar={NavBar} />
                            <Scene key="command" title='调度指令' component={Command} hideNavBar={false} navBar={NavBar} />
                            <Scene key="driverInfo" title='司机信息' component={DriverInfo} hideNavBar={false} navBar={NavBar} />
                            <Scene key="cars" initial={true} title='装车信息' component={Cars} hideNavBar={false} navBar={NavBar} />
                        </Scene>
                        <Scene key="requirementBlock" icon={TabIcon} online='ios-bus' outline='ios-bus-outline' >
                            <Scene key="requirement" initial={true} title='工作' component={Requirement} hideNavBar={false} navBar={TopBar} />
                        </Scene>
                        <Scene key="workBlock" initial={true} icon={TabIcon} online='ios-archive' outline='ios-archive-outline' >
                            <Scene key="work" initial={true} title='工作' component={Work} hideNavBar={false} navBar={TopBar} />
                        </Scene>
                        <Scene key="settingmentBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                            <Scene key="setting" initial={true} title='工作' component={Setting} hideNavBar={false} navBar={TopBar} />
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}