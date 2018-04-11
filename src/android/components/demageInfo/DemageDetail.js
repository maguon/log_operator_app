import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import globalStyles from '../../GlobalStyles'
import moment from 'moment'
import { Container, Content, Input, Label, Icon, Button } from 'native-base'

const DemageDetail = props => {
    const { initParam: { id, damage_status, created_on, damage_explain, drive_name } } = props
    return (
        <Container>
            <Content>
                <View style={[styles.header]}>
                    <View style={styles.headerItem}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>质损编号：{id ? `${id}` : ''}</Text>
                        {damage_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>待处理</Text>}
                        {damage_status == 2 && <Text style={[globalStyles.midText, globalStyles.styleColor]}>处理中</Text>}
                        {damage_status == 3 && <Text style={[globalStyles.midText]}>已处理</Text>}
                    </View>
                    <View style={styles.headerStatusItem}>
                        <Text style={globalStyles.smallText}>申报时间：{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={globalStyles.midText}><Text style={globalStyles.styleColor}>货车司机：</Text>{drive_name ? `${drive_name}` : ''}</Text>
                </View>
                <View style={styles.item}>
                    <View >
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>质损描述</Text>
                    </View>
                    <View >
                        <Text style={globalStyles.midText}>{damage_explain ? `${damage_explain}` : ''}</Text>
                    </View>
                </View>
            </Content>
        </Container>
    )
}

export default DemageDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    header: {
        borderBottomWidth: 0.3,
        borderColor: '#ddd',
        backgroundColor: '#f4f4f4',
        padding: 15
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    headerStatusItem: {
        alignItems: 'flex-end',
        paddingVertical: 5
    },
    item: {
        paddingVertical: 15,
        borderBottomWidth: 0.3,
        marginLeft: 15,
        paddingRight: 15,
        borderColor: '#ddd',
    }
})

