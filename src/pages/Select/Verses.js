import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useBook } from "../../context/bookContext";
import { colors } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";


const Verses = () => {
    const { currentBook, setCurrentBook } = useBook();
    const navigation = useNavigation();

    const handlePress = (verse) => {
        const data = {
            ...currentBook,
            selectedVerse: verse
        }

        setCurrentBook(data)
        navigation.push('Tabs')
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    Array(20).fill('_').map((_, idx) => (
                        <TouchableOpacity onPress={() => handlePress(idx + 1)} key={idx} style={styles.box}>
                            <Text style={[styles.text ]}>
                                {idx + 1}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16
    },
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: colors.white,
        borderTopColor: colors.black,
        borderTopWidth: 1,
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
})

export default Verses