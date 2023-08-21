import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { useBook } from "../../context/bookContext";
import FontSettings from "../../components/FontSettings";
import VerseSettings from "../../components/VerseSetting";
import { useSelector } from "react-redux";
import versesData, { Genesis } from "./verses";
import HighlightText from '@sanar/react-native-highlight-text';
import Tts from 'react-native-tts';
import DailyVerse from "../../components/Daily";


const Home = ({ navigation }) => {

    const { currentBook: { selectedBook, selectedChapter }, setSelectedVerseToEdit, setCurrentBook } = useBook();
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [selectedVerse, setSelectedVerse] = useState("");
    const [isVersePanelActive, setVersePanelActive] = useState(false);
    const [reading, setReading] = useState(false);
    const [next, setNext] = useState(0)
    const { allFonts:
        { color, lineHeight, backgroundColor, fontFamily, fontSize }
    } = useSelector(state => state.fontReducer);

    const ReadBook = () => {

        if (reading) {
            Tts.stop();
        } else {
            Tts.getInitStatus().then(() => {
                let data = versesData.reduce((a, b) => a + ` ${b.verse}`, versesData[0]).toString().slice('[object Object]'.length,)
                Tts.speak(data);
            });
        }
    }

    useEffect(() => {
        Tts.setDefaultPitch(0.5);
        Tts.setDefaultRate(0.4);
        Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');


        Tts.addEventListener('tts-start', (event) => {
            setReading(true)
        });
        Tts.addEventListener('tts-finish', (event) => {
            setReading(false)
        });
        Tts.addEventListener('tts-cancel', (event) => {
            setReading(false)
        })
    }, [])



    const Verse = ({ header, verse_: Verse_, verse, verseNumber }) => {
        return (
            <View style={styles.verse}>
                {/* <Text style={[styles.verse_number, { color, fontFamily }]}>
                    {verseNumber}
                </Text>
                <View style={styles.line} /> */}
                <View style={{ width: '100%' }}>
                    {
                        header && (
                            <Text style={[styles.verse_header, { color }]}>
                                {header}
                            </Text>
                        )
                    }
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setSelectedVerseToEdit({
                            verse,
                            verseNumber,
                            verseChapter: selectedChapter,
                            verseBook: selectedBook
                        })
                        setVersePanelActive(true)
                    }}>
                        <Text style={[styles.verse_text, {
                            color, fontFamily, fontSize: 20, lineHeight: 30
                        }]}>

                            <Verse_ />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return (
        <SafeAreaView>
            <View style={styles.header}>
                <View style={styles.flex}>
                    <TouchableOpacity onPress={() => navigation.push('Select')} style={styles.book}>
                        <Text style={styles.book_text}>
                            {selectedBook} {selectedChapter}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.book, styles.book_2]}>
                        <Text style={[styles.book_text, { fontSize: 16 }]}>
                            BT
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity>
                        <Ionicons name='mic-sharp' size={20} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsPanelActive(true)}>
                        <Ionicons name='md-text' size={20} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.push('Search')}>
                        <Ionicons name='search' size={20} color='#000' />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={{ marginBottom: 60, backgroundColor }}>
                {
                    Genesis[selectedChapter - 1][(selectedChapter).toString()].slice(0, 28).map((ele, idx) => {
                        const header = ele.hasOwnProperty('b') ? ele?.b?.span : ''
                        let verse = ''
                        const Verse_ = Array.isArray(ele?.span)
                            ?
                            () => {
                                verse = `${ele?.span[0]?.trim()} ${ele?.span[1]?.["#text"]?.trim() ? ele?.span[1]?.["#text"]?.trim() : ''} ${ele?.span[2]?.trim()}`
                                return (
                                    <Text>
                                        {ele?.span[0]?.trim()}{" "}
                                        <Text style={{ color: 'blue' }}>
                                            {ele?.span[1]?.["#text"]?.trim()}
                                        </Text>
                                        <Text>
                                            {ele?.span[2] || ''}
                                        </Text>
                                    </Text>
                                )
                            }
                            : Number(ele?.span?.length)
                                ? () => {
                                    verse = ele?.span;
                                    return <Text>{ele?.span}</Text>
                                }
                                : typeof ele.span !== undefined && Boolean(Object.keys(ele?.span || {}).length)
                                    ? () => {
                                        verse = `${ele?.span?.["#text"]}`
                                        return <Text>{ele?.span?.["#text"]}</Text>
                                    }
                                    : () => <Text></Text>
                        return (
                            <Verse
                                verseNumber={idx + 1}
                                key={idx}
                                verse_={() => <Verse_ />}
                                verse={verse}
                                header={header} />
                        )
                    })
                }
            </ScrollView>

            <View style={styles.page_footer}>
                <TouchableOpacity onPress={() => {
                    if(selectedChapter !== 1){
                        setCurrentBook({selectedBook, selectedChapter: Number(selectedChapter) - 1})
                    }
                }} style={styles.box}>
                    <Ionicons name='chevron-back' color='#000' size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={ReadBook} style={styles.box}>
                    <Ionicons name={!reading ? 'play' : 'pause'} color='#000' size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setCurrentBook({selectedBook, selectedChapter: Number(selectedChapter) + 1})
                }} style={styles.box}>
                    <Ionicons name='chevron-forward-outline' color='#000' size={25} />
                </TouchableOpacity>
            </View>

            <FontSettings
                setIsPanelActive={setIsPanelActive}
                isPanelActive={isPanelActive}
            />
            <VerseSettings
                setIsPanelActive={setVersePanelActive}
                isPanelActive={isVersePanelActive}
            />
            <DailyVerse />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        borderBottomWidth: 1,
        paddingBottom: 15,
        paddingTop: 15
    }, book: {
        paddingLeft: 20,
        paddingRight: 20,
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13,
        backgroundColor: '#cacccf',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,

    },
    book_text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#000'
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    book_2: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginLeft: 4,
        paddingLeft: 15,
        paddingRight: 15,
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100
    },
    verse: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        flexDirection: 'row',
        // paddingLeft: 15,
        // paddingRight: 15,
        padding: 15,
        // margin: 20
    },
    verse_number: {
        fontFamily: 'Manrope-Bold',
        fontSize: 20,
        paddingRight: 10
    },
    line: {
        height: '200%',
        width: 1,
        backgroundColor: '#000',
        marginRight: 15,
    },
    verse_text: {
        fontFamily: "Poppins-Medium",
        paddingRight: 20,
        textAlign: 'left',
        color: '#000'
    },
    verse_header: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        width: '80%',
        paddingBottom: 10
    },
    page_footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 60
    },
    box: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: colors.bg,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    highlighted: {
        backgroundColor: 'red',

    },
    number: {
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: colors.black
    }
})

export default Home