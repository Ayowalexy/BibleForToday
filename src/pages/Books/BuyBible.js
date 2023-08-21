import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../../utils/colors";
import { BG2 } from "../../utils/images";
import { useNavigation } from "@react-navigation/native";


const BuyBible = () => {

    const navigation = useNavigation();

    return (
        <ScrollView style={{ padding: 20 }}>
            {
                [
                    {
                        name: 'End time bible translations',
                        price: '$45.00'
                    },
                    {
                        name: 'Bible for today',
                        price: '$22.00'
                    },
                ].map((element, idx) => (
                    <View style={styles.box} key={idx}>
                        <Image source={BG2} style={styles.image} resizeMode='cover' />
                        <View style={styles.side}>
                            <TouchableOpacity 
                            onPress={() => navigation.push('Book Details')}
                            style={styles.buy}>
                                <Text style={{ color: colors.black, fontFamily: 'Manrope-Bold' }}>Buy</Text>
                            </TouchableOpacity>
                            <Text style={{
                                color: colors.black, fontFamily: 'Poppins-SemiBold', lineHeight: 16,
                                paddingTop: 10, paddingBottom: 10, fontSize: 14
                            }}>{element.name}</Text>
                            <Text
                                style={{
                                    fontFamily: 'Poppins-Light',
                                    color: colors.black,
                                    fontSize: 13
                                }}
                            >{element.price}</Text>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 140,
        borderRadius: 10
    },
    box: {
        width: '100%',
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 0.8,
        borderColor: colors.black,
        borderRadius: 10,
        marginBottom: 30
    },
    side: {
        width: '50%',
        marginLeft: 20
    },
    buy: {
        width: 70,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black_faded,
        borderRadius: 50
    }
})

export default BuyBible