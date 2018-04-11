import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import ImageItem from '../../share/ImageItem'
import globalStyles from '../../../GlobalStyles'
import { connect } from 'react-redux'
import { file_host } from '../../../../config/Host'
import * as routerDirection from '../../../../util/RouterDirection'
import * as imageListForDemageAction from './ImageListForDemageAction'
import { Actions } from 'react-native-router-flux'

const renderItem = props => {
    const { item, index, parent, demageImageList, setDamageImageIndex } = props
    return (
        <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => {
                setDamageImageIndex({ index })
                Actions.photoViewForDamageInfo()
            }} >
            <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
        </TouchableOpacity>
    )
}

const renderListEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={globalStyles.midText}>暂无照片</Text>
        </View>
    )
}

const ImageListForDemageInfo = props => {
    const { imageListForDemageReducer: { data: { demageImageList } }, parent, setDamageImageIndex } = props
    return (
        <FlatList
            style={styles.flatList}
            keyExtractor={(item, index) => index}
            data={demageImageList}
            numColumns={2}
            ListEmptyComponent={renderListEmpty}
            renderItem={({ item, index }) => renderItem({ item, index, parent, demageImageList, setDamageImageIndex })} />
    )
}

const mapStateToProps = (state) => {
    return {
        imageListForDemageReducer: state.imageListForDemageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    setDamageImageIndex: (param) => {
        dispatch(imageListForDemageAction.setDamageImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageListForDemageInfo)

const styles = StyleSheet.create({
    itemContainer: {
        margin: 5
    },
    flatList: {
        padding: 5
    },
    listEmptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

