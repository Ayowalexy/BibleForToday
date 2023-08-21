import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { useBook } from "../../context/bookContext";
import { VerseCompare } from "../Compare/Compare";
import { useDispatch } from "react-redux";
import { addNote } from "../../redux/books";


const AddNote = ({ navigation }) => {

    const [note, setNote] = useState('');
    const dispatch = useDispatch();
    const { selectedVerseToEdit:
        { verse, verseNumber, verseChapter, verseBook } } = useBook();

    const handleSave = () => {
        if (Boolean(note)) {
            const data = {
                verse, verseNumber, verseChapter, verseBook, note, date: new Date().toLocaleDateString(),like: false
            }
            dispatch(addNote(data))
            navigation.goBack()
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.flex}>
                    <Ionicons name='arrow-back' color={colors.black} size={30} />
                    <Text style={styles.header_text}>Add Note</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.save}>
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 20 }}>
                <VerseCompare
                    book={'BT'}
                    full={'Bible For Today'}
                    verse={verse}
                    verseBook={verseBook}
                    verseChapter={verseChapter}
                    verseNumber={verseNumber}
                />

                <TextInput
                    value={note}
                    onChangeText={setNote}
                    style={styles.note}
                    placeholder='What would you like to say?'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                />
                <Text style={styles.text_}>
                    Enter note
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 20,
        backgroundColor: colors.white,
        borderBottomColor: colors.black_faded,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, header_text: {
        fontFamily: "Poppins-Medium",
        fontSize: 17,
        color: colors.black,
        paddingLeft: 10
    }, save: {
        height: 30,
        width: 60,
        backgroundColor: colors.black_faded,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }, text: {
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        color: colors.white,
    }, note: {
        width: '100%',
        height: 80,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingLeft: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: colors.black
    }, text_: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: 'red'
    }
})

export default AddNote