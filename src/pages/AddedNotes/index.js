import React from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { VerseCompare } from "../Compare/Compare";
import moment from "moment";
import { deleteNote, likeNote } from "../../redux/books";

export const Header = ({ name }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.flex}>
                <Ionicons name='arrow-back' color={colors.black} size={30} />
                <Text style={styles.header_text}>{name}</Text>
            </TouchableOpacity>

        </View>
    )
}

export const Empty = ({name}) => (
    <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: 50 }}>
        <Ionicons name='information-circle' color={colors.black} size={40} />
        <Text style={styles.bold}>No {name} added</Text>
        <Text style={styles.light}>
            You have not added any {name} yet, {"\n"}
            continue reading Bible for Today, adding
            {name}s
        </Text>
        <TouchableOpacity style={styles.box}>
            <Text style={styles.btn_text}>Continue</Text>
        </TouchableOpacity>
    </View>
)

const AddedNotes = () => {
    const { notes } = useSelector(state => state.verseReducer);
    const dispatch = useDispatch();

    const handleDelete = (verse) => {
        dispatch(deleteNote(verse))
    }

    const handleLike = (verse) => {
        notes.map(ele => {
            if(ele.verse === verse){
                ele.like = !ele.like
            }
        })
        dispatch(likeNote(notes))
    }
    return (
        <SafeAreaView>
            <Header name='Notes' />
            <ScrollView>
                {Boolean(notes.length)
                    ?
                    <>

                        {
                            notes.map(({ verse, verseBook, verseChapter, verseNumber, date, note, like }, idx) => {
                                const d = moment(date).format()
                                return (
                                    <View key={idx} style={styles.cont}>
                                        <Text style={[styles.btn_text, { color: colors.black, fontSize: 13, textTransform: 'lowercase', marginBottom: 10}]}>You added this note {moment().calendar()}</Text>
                                        <VerseCompare
                                            book={'BT'}
                                            full={'Bible For Today'}
                                            verse={verse}
                                            verseBook={verseBook}
                                            verseChapter={verseChapter}
                                            verseNumber={verseNumber} />
                                            <View style={styles.box_}>
                                                <Text style={styles.text}>{note}</Text>
                                            </View>

                                            <View style={[styles.flex, { justifyContent: 'flex-start', marginTop: 20}]}>
                                                <TouchableOpacity onPress={() => handleLike(verse)} >
                                                    <Ionicons name='ios-heart-sharp' color={like ? 'red' : colors.black} size={25} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => handleDelete(verse)} style={{marginLeft: 20}}>
                                                    <Ionicons name='ios-trash-bin' color={colors.black} size={25} />
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                )
                            })
                        }
                    </>
                    : <Empty name='note' />
                }
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
    }, bold: {
        fontFamily: 'Manrope-Bold',
        fontSize: 25,
        color: colors.black
    }, light: {
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        width: '80%',
        textAlign: 'center',
        color: colors.black
    }, box: {
        width: 150,
        height: 40,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    }, btn_text: {
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        color: colors.white
    }, cont: {
        width: '100%',
        padding: 20,
        borderRadius: 20,
        backgroundColor: colors.white,
        marginTop: 20
    },
    box_: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },text: {
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        color: colors.black
    }
})

export default AddedNotes