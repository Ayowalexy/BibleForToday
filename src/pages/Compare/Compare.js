import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { useBook } from "../../context/bookContext";
import Swipeable from 'react-native-swipeable';
import CompareModal from "./CompareModal";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from "react-redux";
import { clearBooks, removeVersion } from "../../redux/books";


export const VerseCompare = ({ book, full, verse, verseBook, verseChapter, verseNumber }) => (
    <View style={{ marginBottom: 30 }}>
        <View style={styles.flex}>
            <Text style={styles.version}>{book}</Text>
            <Text style={styles.full}>{full}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
            <View style={styles.line}>
                <Text style={styles.text}>
                    {verse}
                </Text>
                <Text style={styles.book}>
                    {verseBook} {verseChapter}:{verseNumber}
                </Text>
            </View>
        </View>
    </View>
)


const Compare = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { setCompareModalVisible, selectedVerseToEdit: { verse, verseNumber, verseChapter, verseBook } } = useBook();
    const { compareVersion } = useSelector(state => state.verseReducer);

    const rightButtons = [
        <View>
            <TouchableOpacity style={{
                height: '100%',
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Ionicons name='trash-bin' color={colors.black} size={30} />
            </TouchableOpacity>
        </View>,
    ];


    return (
        <SafeAreaView style={{ backgroundColor: colors.white }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    dispatch(clearBooks())
                    navigation.goBack()
                }}>
                    <Ionicons name='arrow-back' color={colors.black} size={30} />
                </TouchableOpacity>
                <Text style={styles.header_text}>Compare versions</Text>
            </View>
            <View style={{ height: Dimensions.get('window').height - 160, }}>
                <ScrollView style={{ padding: 20 }}>
                    <CompareModal />
                    <VerseCompare
                        book={'BT'}
                        full={'Bible For Today'}
                        verse={verse}
                        verseBook={verseBook}
                        verseChapter={verseChapter}
                        verseNumber={verseNumber}
                    />

                    {
                        Boolean(compareVersion.length) && (
                            compareVersion.map((element, idx) => (
                                <Swipeable
                                    key={idx}
                                    rightButtons={rightButtons}
                                    rightActionActivationDistance={150}
                                >
                                    <VerseCompare
                                        book={element.abbr}
                                        full={element.full}
                                        verse={element.verse}
                                        verseBook={element.book.name}
                                        verseChapter={element.chapterId}
                                        verseNumber={element.verseId}
                                    />
                                </Swipeable>
                            ))
                        )
                    }

                    <View style={{ height: 80, width: '100%' }} />

                </ScrollView>
            </View>
            <TouchableOpacity
                onPress={() => setCompareModalVisible(true)}
                style={styles.add}>
                <MaterialCommunityIcons name='plus' color={colors.black} size={30} />
                <Text style={styles.text}>
                    ADD VERSION
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        borderBottomColor: colors.black_faded,
        borderBottomWidth: 1
    },
    header_text: {
        fontFamily: "Poppins-Medium",
        fontSize: 17,
        color: colors.black,
        paddingLeft: 10
    },
    flex: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
    },
    version: {
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: colors.black
    },
    full: {
        fontFamily: "Poppins-Light",
        fontSize: 13,
        color: colors.black
    }, flex_: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }, line: {
        width: '100%',
        borderLeftWidth: 4,
        borderLeftColor: colors.black,
        paddingLeft: 15

    }, text: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: colors.black,
    }, book: {
        fontFamily: "Poppins-Bold",
        fontSize: 17,
        color: colors.black,
        paddingTop: 10

    },
    add: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: colors.black

    }
})

export default Compare