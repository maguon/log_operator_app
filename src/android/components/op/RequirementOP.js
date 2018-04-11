import React from 'react'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as routerDirection from '../../../util/RouterDirection'

const RequirementOP = props => {
    const { parent } = props
    return (
        <Button transparent onPress={routerDirection.addRequirement(parent)}>
            <Icon name="ios-add" style={{ fontSize: 30, color: '#fff' }} />
        </Button>
    )
}

export default RequirementOP