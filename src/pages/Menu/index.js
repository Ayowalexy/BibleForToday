import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";

const Menu = ({navigation}) => {
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text
                    style={[styles.text, { fontFamily: 'Poppins-Bold', fontSize: 20 }]}
                >Menu</Text>
                <TouchableOpacity style={styles.donate}>
                    <Ionicons color={colors.black} size={17} name='heart' />
                    <Text style={styles.text}>Donate</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 20 }}>
                {
                    [
                        {
                            icon: 'md-notifications-sharp',
                            name: 'Notification',
                            route: 'Notifications'
                        }, {
                            icon: 'people',
                            name: 'Friends',
                            route: 'Friends'
                        }, {
                            icon: 'md-sunny-sharp',
                            name: 'Verse of the day',
                            route: 'Verse of the day'
                        }, {
                            icon: 'pencil',
                            name: 'Highlight',
                            route: 'Highlight'
                        }, {
                            icon: 'bookmarks',
                            name: 'Bookmarks',
                            route: 'Added Bookmarks'
                        }, {
                            icon: 'book',
                            name: 'Notes',
                            route: 'Added Notes'
                        }, {
                            icon: 'share-social',
                            name: 'Share Bible For Today',
                            route: 'Share'
                        }, {
                            icon: 'information-circle',
                            name: 'About',
                            route: 'Share'
                        },

                    ].map(({ icon, name, route }) => (
                        <View key={name}>
                            <TouchableOpacity onPress={() => navigation.push(route)} style={styles.actions} >
                                <Ionicons name={icon} size={20} color={colors.black} />
                                <Text style={[styles.text, { fontSize: 16, paddingLeft: 20 }]}>{name}</Text>
                            </TouchableOpacity>
                            {
                                ['Friends', 'Notes'].includes(name) && <View style={styles.line} />
                            }
                        </View>
                    ))
                }
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        borderBottomColor: colors.black,
        borderBottomWidth: 0.6
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14
    },
    donate: {
        width: 100,
        height: 30,
        borderRadius: 30,
        backgroundColor: colors.modal_bg,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        color: colors.black
    },
    actions: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 40
    },
    line: {
        width: '130%',
        height: 1,
        backgroundColor: colors.black,
        marginBottom: 40,
        marginLeft: -20
    }
})

export default Menu