import React, { useState, useEffect } from "react";
import { Modal, Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useBook } from "../../context/bookContext";
import { useDispatch, useSelector } from "react-redux";
import { getTranslations, getVerse } from "../../redux/books/thunkActions";
import { books } from "../../utils/book";
import { addVersionTitle } from "../../redux/books";


const CompareModal = () => {
    const {
        compareModalVisible,
        setCompareModalVisible,
        setVersion,
        selectedVerseToEdit: { verseBook, verseChapter, verseNumber }
    } = useBook();
    const { verses, loading, compareVersion } = useSelector(state => state.verseReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTranslations())
    }, [])


    const handlePress = (translation, full) => {

        dispatch(addVersionTitle({ abbr: translation, full }))

        const bookId = books.find(ele => ele.EnglishName.trim().toLowerCase() === verseBook.toString().trim().toLowerCase())
        const data = {
            book: bookId.id,
            chapter: verseChapter,
            verse: Number(`${bookId.id}00100${verseNumber}`),
            translation
        }
        const added = compareVersion.length && compareVersion.some(ele => ele.abbr === translation);
        if (!added) {
            dispatch(getVerse(data))
        }
        setCompareModalVisible(false)
    }

    return (
        <Modal
            visible={compareModalVisible}
            onRequestClose={() => setCompareModalVisible(!compareModalVisible)}
            transparent={true}
            animationType='slide'
        >
            <View style={styles.container}>
                <View style={styles.box}>
                    <TouchableOpacity onPress={() => setCompareModalVisible(false)} style={{ position: 'absolute', right: 20, top: 20 }}>
                        <Ionicons name='close-circle' color='red' size={25} />
                    </TouchableOpacity>
                    <ScrollView>
                        {
                            loading === 'pending' ? <ActivityIndicator size='small' color={colors.black} />
                                :
                                <>
                                    {verses.map((element, idx) => (
                                        <TouchableOpacity
                                            onPress={() => handlePress(element.abbreviation, element.version)}
                                            style={{ marginBottom: 20 }} key={idx}>
                                            <Text style={styles.text_1}>{element.abbreviation}</Text>
                                            <Text style={[styles.text_1, { fontFamily: "Poppins-Light", fontSize: 14 }]}>
                                                {element.version}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </>
                        }
                    </ScrollView>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex'
    }, box: {
        width: '100%',
        height: 500,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.white,
        padding: 20,
        paddingTop: 50
    }, text_1: {
        fontFamily: "Poppins-Bold",
        color: colors.black,
        fontSize: 20
    }
})

export default CompareModal