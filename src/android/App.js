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
import RequirementInfo from './views/RequirementInfo'
import AddRequirement from './views/AddRequirement'
import City from './views/select/City'
import Entrust from './views/select/Entrust'
import Receive from './views/select/Receive'
import BaseAddr from './views/select/BaseAddr'
import RequirementList from './views/RequirementList'

import CarInfo from './views/CarInfo'
import AddCar from './views/AddCar'
import Password from './views/Password'
import Truck from './views/select/Truck'
import Driver from './views/select/Driver'
import CarVin from './views/select/CarVin'

import CommandList from './views/CommandList'
import TaskInfoAtWork from './views/TaskInfoAtWork'
import Make from './views/select/Make'
import AddCarImage from './views/AddCarImage'


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
                        <Scene key="homeBlock" icon={TabIcon} initial={true} online='ios-home' outline='ios-home-outline' >
                            <Scene key="home" title='首页'  initial={true}  component={Home} hideNavBar={false} navBar={TopBar} />
                            <Scene key="task" title='司机任务' component={Task} hideTabBar hideNavBar={false} navBar={NavBar} />
                            <Scene key="carVinAtHomeBlock" title='选择商品车' component={CarVin} hideNavBar={false} navBar={NavBar} />
                            <Scene key="command" title='调度指令'component={Command} hideTabBar hideNavBar={false} navBar={NavBar} />
                            <Scene key="driverInfo" title='司机信息' component={DriverInfo} hideNavBar={false} navBar={NavBar} />
                            <Scene key="cars" title='装车信息' component={Cars} hideNavBar={false} navBar={NavBar} />
                        </Scene>
                        <Scene key="workBlock" icon={TabIcon} online='ios-bus' outline='ios-bus-outline' >
                            <Scene key="work" title='工作' component={Work} hideNavBar={false} navBar={TopBar} />
                            <Scene key="addCar" title='增加商品车' component={AddCar} hideNavBar={false} navBar={NavBar} />
                            <Scene key="carInfoAtWorkBlock" title='商品车信息' component={CarInfo} hideNavBar={false} navBar={NavBar} />
                            <Scene key="cityAtWorkBlock" title='选择城市' component={City} hideNavBar={false} navBar={NavBar} />
                            <Scene key="entrustAtWorkBlock" title='选择委托方' component={Entrust} hideNavBar={false} navBar={NavBar} />
                            <Scene key="receiveAtWorkBlock" title='选择经销商' component={Receive} hideNavBar={false} navBar={NavBar} />
                            <Scene key="truckAtWorkBlock" title='选择货车' component={Truck} hideNavBar={false} navBar={NavBar} />
                            <Scene key="driverAtWorkBlock" title='选择司机' component={Driver} hideNavBar={false} navBar={NavBar} />
                            <Scene key="carVinAtWorkBlock" initial={true} title='选择商品车' component={CarVin} hideNavBar={false} navBar={NavBar} />
                            <Scene key="baseAddrAtWorkBlock" title='选择装车地点' component={BaseAddr} hideNavBar={false} navBar={NavBar} />
                            <Scene key="commandListAtWorkBlock" title='指令列表' component={CommandList} hideNavBar={false} hideTabBar navBar={NavBar} />
                            <Scene key="commandAtWorkBlock" title='指令列表' component={Command} hideNavBar={false} hideTabBar navBar={NavBar} />
                            <Scene key="taskInfoAtWork" title='装车信息' component={TaskInfoAtWork} hideNavBar={false} hideTabBar navBar={NavBar} />
                            <Scene key="makeAtWorkBlock" title='选择品牌' component={Make} hideNavBar={false} hideTabBar navBar={NavBar} />
                            <Scene key="addCarImage" title='添加照片' component={AddCarImage} hideNavBar={false} hideTabBar navBar={NavBar} />
                        </Scene>
                        <Scene key="requirementBlock" icon={TabIcon} online='ios-archive' outline='ios-archive-outline' >
                            <Scene key="requirement" rightType={1} title='需求管理' onPressRight={() => Actions.addRequirement()} component={Requirement} hideNavBar={false} navBar={TopBar} />
                            <Scene key="addRequirement" title='增加需求' component={AddRequirement} hideNavBar={false} navBar={NavBar} />
                            <Scene key="requirementInfo" title='需求详情' component={RequirementInfo} hideNavBar={false} navBar={NavBar} />
                            <Scene key="requirementList" title='需求列表' initial={true} component={RequirementList} hideNavBar={false} navBar={NavBar} />
                            <Scene key="cityAtRequirementBlock" title='选择城市' component={City} hideNavBar={false} navBar={NavBar} />
                            <Scene key="entrustAtRequirementBlock" title='选择委托方' component={Entrust} hideNavBar={false} navBar={NavBar} />
                            <Scene key="receiveAtRequirementBlock" title='选择送达地点' component={Receive} hideNavBar={false} navBar={NavBar} />
                            <Scene key="baseAddrAtRequirementBlock" title='选择装车地点' component={BaseAddr} hideNavBar={false} navBar={NavBar} />
                        </Scene>
                        <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                            <Scene key="setting" initial={true} title='设置' component={Setting} hideNavBar={false} navBar={TopBar} />
                            <Scene key="cityAtSettingBlock" title='选择城市' component={City} hideNavBar={false} navBar={NavBar} />
                            <Scene key="baseAddrAtSettingBlock" title='选择装车地点' component={BaseAddr} hideNavBar={false} navBar={NavBar} />
                            <Scene key="password" title='修改密码' component={Password} hideNavBar={false} navBar={NavBar} />
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}