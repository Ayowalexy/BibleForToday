import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../utils/colors';
import BookTabs from './BookTabs';

const Select = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: colors.white }}>
            <View style={{ height: 500 }}>
                <View style={styles.flex}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back' color={colors.black} size={20} />
                    </TouchableOpacity>
                    <Text style={[styles.text, { paddingLeft: 15 }]}>
                        Select book
                    </Text>
                </View>
                <View style={{height: Dimensions.get('window').height - 100, marginBottom: 100}}>
                    <BookTabs />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: colors.black
    },
    flex: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        width: '100%'

    }
})

export default Select