import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useBook } from "../../context/bookContext";
import { colors } from "../../utils/colors";


const Chapters = ({ ...props }) => {
    const { currentBook, setCurrentBook } = useBook();

    const handlePress = (chapter) => {
        const data = {
            ...currentBook,
            selectedChapter: chapter
        }

        setCurrentBook(data)
        props.jumpTo('third')
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    Array(currentBook?.chapters).fill('_').map((_, idx) => (
                        <TouchableOpacity onPress={() => handlePress(idx + 1)} key={idx} style={styles.box}>
                            <Text style={[styles.text, { fontFamily: currentBook?.selectedChapter === idx + 1 ? 'Poppins-Bold' : 'Poppins-Regular' }]}>
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

export default Chapters