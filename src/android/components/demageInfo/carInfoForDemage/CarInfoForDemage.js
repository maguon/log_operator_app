import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Icon } from 'native-base'
import globalStyles from '../../../GlobalStyles'
import { connect } from 'react-redux'

const CarInfoForDemageInfo = props => {
    const { carInfoForDemageReducer: { data: { carInfo: { vin, addr_name, en_short_name, make_name, route_end, route_start, re_short_name } } } } = props
    return (
        <View style={styles.container}>
            <View style={[styles.headerContainer]}>
                <Icon name='ios-car' style={[styles.headerIcon, globalStyles.styleColor]} />
                <Text style={[globalStyles.largeText, globalStyles.styleColor, styles.headerText]}>{vin ? `${vin}` : ''}</Text>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.item}>
                    <Text style={[globalStyles.midText, styles.ItemTilte, {}]}>品牌：</Text>
                    <Text style={globalStyles.midText}>{make_name ? `${make_name}` : ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={[globalStyles.midText, styles.ItemTilte]}>委托方：</Text>
                    <Text style={globalStyles.midText}>{en_short_name ? `${en_short_name}` : ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={[globalStyles.midText, styles.ItemTilte]}>出发地：</Text>
                    <Text style={globalStyles.midText}>{route_start ? `${route_start}` : ''}{addr_name ? `(${addr_name})` : ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={[globalStyles.midText, styles.ItemTilte]}>目的地：</Text>
                    <Text style={globalStyles.midText}>{route_end ? `${route_end}` : ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={[globalStyles.midText, styles.ItemTilte]}>经销商：</Text>
                    <Text style={globalStyles.midText}>{re_short_name ? `${re_short_name}` : ''}</Text>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        carInfoForDemageReducer: state.carInfoForDemageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfoForDemageInfo)

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#ddd',
        paddingVertical: 15,
        marginLeft: 15,
        paddingRight: 15
    },
    itemContainer: {
        paddingVertical: 5
    },
    item: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.3,
        borderColor: '#ddd',
        marginLeft: 15,
        paddingRight: 15
    },
    headerIcon: {
        fontSize: 25
    },
    headerText: {
        paddingLeft: 10
    },
    ItemTilte: {
        fontWeight: 'bold'
    },
    container: {
        marginTop: 15
        //margin: 15
    }
})

