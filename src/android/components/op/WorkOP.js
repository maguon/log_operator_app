import React from 'react'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const WorkOP = () => {
    return (
        <Button transparent onPress={Actions.addCarAtWorkBlock}>
            <Icon name="ios-add" style={{ fontSize: 30, color: '#fff' }} />
        </Button>
    )
}

export default WorkOP