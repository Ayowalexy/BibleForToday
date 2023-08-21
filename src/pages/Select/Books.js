import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { books } from '../../utils/book';
import { useBook } from '../../context/bookContext';


const SelectBook = ({ ...props }) => {
    const [value, setValue] = useState("");
    const { currentBook, setCurrentBook } = useBook()

    const handlePress = (book) => {
        const data = {
            selectedBook: book.name,
            chapters: book.chapters
        }
        setCurrentBook(data)
        props.jumpTo('second')
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.search}>
                    <Ionicons name='md-search-outline' colors={colors.black_faded} size={20} />
                </View>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={styles.input}
                    placeholder='Search'
                />
            </View>

            <FlatList
                data={books}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.flex} onPress={() => handlePress({ name: item.EnglishName, chapters: item.chapters })} >
                            <Text style={styles.text}>{index + 1}.</Text>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={[styles.text, { fontFamily: currentBook?.selectedBook === item.EnglishName ? 'Poppins-Bold' : 'Poppins-Regular' }]}>
                                    {item.EnglishName}
                                </Text>
                                <Text style={[styles.text, { color: colors.black_faded, fontStyle: 'italic', fontSize: 11 }]}>{item.HebrewName}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, idx) => idx}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 53,
        borderBottomColor: colors.black_faded,
        paddingLeft: 40,
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    search: {
        position: 'absolute',
        top: 14,
        left: 10
    },
    flex: {
        flexDirection: 'row',
        padding: 20

    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: colors.black
    },
    container: {
        // height: Dimensions.get('window').height,
        backgroundColor: colors.white,
        marginBottom: 100
    }
})


export default SelectBook