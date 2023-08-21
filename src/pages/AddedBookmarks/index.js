import React from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { VerseCompare } from "../Compare/Compare";
import moment from "moment";
import { deleteBookmark, likeBookmark } from "../../redux/books";
import { Empty } from "../AddedNotes";
import { Header } from "../AddedNotes";


const AddedBookmarks = () => {
    const { bookmarks,  } = useSelector(state => state.verseReducer);
    const dispatch = useDispatch();

    const handleDelete = (verse) => {
        dispatch(deleteBookmark(verse))
    }

    const handleLike = (verse) => {
        bookmarks.map(ele => {
            if(ele.verse === verse){
                ele.like = !ele.like
            }
        })
        dispatch(likeBookmark(bookmarks))
    }

    return (
        <SafeAreaView>
            <Header name='Bookmarks' />
            <ScrollView>
                {Boolean(bookmarks.length)
                    ?
                    <>

                        {
                            bookmarks.map(({ verse, verseBook, verseChapter, verseNumber, date, like }, idx) => {
                                return (
                                    <View key={idx} style={styles.cont}>
                                        <Text style={[styles.btn_text, { color: colors.black, fontSize: 13, textTransform: 'lowercase', marginBottom: 10}]}>
                                            You bookmarked this verse {moment().calendar()}</Text>
                                        <VerseCompare
                                            book={'BT'}
                                            full={'Bible For Today'}
                                            verse={verse}
                                            verseBook={verseBook}
                                            verseChapter={verseChapter}
                                            verseNumber={verseNumber} />
                              
                                            <View style={[styles.flex, { justifyContent: 'flex-start', marginTop: 20}]}>
                                                <TouchableOpacity onPress={() => handleLike(verse)}>
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
                    : <Empty name='bookmark' />
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
        width: '70%',
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

export default AddedBookmarks