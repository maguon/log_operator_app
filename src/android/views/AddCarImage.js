import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    Modal,
    TouchableHighlight,
    FlatList,
    StatusBar,
    ActivityIndicator,
    ToastAndroid
} from 'react-native'
import { Button, Icon, Spinner } from 'native-base'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import ImageItem from '../components/ForFlatLast/ImageItem'
import CameraButton from '../components/CameraButton'
import { connect } from 'react-redux'
import * as addCarImageAction from '../../actions/AddCarImageAction'

import { isEqualKeys, isEqualOwnPropertys } from '../../util/IsObjectValueEqual'

const window = Dimensions.get('window')
let ImageWidth = (window.width - 30) / 2
let ImageHeight = ImageWidth / 16 * 9

const baseStyle = {
    cameraButtonItemContainer: {
        width: ImageWidth,
        height: ImageHeight,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    item: {
        width: ImageWidth,
        height: ImageHeight,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#000'

    },
    flatListEmptyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: window.width,
        height: window.height - 56 - StatusBar.currentHeight
    },

})

class AddCarImage extends Component {
    constructor(props) {
        super(props)
        this.addCarImage = this.addCarImage.bind(this)
        this._listEmptyComponent = this._listEmptyComponent.bind(this)
        this.renderImage = this.renderImage.bind(this)
        this._cameraStart = this._cameraStart.bind(this)
        this.state = { modalVisible: false }
    }

    componentWillReceiveProps(nextProps) {
        const { addCarImage } = nextProps.addCarImageReducer
        if (addCarImage.isResultStatus == 2) {
            ToastAndroid.show('上传成功！', ToastAndroid.SHORT)
            this.props.resetAddCarImage()
        } else if (addCarImage.isResultStatus == 6) {
            ToastAndroid.showWithGravity(`上传失败${addCarImage.unsuccessNum}张！`, ToastAndroid.SHORT)
            this.props.resetAddCarImage()
        } else if (addCarImage.isResultStatus == 4) {
            ToastAndroid.showWithGravity('上传失败！', ToastAndroid.SHORT)
            this.props.resetAddCarImage()
        } else if (addCarImage.isResultStatus == 3) {
            ToastAndroid.showWithGravity('上传失败！', ToastAndroid.SHORT)
            this.props.resetAddCarImage()
        }
    }

    addCarImage(param) {
        this.props.addCarImage(param.filter((item) => item.success)
            .map((item) => {
                return {
                    requiredParam: {
                        userId: '81',
                        carId: 1225,//this.props.initParam.carId,
                        vin: '887766jshshsh'//this.props.initParam.vin
                    },
                    optionalParam: {
                        imageType: 1
                    },
                    postFileParam: {
                        ...item.res,
                        key: "image"
                    },
                    postParam: {
                        username: '13555555555',
                        userId: '81',
                        userType: '10',
                    }
                }
            }))
    }

    _cameraStart() {
        this.props.addCarImageWaiting()
    }

    _listEmptyComponent() {
        return <View style={styles.flatListEmptyContainer}>
            <CameraButton
                getImage={this.addCarImage}
                _cameraStart={this._cameraStart} />
        </View>
    }

    renderImage(item, i) {
        const numColumns = 2
        if (!item.isCameraButton) {
            if (i % numColumns == 1) {
                return <ImageItem
                    key={i}
                    imageUrl={item}
                    containerStyle={{ marginLeft: 5, marginRight: 10 }}
                />
            } else {
                return <ImageItem
                    key={i}
                    imageUrl={item}
                    containerStyle={{ marginLeft: 10, marginRight: 5 }}
                />
            }
        } else {
            if (i % numColumns == 1) {
                return <View style={{ ...baseStyle.cameraButtonItemContainer, marginLeft: 5, marginRight: 10 }}>
                    <CameraButton
                        getImage={this.addCarImage}
                        _cameraStart={this._cameraStart} />
                </View>
            } else {
                return <View style={{ ...baseStyle.cameraButtonItemContainer, marginLeft: 10, marginRight: 5 }}>
                    <CameraButton
                        getImage={this.addCarImage}
                        _cameraStart={this._cameraStart} />
                </View>
            }
        }


    }


    render() {
        const { imageList } = this.props.addCarImageReducer.data
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={imageList.length > 0 ? [...imageList, { isCameraButton: true }] : []}
                    numColumns={2}
                    ListEmptyComponent={this._listEmptyComponent()}
                    renderItem={({ item, index }) => this.renderImage(item, index)}
                />
                <View>
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.props.addCarImageReducer.addCarImage.isResultStatus == 1}
                        onRequestClose={() => { }}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' }} >
                            <View style={{ flexDirection: 'row', padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator
                                    animating={this.props.addCarImageReducer.addCarImage.isResultStatus == 1}
                                    style={{ height: 40 }}
                                    size="large"
                                />
                                <Text style={{ color: '#fff', paddingLeft: 10 }}>正在上传图片...</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addCarImageReducer: state.addCarImageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    addCarImageWaiting: () => {
        dispatch(addCarImageAction.addCarImageWaiting())
    },
    addCarImage: (param) => {
        dispatch(addCarImageAction.addCarImage(param))
    },
    resetAddCarImage: () => {
        dispatch(addCarImageAction.resetAddCarImage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCarImage)