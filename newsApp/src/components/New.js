import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Touchable, Alert } from 'react-native';
import urlParse from 'url-parse';
import moment from 'moment';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

import es from "moment/locale/es";


export default function New(props) {
    const { data: {title, url, created_at} } = props;

    /* PARA BUSCADOR PREDETERMINADO DEL DISPOSITIVO */
    // const openUrl = ()=>{
    //     Linking.openURL(url); 
    // }

    // PARA AGREGAR UN NUEVO BUSCADOR
    const openUrl = async ()=>{
        try {
            if (await InAppBrowser.isAvailable()) {
              const result = await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: 'black',
                preferredControlTintColor: 'white',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: 'black',
                secondaryToolbarColor: 'white',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                  startEnter: 'slide_in_right',
                  startExit: 'slide_out_left',
                  endEnter: 'slide_in_left',
                  endExit: 'slide_out_right'
                },
                headers: {
                  'my-custom-header': 'my custom header value'
                }
              })
            }
            else Linking.openURL(url)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <TouchableOpacity onPress={openUrl}>
            <View style={styles.new}>
                <Text style={styles.url}>{urlParse(url).host}</Text>
            
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.time}>{moment(created_at).local(es).startOf().fromNow()}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    new:{
        padding: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    url: {
        paddingBottom: 5,
        color: 'grey'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18, 
    },
    time: {
        paddingTop: 10,
        color: 'grey',
    }

});
