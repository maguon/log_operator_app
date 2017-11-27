import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    InteractionManager,
    ToastAndroid
} from 'react-native'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as RouterDirection from '../../util/RouterDirection'
import * as carsAction from '../../actions/CarsAction'

class Cars extends Component {
    constructor(props) {
        super(props)
        this.onSelectCar = this.onSelectCar.bind(this)
        this.removeCar = this.removeCar.bind(this)
        this.renderListItem = this.renderListItem.bind(this)
        this.renderListFooter = this.renderListFooter.bind(this)
        this.finishCarry = this.finishCarry.bind(this)
    }

    componentDidMount() {
        const { commandInfo } = this.props.initParam
        this.props.getCommandCarListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getCommandCarList({
            requiredParam: {
                dpRouteLoadTaskId: 180
            },
            taskInfo: commandInfo
        }))
    }

    onSelectCar(param) {
        const { taskInfo } = this.props.carsReducer.data
        this.props.pushCarInCommandWaiting()
        InteractionManager.runAfterInteractions(() => this.props.pushCarInCommand({
            requiredParam: {
                userId: 81,
                dpRouteLoadTaskId: taskInfo.id,
            },
            OptionalParam: {
                truckId: taskInfo.truck_id,
                dpRouteTaskId: taskInfo.dp_route_task_id
            },
            postParam: {
                carId: param.id,
                vin: param.vin
            },
            car: {
                car_id: param.id,
                vin: param.vin,
                make_name: param.make_name
            }
        }))
    }

    componentWillReceiveProps(nextProps) {
        const { carList } = nextProps.carsReducer.data
        const { finishCarry } = nextProps.carsReducer
        const car = carList.find(item => {
            return item.removeCommandCar.isResultStatus == 2
        })
        if (car) {
            ToastAndroid.show('移除成功！', ToastAndroid.SHORT)
            this.props.resetRemoveCommandCar(car.data.id)
        }

        if (finishCarry.isResultStatus == 2) {
            ToastAndroid.show('装车完毕！', ToastAndroid.SHORT)
            this.props.resetFinishCarry()
        }
    }

    removeCar(param) {
        const { taskInfo } = this.props.carsReducer.data
        this.props.removeCommandCar({
            requiredParam: {
                userId: 81,
                dpRouteTaskDetailId: param.data.id
            },
            OptionalParam: {
                truckId: taskInfo.truck_id,
                carId: param.data.car_id
            }
        })
    }

    renderListFooter() {
        const { taskInfo } = this.props.carsReducer.data
        if (taskInfo.load_task_status == 1) {
            return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button small style={{ backgroundColor: '#00cade', padding: 10, margin: 10 }} onPress={this.finishCarry}>
                    <Text style={{ color: '#fff' }}>完成装车</Text>
                </Button>
            </View>
        } else {
            return <View />
        }
    }

    finishCarry() {
        const { taskInfo } = this.props.carsReducer.data
        this.props.finishCarry({
            requiredParam: {
                userId: 81,
                dpRouteLoadTaskId: taskInfo.id,
                loadTaskStatus: 3
            }
        })
    }

    renderListItem(item, index) {
        const { taskInfo } = this.props.carsReducer.data
        if (taskInfo.load_task_status == 1) {
            return <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' }}>
                <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='car' size={14} style={{ color: '#8c989f' }} />
                    <Text style={{ fontSize: 11, paddingLeft: 10 }}>VIN：{item.data.vin ? `${item.data.vin}` : ''}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 11 }}>{item.data.make_name ? `${item.data.make_name}` : ''}</Text>
                </View>
                {item.removeCommandCar.isResultStatus == 1 && <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator
                        animating={true}
                        style={{ height: 20, alignSelf: 'center' }}
                        size="small"
                    />
                </View>}
                {item.removeCommandCar.isResultStatus != 1 && <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                    <Icon name='ios-close-circle'
                        style={{ color: '#fe8a95', fontSize: 26 }}
                        onPress={() => this.removeCar(item)} />
                    <Icon name='ios-arrow-dropright-circle'
                        style={{ color: '#00cade', marginLeft: 10, fontSize: 26 }}
                        onPress={() => RouterDirection.carInfo(this.props.parent)({ initParam: { vin: item.data.vin, carId: item.data.car_id } })} />
                </View>}
            </View>
        } else {
            return <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' }}>
                <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='car' size={14} style={{ color: '#8c989f' }} />
                    <Text style={{ fontSize: 11, paddingLeft: 10 }}>VIN：{item.data.vin ? `${item.data.vin}` : ''}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 11 }}>{item.data.make_name ? `${item.data.make_name}` : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                    <Icon name='ios-arrow-dropright-circle'
                        style={{ color: '#00cade', marginLeft: 10, fontSize: 26 }}
                        onPress={() => RouterDirection.carInfo(this.props.parent)({ initParam: { vin: item.data.vin, carId: item.data.car_id } })} />
                </View>
            </View>
        }
    }

    render() {
        const { carList, taskInfo } = this.props.carsReducer.data
        const { pushCarInCommand, getCommandCarList } = this.props.carsReducer
        //console.log('this.props.carsReducer', this.props.carsReducer)
        if (getCommandCarList.isResultStatus == 1) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator
                            animating={getCommandCarList.isResultStatus == 1}
                            style={{ height: 80 }}
                            size="large"
                        />
                    </View>
                </View>)
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                        <Text style={{ fontSize: 11 }}>计划运送：{taskInfo.plan_count ? `${taskInfo.plan_count}` : '0'}</Text>
                        {taskInfo.load_task_status == 1 && pushCarInCommand.isResultStatus != 1 && <Button small rounded
                            style={{ backgroundColor: '#00cade', width: 70, height: 20, justifyContent: 'center', flexDirection: 'row' }}
                            onPress={() => RouterDirection.selectCarVin(this.props.parent)({ onSelect: this.onSelectCar })}>
                            <MaterialCommunityIcons name='car' size={14} style={{ color: '#fff' }} />
                            <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold', paddingLeft: 10 }}>装 车</Text>
                        </Button>}
                        {taskInfo.load_task_status == 1 && pushCarInCommand.isResultStatus == 1 && <View style={{ width: 70, alignItems: 'center' }}>
                            <ActivityIndicator
                                animating={true}
                                style={{ height: 20, alignSelf: 'center' }}
                                size="small"
                            />
                        </View>}
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={carList}
                            renderItem={({ item, index }) => this.renderListItem(item, index)}
                            ListFooterComponent={this.renderListFooter} />
                    </View>
                </View>
            )
        }
    }
}



const mapStateToProps = (state) => {
    return {
        carsReducer: state.carsReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeCommandCar: (param) => {
        dispatch(carsAction.removeCommandCar(param))
    },
    resetRemoveCommandCar: (param) => {
        dispatch(carsAction.resetRemoveCommandCar(param))
    },
    pushCarInCommand: (param) => {
        dispatch(carsAction.pushCarInCommand(param))
    },
    resetPushCarInCommand: (param) => {
        dispatch(carsAction.resetPushCarInCommand(param))
    },
    pushCarInCommandWaiting: () => {
        dispatch(carsAction.pushCarInCommandWaiting())
    },
    getCommandCarList: (param) => {
        dispatch(carsAction.getCommandCarList(param))
    },
    getCommandCarListWaiting: () => {
        dispatch(carsAction.getCommandCarListWaiting())
    },
    finishCarry: (param) => {
        dispatch(carsAction.finishCarry(param))
    },
    resetFinishCarry: () => {
        dispatch(carsAction.resetFinishCarry())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cars)