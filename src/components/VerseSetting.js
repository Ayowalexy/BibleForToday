import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, Share } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { useBook } from "../context/bookContext";
import { colors } from "../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BG1, BG2 } from "../utils/images";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addBookmark } from "../redux/books";


const VerseSettings = ({ isPanelActive, setIsPanelActive, selectedVerse }) => {
    const { 
        currentBook: 
            { selectedBook, selectedChapter }, 
        selectedVerseToEdit: { verse, verseNumber, verseChapter, verseBook },
        setSelectedVerseToEdit
    } = useBook();

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: false,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
    });

    const closePanel = () => {
        setIsPanelActive(false);
    };

    return (
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {verseBook} {verseChapter}:{verseNumber}
                </Text>

                <View>
                    <FlatList
                        data={['Share', 'Compare', 'Note', 'Bookmark', 'Copy']}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={async () => {
                                if (item === 'Share') {
                                    await Share.share({
                                        message: "God is Good"
                                    })
                                } else if(item === 'Compare'){
                                    navigation.push('Compare')
                                } else if(item === 'Note'){
                                    navigation.push('Add Note')
                                } else if(item === 'Bookmark'){
                                    dispatch(addBookmark({
                                        verse, 
                                        verseNumber, 
                                        verseChapter, 
                                        verseBook,
                                        date: new Date().toLocaleDateString(),
                                        like: false
                                    }))
                                    setIsPanelActive(!isPanelActive)
                                }

                            }} style={styles.box}>
                                <Text style={styles.text_}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={({ item }) => item}
                    />

                    <FlatList
                        data={['#2E36F0', '#2EF0E9', '#2EF097', '#E1F02E', '#F04C2E']}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.box_, { backgroundColor: item }]}>

                            </TouchableOpacity>
                        )}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={({ item }) => item}
                    />
                </View>

                <Text style={[styles.text_, { marginTop: 30 }]}>
                    Choose an image
                </Text>
                <Text style={[styles.text_, { marginTop: 10, fontFamily: 'Manrope-Light', fontSize: 11, marginTop: -3 }]}>
                    Scripture background
                </Text>
                <View style={styles.flex}>
                    <TouchableOpacity style={styles.box__}>
                        <Ionicons name='image' color={colors.black} size={30} />
                    </TouchableOpacity>
                    {
                        [BG1, BG2,BG1, BG2,BG1, BG2,BG1, BG2,].map((element, idx) => (
                            <TouchableOpacity onPress={() => {
                                setSelectedVerseToEdit({
                                    verse, 
                                    verseNumber, 
                                    verseChapter, 
                                    verseBook,
                                    verseImage: element
                                })
                                
                                navigation.push('Edit Image')
                                setIsPanelActive(false)
                            }} key={idx} style={styles.box__}>
                                <Image style={styles.image} source={element} resizeMode='cover' />
                            </TouchableOpacity>
                        ))
                    }
                </View>

            </View>
        </SwipeablePanel>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    text: {
        fontFamily: "Poppins-Bold",
        fontSize: 18
    },
    box: {
        height: 35,
        backgroundColor: colors.modal_bg,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginTop: 20
    },
    box_: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 20,
        marginTop: 30
    },
    text_: {
        fontFamily: 'Poppins-Medium'
    },
    box__: {
        width: '33%',
        height: 100,
        backgroundColor: colors.modal_bg,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 100,
    },
    flex: {
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 10
    }
})

export default VerseSettings