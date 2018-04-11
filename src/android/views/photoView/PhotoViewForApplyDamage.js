import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StatusBar,
} from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { file_host } from '../../../config/Host'
import * as applyDamageUploadImageAction from '../applyDamageUploadImage/ApplyDamageUploadImageAction'
import SinglePhotoView from './SinglePhotoView'

const PhotoViewForApplyDamage = props => {
    const { applyDamageUploadImageReducer: { data: { imageList, index } }, setDamageImageIndex } = props
    
    return (
        <SinglePhotoView
            initParam={{ imageUrlList: imageList.map(url => `${file_host}/image/${url}`), index }}
            onIndexChanged={(index) => setDamageImageIndex({ index })} />
    )
}

const mapStateToProps = (state) => ({
    applyDamageUploadImageReducer: state.applyDamageUploadImageReducer
})

const mapDispatchToProps = (dispatch) => ({
    setDamageImageIndex: param => {
        dispatch(applyDamageUploadImageAction.setDamageImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewForApplyDamage)