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
import * as imageListForDemageAction from '../../components/demageInfo/imageListForDemage/ImageListForDemageAction'
import SinglePhotoView from '../photoView/SinglePhotoView'

const PhotoViewForDamageInfo = props => {
    const { imageListForDemageReducer: { data: { demageImageList, index } }, setDamageImageIndex } = props
    return (
        <SinglePhotoView
            initParam={{ imageUrlList: demageImageList.map(item => `${file_host}/image/${item.url}`), index }}
            onIndexChanged={(index) => setDamageImageIndex({ index })} />
    )
}

const mapStateToProps = (state) => ({
    imageListForDemageReducer: state.imageListForDemageReducer
})

const mapDispatchToProps = (dispatch) => ({
    setDamageImageIndex: param => {
        dispatch(imageListForDemageAction.setDamageImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewForDamageInfo)