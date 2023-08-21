import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Image, Share, TouchableOpacity } from "react-native";
import { BG1 } from "../../utils/images";
import { colors } from "../../utils/colors";

const BookDetails = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='ios-arrow-back-outline' size={20} color={colors.black} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='md-share-social' size={20} color={colors.black} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <Image source={BG1} style={styles.image} resizeMode='cover' />
                    <Text style={styles.header_text}>
                        Celebrating God's Faithfulness in the End time
                    </Text>
                    <Text style={[styles.header_text, { fontFamily: 'Poppins-Light', fontSize: 12 }]}>
                        From Genesis to Revelations
                    </Text>
                    <View style={styles.flex}>
                        {
                            [1, , 2, 3, 4, 5].map((ele) => <Ionicons key={ele} name='star' color='#ffc042' size={30} />)
                        }
                        <Text style={{
                            fontFamily: 'Manrope-Bold',
                            color: colors.black,
                            fontSize: 30,
                            paddingLeft: 10
                        }}>5.0</Text>
                    </View>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={{
                            fontFamily: 'Poppins-Bold',
                            color: colors.white
                        }}>Buy $23.00</Text>
                    </TouchableOpacity>

                    <View style={{marginBottom: 30}}>
                        <Text style={styles.text}>
                            {"    "}This book follows on the first one, 'The End of
                            Time Mysteries Unveiled", which recounts events
                            to follow for the end times. As the world enters the
                            end time, everyone needs to know how to stand
                            strong to the end. Individuals, families. 
                            {'\n'}{'\n'}{'    '}And communities on earth will experience greater
                            spiritual, physical, psychological, emotional,centeredness, abandonment, loneliness, distrust,
                            false accusation, covenant breaking, loss of self-
                            restraint, ungodliness, disobedience, demonic
                            operations, persecution, hate, intolerance, fear,
                            ferocious aggressiveness, terrorism, intoxication,
                            substance abuse, hazards, disasters, devastation,
                            desolation, etc, will become more common.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row'
    },
    image: {
        width: 150,
        height: 200,
        borderRadius: 10
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    header_text: {
        fontFamily: 'Manrope-Bold',
        fontSize: 18,
        color: colors.black,
        width: '80%',
        textAlign: 'center',
        paddingTop: 15
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10
    },
    btn: {
        width: 150,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#236350',
        marginTop: 20
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: colors.black,
        padding: 30
    }
})

export default BookDetails