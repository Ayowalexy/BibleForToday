import React, { useReducer } from "react"
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { useBook } from "../../context/bookContext";

const SelectFont = () => {

    const { fontData, setFontData } = useBook()
    return (
        <View>

            <FlatList
                data={['Manrope', 'Poppins']}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setFontData({
                                ...fontData,
                                fontFamily: item.concat('-Bold')
                            })
                        }}
                        style={styles.selectParent}>
                        <Text style={styles.selectFont}>{item}</Text>
                        {
                            fontData.fontFamily.includes(item) ? (
                                <Ionicons name='ios-checkmark-done-sharp' color={colors.black} size={30} />
                            ) : <View style={{ width: 30 }} />
                        }
                    </TouchableOpacity>
                )}
                keyExtractor={({ item }) => item}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    selectFont: {
        fontFamily: 'Manrope-Medium',
        fontSize: 25,
        color: colors.black,
        width: '50%'
    },
    selectParent: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: '',
        flexDirection: 'row',
        marginTop: 20
    }
})

export default SelectFont