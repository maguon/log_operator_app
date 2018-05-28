import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon, Container } from 'native-base'
import FontTag from '../components/FontTag'
import DrivingLicenseTypeList from '../../config/DrivingLicenseType.json'
import { file_host } from '../../config/Host'
import * as RouterDirection from '../../util/RouterDirection'
import globalStyles, { styleColor } from '../GlobalStyles'

const window = Dimensions.get('window')

const imagePadding = 15

const DriverInfoHeader = props => {
    const { driverInfo } = props
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
                <View style={styles.headerItemContainer}>
                    <MaterialCommunityIcons name='account' size={18} color={styleColor} />
                    <Text style={[globalStyles.midText, styles.headerItemText, { color: styleColor, fontWeight: 'bold' }]}>{driverInfo.drive_name ? `${driverInfo.drive_name}` : ''}</Text>
                </View>
                {driverInfo.gender == 0 && <Icon name='ios-woman' style={{ fontSize: 15, color: '#f7656a' }} />}
                {driverInfo.gender == 1 && <Icon name='ios-man' style={{ fontSize: 15, color: styleColor }} />}
                {driverInfo.operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                {driverInfo.operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                {driverInfo.operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                {driverInfo.operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
            </View>
            <View style={styles.headerRow}>
                <View style={styles.headerItemContainer}>
                    <MaterialCommunityIcons name='domain' size={12} color='#aaa' style={{ paddingHorizontal: 3 }} />
                    <Text style={[globalStyles.smallText, styles.headerItemText]}>{driverInfo.company_name ? `${driverInfo.company_name}` : ''}</Text>
                </View>
                <View style={styles.headerItemContainer}>
                    <MaterialCommunityIcons name='cellphone-android' size={12} color='#aaa' />
                    <Text style={[globalStyles.smallText, styles.headerItemText]}>{driverInfo.mobile ? `${driverInfo.mobile}` : ''}</Text>
                </View>
            </View>
            <View style={styles.headerRow}>
                <View style={styles.headerItemContainer}>
                    <MaterialCommunityIcons name='truck' size={12} color='#aaa' style={{ paddingHorizontal: 3 }} />
                    <Text style={[globalStyles.smallText, styles.headerItemText]}>关联货车：{driverInfo.truck_num ? `${driverInfo.truck_num}` : ''}</Text>
                </View>
                <View style={styles.headerItemContainer}>
                    <MaterialCommunityIcons name='account-card-details' size={12} color='#aaa' style={{ paddingHorizontal: 3 }} />
                    <Text style={[globalStyles.smallText, styles.headerItemText]}>驾照类型：{driverInfo.license_type ? DrivingLicenseTypeList.find((item) => item.id == driverInfo.license_type).value : ''}</Text>
                </View>
            </View>
        </View>
    )
}



const ListItem = props => {
    const { item: { img, title }, parent } = props
    return (
        <View style={styles.imgContainer}>
            {img && <TouchableOpacity onPress={() => RouterDirection.singlePhotoView(parent)({ initParam: { imageUrlList: [`${file_host}/image/${img}`], index: 0 }, title })}>
                <Image
                    source={{ uri: `${file_host}/image/${img}` }}
                    style={styles.img} />
            </TouchableOpacity>}
            {!img && <View style={styles.imgEmpty}>
                <Text style={globalStyles.smallText}>暂无</Text>
            </View>}
            <View style={styles.imgTag}>
                <Text style={[globalStyles.smallText, styles.imgTagText]}>{title}</Text>
            </View>
        </View>
    )
}

const DriverInfo = props => {
    const { initParam: { driverInfo }, parent } = props
    return (
        <Container>
            <DriverInfoHeader driverInfo={driverInfo} />
            <FlatList
                showsVerticalScrollIndicator={true}
                style={{ padding: 7.5 }}
                data={[{ img: driverInfo.drive_image, title: '身份证正面' },
                { img: driverInfo.driver_image_re, title: '身份证背面' },
                { img: driverInfo.license_image, title: '驾驶证' },
                { img: driverInfo.op_license_image, title: '准驾证' },
                { img: driverInfo.driver_avatar_image, title: '司机个人照片' }]}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => ListItem({ item, index, parent })}
                numColumns={2}
            />
        </Container>
    )
}

export default DriverInfo


const styles = StyleSheet.create({
    headerContainer: {
        padding: imagePadding / 2, 
        borderBottomWidth: 0.5, 
        borderColor: '#a8a8a8',
         backgroundColor: '#f2f6f9'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
         padding: imagePadding / 2
    },
    headerItemContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    headerItemText: {
        paddingLeft: 5
    },
    imgContainer: {
        width: (window.width - imagePadding * 3) / 2,
        height: ((window.width - imagePadding * 3) / 2) / 16 * 9,
        backgroundColor: '#fff',
        margin: imagePadding / 2,
        borderColor: '#aaa',
        borderWidth: 0.5
    },
    img: {
        width: (window.width - imagePadding * 3) / 2,
        height: ((window.width - imagePadding * 3) / 2) / 16 * 9,

    },
    imgEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgTag: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: (window.width - imagePadding * 3) / 2,
        position: 'absolute',
        bottom: 0
    },
    imgTagText: {
        textAlign: 'center',
        paddingVertical: 4,
        color: '#fff'
    }
})


