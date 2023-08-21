import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList, SafeAreaView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../utils/colors";
import { VerseCompare } from "../Compare/Compare";
import { useBook } from "../../context/bookContext";



const Search = ({ navigation }) => {
    const [value, setValue] = useState('')
    const [selected, setSelected] = useState('All')
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='md-arrow-back-sharp' color={colors.black} size={25} />
                </TouchableOpacity>
                <TextInput
                    onChangeText={setValue}
                    placeholder='Search'
                    style={styles.input}
                    value={value}
                />
                <TouchableOpacity style={{ position: 'absolute', right: 10, top: 20 }}>
                    <Ionicons name='search' color={colors.black} size={25} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <FlatList
                    data={['All', 'Law', 'Old testament', 'Gospel', 'New testament', 'Epistles']}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={[styles.box, {
                            backgroundColor: selected === item ? colors.black : 'rgba(0,0,0,0.1)'
                        }]} onPress={() => setSelected(item)}>
                            <Text style={[styles.text, {
                                color: selected === item ? colors.white : colors.black
                            }]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={({ item }) => item}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={{paddingTop: 40}}>
                    <VerseCompare
                        book={'BT'}
                        full={'Bible For Today'}
                        verse={"I'll from this month ending start giving you upkeep until you get a stable income. My hands and body is shivering right now"}
                        verseBook={"Genesis"}
                        verseChapter={2}
                        verseNumber={1}
                    />
                     <VerseCompare
                        book={'BT'}
                        full={'Bible For Today'}
                        verse={"I'll from this month ending start giving you upkeep until you get a stable income. My hands and body is shivering right now"}
                        verseBook={"Genesis"}
                        verseChapter={2}
                        verseNumber={34}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 20,
        borderBottomColor: colors.black_faded,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        // height: 70,
        paddingLeft: 20,
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        color: colors.black
    },
    box: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        paddingLeft: 20,
        paddingRight: 20,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 15
    },
    text: {
        fontFamily: 'Manrope-Medium',
        color: colors.black,
        fontSize: 14
    }
})

export default Search