import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'

//tab
import TabIcon from './components/share/TabIcon'

//header 
import ApplyDamageUploadImageSubmit from '../android/components/applyDamageUploadImage/ApplyDamageUploadImageSubmit'
import ApplyDamageSubmit from '../android/components/applyDamage/submit/ApplyDamageSubmit'
import CreateCarOP from './components/op/CreateCarOP'
import CommandOP from './components/op/CommandOP'
import DamageOP from './components/op/DamageOP'
import HomeLeftButton from './components/HomeLeftButton'
import HomeOP from './components/op/HomeOP'
import LeftButton from '../android/components/share/LeftButton'
import NavBar from './components/bar/NavBar'
import NewNavBar from './components/share/bar/NavBar'
import NavSearchBar from '../android/components/share/bar/NavSearchBar'
import NavSearchCarBar from '../android/components/share/bar/NavSearchCarBar'
import PhotoViewNavBar from '../android/components/share/bar/PhotoViewNavBar'
import RequirementOP from './components/op/RequirementOP'
import SearchDamageOP from './components/op/SearchDamageOP'
import UploadImageForCreateCarOP from './components/op/UploadImageForCreateCarOP'
import WorkOP from './components/op/WorkOP'
// import TopBar from './components/bar/TopBar'

//body
import AddCar from './views/createCar/AddCar'
import AddCarImage from './views/uploadImageForCreateCar/AddCarImage'
import AddRequirement from './views/createRequirement/AddRequirement'
import ApplyDamage from './views/ApplyDamage'
import ApplyDamageUploadImage from './views/applyDamageUploadImage/ApplyDamageUploadImage'
import BaseAddr from './views/select/baseAddr/BaseAddr'
import Command from './views/command/Command'
import City from './views/select/city/City'
import Cars from './views/cars/Cars'
import CarInfo from './views/carInfo/CarInfo'
import CommandList from './views/commandList/CommandList'
import DriverInfo from './views/DriverInfo'
import DemageInfo from './views/demageInfo/DemageInfo'
import DemageList from './views/demageList/DemageList'
import Entrust from './views/select/entrust/Entrust'
import Home from './views/blockInitial/home/Home'
import Initialization from './views/initialization/Initialization'
import Login from './views/login/Login'
import Make from './views/select/make/Make'
import PhotoViewForApplyDamage from './views/photoView/PhotoViewForApplyDamage'
import PhotoViewForDamageInfo from './views/demageInfo/PhotoViewForDamageInfo'
import PhotoViewForCarInfo from './views/photoView/PhotoViewForCarInfo'
import PersonalCenter from './views/personalCenter/PersonalCenter'
import PhotoViewForCreateCar from './views/photoView/PhotoViewForCreateCar'
import QRCodeScreen from './views/QRCodeScreen'
import Requirement from './views/blockInitial/Requirement'
import RequirementInfo from './views/requirementInfo/RequirementInfo'
import Receive from './views/select/receive/Receive'
import RequirementList from './views/requirementList/RequirementList'
import RetrievePassword from './views/retrievePassword/RetrievePassword'
import ResponsibilityList from './views/responsibilityList/ResponsibilityList'
import ResponsibilityInfo from './views/responsibilityInfo/ResponsibilityInfo'
import Setting from './views/blockInitial/setting/Setting'
import SinglePhotoView from './views/photoView/SinglePhotoView'
import selectDriver from './views/select/driver/SelectDriver'
import SelectDriver from './views/select/driver/SelectDriver'
import SearchCar from './views/select/searchCar/SearchCar'
import SearchDamage from './views/searchDamage/SearchDamage'
import Task from './views/task/Task'
import Truck from './views/select/truck/Truck'
import TaskInfoAtWork from './views/taskInfoAtWork/TaskInfoAtWork'
import UpdatePassword from './views/updatePassword/UpdatePassword'
import Work from './views/blockInitial/Work'

// import CarVin from './views/select/CarVin'


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


const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer
    }
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
    navigationBarStyle: {

    }
})

export default class App extends Component {
    constructor(props) {
        super(props)
    }


    componentWillMount() {

        Orientation.lockToPortrait()
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router getSceneStyle={getSceneStyle}>
                <Scene key="root">
                    <Scene initial={true} key="initialization" component={Initialization} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            const { user } = props.loginReducer.data
                            if (user.mobile
                                && user.token
                                && user.uid
                                && user.status
                                && user.type) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}>
                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                            <Scene key="retrievePassword"
                                title='找回密码'
                                hideNavBar={false}
                                LeftButton={LeftButton}
                                component={RetrievePassword}
                                hideTabBar
                                navBar={NewNavBar} />
                        </Scene>
                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" initial={true} icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home"
                                    initial={true}
                                    component={Home}
                                    hideNavBar={false}
                                    navBar={NewNavBar}
                                    LeftButton={HomeLeftButton}
                                    RightButton={HomeOP} />
                                <Scene key="task"
                                    title='司机任务'
                                    isRequirePopRefresh={true}
                                    component={Task}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="command"
                                    LeftButton={LeftButton}
                                    title='调度指令'
                                    RightButton={CommandOP}
                                    component={Command}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="driverInfo"
                                    title='司机信息'
                                    LeftButton={LeftButton}
                                    component={DriverInfo}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="cars"
                                    title='装车信息'
                                    LeftButton={LeftButton}
                                    component={Cars}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="carInfoAtHomeBlock"
                                    title='商品车信息'
                                    LeftButton={LeftButton}
                                    component={CarInfo}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene
                                    key="singlePhotoViewAtHomeBlock"
                                    title='照片'
                                    LeftButton={LeftButton}
                                    component={SinglePhotoView}
                                    hideTabBar
                                    navBar={PhotoViewNavBar} />
                                <Scene key="qrCodeScreen"
                                    title='扫一扫'
                                    LeftButton={LeftButton}
                                    component={QRCodeScreen}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                {/*share components*/}
                                <Scene key="photoViewForCreateCarAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={PhotoViewForCreateCar}
                                    navBar={PhotoViewNavBar}
                                    title='照片'
                                    hideTabBar />
                                <Scene key="photoViewForApplyDamageAtHomeBlock"
                                    LeftButton={LeftButton}
                                    component={PhotoViewForApplyDamage}
                                    navBar={PhotoViewNavBar}
                                    title='照片'
                                    hideTabBar />
                                <Scene key="applyDamageAtHomeBlock"
                                    title='质损申报'
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    component={ApplyDamage}
                                    RightButton={ApplyDamageSubmit}
                                    navBar={NewNavBar} />
                                <Scene key="applyDamageUploadImageAtHomeBlock"
                                    title='上传质损申报照片'
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    component={ApplyDamageUploadImage}
                                    RightButton={ApplyDamageUploadImageSubmit}
                                    navBar={NewNavBar} />
                                <Scene key="addRequirementAtHomeBlock"
                                    title='增加需求'
                                    component={AddRequirement}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="addCarAtHomeBlock"
                                    title='增加商品车'
                                    RightButton={CreateCarOP}
                                    component={AddCar}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="addCarImageAtHomeBlock"
                                    title='添加照片'
                                    RightButton={UploadImageForCreateCarOP}
                                    LeftButton={LeftButton}
                                    component={AddCarImage}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="cityAtHomeBlock"
                                    title='选择城市'
                                    LeftButton={LeftButton}
                                    component={City}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="entrustAtHomeBlock"
                                    title='选择委托方'
                                    component={Entrust}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="receiveAtHomeBlock"
                                    title='选择经销商'
                                    component={Receive}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="baseAddrAtHomeBlock"
                                    title='选择装车地点'
                                    LeftButton={LeftButton}
                                    component={BaseAddr}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="makeAtHomeBlock"
                                    title='选择品牌'
                                    LeftButton={LeftButton}
                                    component={Make}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="searchCarAtHomeBlock"
                                    hideTabBar
                                    component={SearchCar}
                                    navBar={NavSearchCarBar} />
                                {/*share components*/}
                            </Scene>
                            <Scene key="workBlock" icon={TabIcon} online='ios-bus' outline='ios-bus-outline' >
                                <Scene key="work"
                                    title='工作'
                                    initial={true}
                                    RightButton={WorkOP}
                                    component={Work}
                                    navBar={NewNavBar} />
                                <Scene key="addCarAtWorkBlock"
                                    title='增加商品车'
                                    RightButton={CreateCarOP}
                                    component={AddCar}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="carInfoAtWorkBlock"
                                    title='商品车信息'
                                    component={CarInfo}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="cityAtWorkBlock"
                                    title='选择城市'
                                    component={City}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="entrustAtWorkBlock"
                                    title='选择委托方'
                                    component={Entrust}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="receiveAtWorkBlock"
                                    title='选择经销商'
                                    component={Receive}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="truckAtWorkBlock"
                                    title='选择货车'
                                    component={Truck}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NavSearchBar} />
                                <Scene key="selectDriverAtWorkBlock"
                                    title='选择司机'
                                    component={selectDriver}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NavSearchBar} />
                                {/* <Scene key="carVinAtWorkBlock"
                                    title='选择商品车'
                                    component={CarVin}
                                    hideNavBar={false}
                                    hideTabBar={true}
                                    navBar={NavBar} /> */}
                                <Scene key="baseAddrAtWorkBlock"
                                    title='选择装车地点'
                                    component={BaseAddr}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="commandListAtWorkBlock"
                                    title='指令列表'
                                    LeftButton={LeftButton}
                                    component={CommandList}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="commandAtWorkBlock"
                                    title='指令列表'
                                    LeftButton={LeftButton}
                                    component={Command}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="taskInfoAtWork"
                                    title='装车信息'
                                    component={TaskInfoAtWork}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="makeAtWorkBlock"
                                    title='选择品牌'
                                    LeftButton={LeftButton}
                                    component={Make}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="addCarImageAtWorkBlock"
                                    title='添加照片'
                                    RightButton={UploadImageForCreateCarOP}
                                    LeftButton={LeftButton}
                                    component={AddCarImage}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="searchCarAtWorkBlock"
                                    hideTabBar
                                    component={SearchCar}
                                    navBar={NavSearchCarBar} />
                                <Scene key="singlePhotoViewAtWorkBlock"
                                    component={SinglePhotoView}
                                    hideNavBar={true}
                                    hideTabBar={true} />
                                <Scene key="photoViewforCarInfoAtWorkBlock"
                                    LeftButton={LeftButton}
                                    component={PhotoViewForCarInfo}
                                    navBar={PhotoViewNavBar}
                                    title='照片'
                                    hideTabBar />
                                <Scene key="photoViewForCreateCarAtWorkBlock"
                                    LeftButton={LeftButton}
                                    component={PhotoViewForCreateCar}
                                    navBar={PhotoViewNavBar}
                                    title='照片'
                                    hideTabBar />
                            </Scene>
                            <Scene key="requirementBlock" icon={TabIcon} online='ios-archive' outline='ios-archive-outline' >
                                <Scene key="requirement"
                                    initial={true}
                                    RightButton={RequirementOP}
                                    title='需求管理'
                                    component={Requirement}
                                    navBar={NewNavBar} />
                                <Scene key="requirementInfo"
                                    title='需求详情'
                                    LeftButton={LeftButton}
                                    component={RequirementInfo}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="requirementList"
                                    title='需求列表'
                                    LeftButton={LeftButton}
                                    component={RequirementList}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                {/*share components*/}
                                <Scene key="carInfoAtRequirementBlock"
                                    title='商品车信息'
                                    component={CarInfo}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="addRequirementAtRequirementBlock"
                                    title='增加需求'
                                    LeftButton={LeftButton}
                                    component={AddRequirement}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="cityAtRequirementBlock"
                                    title='选择城市'
                                    LeftButton={LeftButton}
                                    component={City}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                {/* <Scene key="entrustAtRequirementBlock"
                                    title='选择委托方'
                                    LeftButton={LeftButton}
                                    component={Entrust}
                                    hideTabBar
                                    navBar={NewNavBar} /> */}
                                <Scene key="receiveAtRequirementBlock"
                                    title='选择送达地点'
                                    LeftButton={LeftButton}
                                    component={Receive}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="baseAddrAtRequirementBlock"
                                    title='选择装车地点'
                                    LeftButton={LeftButton}
                                    component={BaseAddr}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="taskInfoAtWorkAtRequirementBlock"
                                    title='装车信息'
                                    LeftButton={LeftButton}
                                    component={TaskInfoAtWork}
                                    hideTabBar
                                    navBar={NewNavBar} />
                                <Scene key="photoViewforCarInfoAtRequirementBlock"
                                    LeftButton={LeftButton}
                                    component={PhotoViewForCarInfo}
                                    navBar={PhotoViewNavBar}
                                    title='照片'
                                    hideTabBar />
                                {/*share components*/}
                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting"
                                    initial={true}
                                    title='设置'
                                    component={Setting}
                                    navBar={NewNavBar} />
                                <Scene key="responsibilityList"
                                    title='我的责任'
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    component={ResponsibilityList}
                                    navBar={NewNavBar} />
                                <Scene key="responsibilityInfo"
                                    title='责任详情'
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    component={ResponsibilityInfo}
                                    navBar={NewNavBar} />
                                <Scene key="demageList"
                                    title='我申报的质损'
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    component={DemageList}
                                    RightButton={DamageOP}
                                    navBar={NewNavBar} />
                                <Scene key="demageInfo"
                                    title='质损详情'
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    component={DemageInfo}
                                    navBar={NewNavBar} />
                                <Scene key="searchDamage"
                                    title='搜索我申报的质损'
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    component={SearchDamage}
                                    RightButton={SearchDamageOP}
                                    navBar={NewNavBar} />
                                <Scene key="personalCenter"
                                    title='个人中心'
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    component={PersonalCenter}
                                    navBar={NewNavBar} />
                                <Scene key="updatePassword"
                                    title='修改密码'
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    component={UpdatePassword}
                                    navBar={NewNavBar} />
                                <Scene key="photoViewForDamageInfo"
                                    LeftButton={LeftButton}
                                    component={PhotoViewForDamageInfo}
                                    navBar={PhotoViewNavBar}
                                    title='照片'
                                    hideTabBar />
                                {/*share components*/}
                                <Scene key="applyDamageAtSettingBlock"
                                    title='质损申报'
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    component={ApplyDamage}
                                    RightButton={ApplyDamageSubmit}
                                    navBar={NewNavBar} />
                                <Scene key="applyDamageUploadImageAtSettingBlock"
                                    title='上传质损申报照片'
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    component={ApplyDamageUploadImage}
                                    RightButton={ApplyDamageUploadImageSubmit}
                                    navBar={NewNavBar} />
                                <Scene key="photoViewForApplyDamageAtSettingBlock"
                                    LeftButton={LeftButton}
                                    component={PhotoViewForApplyDamage}
                                    navBar={PhotoViewNavBar}
                                    title='照片'
                                    hideTabBar />
                                <Scene key="baseAddrAtSettingBlock"
                                    title='选择装车地点'
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    component={BaseAddr}
                                    navBar={NewNavBar} />
                                <Scene key="selectDriverAtSettingBlock"
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    component={SelectDriver}
                                    navBar={NavSearchBar} />
                                <Scene key="searchCarAtSettingBlock"
                                    hideTabBar
                                    component={SearchCar}
                                    navBar={NavSearchCarBar} />
                                <Scene key="cityAtSettingBlock"
                                    title='选择城市'
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    component={City}
                                    navBar={NewNavBar} />
                                {/*share components*/}
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}