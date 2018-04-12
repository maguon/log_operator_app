import React from 'react'
import { Text, InteractionManager } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as homeAction from '../../views/blockInitial/home/HomeAction'
import * as commandAction from '../../views/command/CommandAction'
import globalStyles from '../../GlobalStyles'

const CommandOP = props => {
    const { getHomeData, getCommandList, getCommandListWaiting } = props
    return (
        <Button transparent onPress={() => {
            getCommandListWaiting()
            InteractionManager.runAfterInteractions(() => {
                getCommandList()
                getHomeData()
            })
        }}>
            <Text style={[globalStyles.midText, { color: '#fff' }]}>刷新</Text>
        </Button>
    )
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    getHomeData: () => {
        dispatch(homeAction.getHomeData())
    },
    getCommandList: () => {
        const { initParam: { taskInfo: { id } } } = ownProps
        dispatch(commandAction.getCommandList({ dpRouteTaskId: id }))
    },
    getCommandListWaiting: () => {
        dispatch(commandAction.getCommandListWaiting())
    },
})

export default connect(null, mapDispatchToProps)(CommandOP)