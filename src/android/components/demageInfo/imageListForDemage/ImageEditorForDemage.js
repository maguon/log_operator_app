import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import ImageItem from '../../share/ImageItem'
import globalStyles from '../../../GlobalStyles'
import { connect } from 'react-redux'
import CameraButton from '../../../components/share/CameraButton'
import { file_host } from '../../../../config/Host'
import { Container, Content, Input, Label, Icon } from 'native-base'
import * as  imageListForDemageAction from './ImageListForDemageAction'
import * as routerDirection from '../../../../util/RouterDirection'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadDamageImageWaiting, uploadDamageImage, demageImageList, parent, damageId, setDamageImageIndex, vin } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadDamageImageWaiting, uploadDamageImage, damageId, vin })
    } else {
        return (
            <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => {
                    setDamageImageIndex({ index })
                    routerDirection.singlePhotoView(parent)()
                }} >
                <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, uploadDamageImageWaiting, uploadDamageImage, damageId, vin } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={(cameraReses) => uploadDamageImage({ cameraReses, damageId, vin })}
                _cameraStart={uploadDamageImageWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadDamageImageWaiting, uploadDamageImage, damageId, vin } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(cameraReses) => uploadDamageImage({ cameraReses, damageId, vin })}
                    _cameraStart={uploadDamageImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>点击按钮上传质损图片</Text>
            </View>
        </View>
    )
}

const ImageEditorForDemage = props => {
    const { parent,
        uploadDamageImageWaiting,
        setDamageImageIndex,
        uploadDamageImage,
        imageListForDemageReducer: { data: { demageImageList }, uploadDamageImage: { isResultStatus } },
        initParam: { id, vin } } = props
    console.log('props', props)
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                keyExtractor={(item, index) => index}
                data={demageImageList.length > 0 ? [...demageImageList, 'isCameraButton'] : demageImageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ uploadDamageImageWaiting, uploadDamageImage, damageId: id, vin })}
                renderItem={({ item, index }) => renderItem({ parent, item, index, demageImageList, uploadDamageImageWaiting, uploadDamageImage, damageId: id, vin, setDamageImageIndex })} />
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={isResultStatus == 1}
                onRequestClose={() => { }}>
                <View style={styles.modalContainer} >
                    <View style={styles.modalItem}>
                        <ActivityIndicator
                            animating={isResultStatus == 1}
                            style={styles.modalActivityIndicator}
                            size="large"
                        />
                        <Text style={styles.modalText}>正在上传图片...</Text>
                    </View>
                </View>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    cameraButtonContainer: {
        marginTop: 50
    },
    subtitleContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center'
    },
    tagText: {
        color: 'red'
    },
    itemContainer: {
        margin: 5
    },
    listEmptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatList: {
        padding: 5
    },
    itemCameraButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: containerWidth,
        height: containerHeight
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
})

const mapStateToProps = (state) => {
    return {
        imageListForDemageReducer: state.imageListForDemageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadDamageImageWaiting: () => {
        dispatch(imageListForDemageAction.uploadDamageImageWaiting())
    },
    uploadDamageImage: (param) => {
        dispatch(imageListForDemageAction.uploadDamageImage(param))
    },
    setDamageImageIndex: (param) => {
        dispatch(imageListForDemageAction.setDamageImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageEditorForDemage)