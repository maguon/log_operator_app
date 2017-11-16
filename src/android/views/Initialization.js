import {
    Linking,
    ToastAndroid,
    Platform,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as InitializationAction from '../../actions/InitializationAction'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.width / 9 * 16
class Initialization extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
        this.initApp = this.initApp.bind(this)
    }

    componentDidMount() {
        this.props.initAppWaiting()
        this.props.initApp({
            optionalParam: {
                app: 1,
                type: 1
            }
        })
    }

    initApp() {
        const { initAPP, validateToken } = this.props.InitializationReducer
        if (initAPP.step == 1) {
            this.props.initAppWaiting()
            this.props.initApp({
                optionalParam: {
                    app: 1,
                    type: 1
                }
            })
        } else if (initAPP.step == 3) {
            this.props.initAppWaiting()
            this.props.initApp(validateToken.param, 1, 3)
        }
    }

    linkDownload(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.error('An error occurred', err))
    }

    componentWillReceiveProps(nextProps) {
        const { initAPP, loadLocalStorage, validateToken, validateVersion } = nextProps.InitializationReducer
        if (initAPP.step == 1) {
            if (validateVersion.isResultStatus == 3) {
                ToastAndroid.showWithGravity(`${validateVersion.errorMsg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else if (validateVersion.isResultStatus == 4) {
                Actions.mainRoot()
            } else if (validateVersion.isResultStatus == 5) {
                ToastAndroid.showWithGravity(`${validateVersion.networkError}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        } else if (initAPP.step == 2) {
            if (loadLocalStorage.isResultStatus == 3 || loadLocalStorage.isResultStatus == 4 || loadLocalStorage.isResultStatus == 5) {
                Actions.mainRoot()
            }
        } else if (initAPP.step == 3) {
            if (validateToken.isResultStatus == 2 || validateToken.isResultStatus == 3 || validateToken.isResultStatus == 4) {
                Actions.mainRoot()
            } else if (validateToken.isResultStatus == 5) {
                ToastAndroid.showWithGravity(`${validateToken.networkError}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        }
    }

    render() {
        const { data, initAPP, loadLocalStorage, validateToken, validateVersion } = this.props.InitializationReducer
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Image source={{ uri: 'init_back' }}
                    style={styles.image}
                />
                {(validateVersion.isResultStatus == 3 || validateToken.isResultStatus == 3) && <Button block onPress={() => { }}
                    style={{ position: 'absolute', bottom: 50, width: window.width / 4 * 3, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 25 }}>
                    <Text style={styles.buttonTiltle}>联系管理员</Text>
                </Button>}
                {(validateVersion.isResultStatus == 5 || validateToken.isResultStatus == 5) && <Button block onPress={() => this.initApp()}
                    style={{ position: 'absolute', bottom: 50, width: window.width / 4 * 3, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 25 }}>
                    <Text style={styles.buttonTiltle}>重试</Text>
                </Button>}

                {initAPP.isResultStatus == 2 && data.version.force_update == 1 && <Button block
                    onPress={() => this.linkDownload(data.version.url)}
                    style={{ position: 'absolute', bottom: 50, width: window.width / 4 * 3, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 25 }}>
                    <Text style={styles.buttonTiltle}>立即更新</Text>
                </Button>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: ImageWidth,
        height: ImageHeight
    },
    buttonTiltle: {
        fontSize: 18,
        color: '#0078a7'
    }
})

const mapStateToProps = (state) => {
    return {
        InitializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    initAppWaiting: () => {
        dispatch(InitializationAction.initAppWaiting())
    },
    initApp: (param, tryCount = 1, currentStep = 1) => {
        dispatch(InitializationAction.initApp(param, tryCount, currentStep))
    },
    validateVersion: (param) => {
        dispatch(InitializationAction.validateVersion(param))
    },
    validateToken: (param) => {
        dispatch(InitializationAction.validateToken(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Initialization)
