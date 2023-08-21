import React, { useState } from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity, Share, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { colors } from "../../utils/colors";


const DailyVerse = () => {
    const [visible, setVisible] = useState(true)
    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(!visible)}
            transparent={true}
            animationType='slide'
        >
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={[styles.text, { width: Dimensions.get('window').width, fontSize: 13 }]}>
                            In 2023, May God show mercy to you as to others
                        </Text>
                    </View>
                    <View style={{ width: '80%' }}>
                        <Text style={[styles.text, { fontFamily: "Poppins-Bold", fontSize: 20 }]}>
                            Genesis 12:2{'\n'}
                        </Text>
                        <Text style={styles.text}>
                            Following this,  God declared: “ Let the earth spring up vegetation,  producing various kinds of plants: plants that produce seeds,  and trees that produce fruit,  each according to its kind,  containing its own kind of seed,  on the earth ”.  It happened exactly just as God had declared.
                        </Text>
                        <Text style={[styles.text, { fontFamily: "Poppins-Light", fontSize: 13 }]}>
                            {'\n'}Bible For Today(BT)
                        </Text>
                    </View>
                    <View style={styles.box_}>
                        <TouchableOpacity onPress={() => setVisible(!visible)} style={[styles.box, { backgroundColor: '#c7385e' }]}>
                            <Text style={styles.text_}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {
                            const result = await Share.share({
                                message: "In 2023, May God show mercy to you as to others"
                            });
                        }} style={styles.box}>
                            <Text style={styles.text_}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 3
    }, text: {
        fontFamily: 'Poppins-SemiBold',
        color: colors.white,
        fontSize: 15,
        width: '100%',
        textAlign: 'center'
    },
    box_: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }, box: {
        width: '47%',
        height: 50,
        backgroundColor: '#388bc7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }, text_: {
        fontFamily: 'Poppins-Bold',
        color: colors.white,
        fontSize: 20,
    }, header: {
        width: '100%',
        height: 40,
        backgroundColor: '#325c32',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DailyVerse