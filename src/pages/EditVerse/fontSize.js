import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from "../../utils/colors";
import { Slider } from '@miblanchard/react-native-slider';
import { useBook } from "../../context/bookContext";



const FontSize = () => {
    const [value, setValue] = useState('');
    const {fontData, setFontData } = useBook();

    const handleSetValues = (field, value) => {
        setFontData({
            ...fontData,
            [field]: value
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <TouchableOpacity onPress={() => handleSetValues('textAlign', 'left')}>
                    <MaterialCommunityIcons name='format-align-left' color={colors.black} size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  handleSetValues('textAlign', 'center')}>
                    <MaterialCommunityIcons name='format-align-center' color={colors.black} size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  handleSetValues('textAlign', 'right')}>
                    <MaterialCommunityIcons name='format-align-right' color={colors.black} size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.slider}>
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    color: colors.black,
                    fontSize: 18
                }}>Size</Text>
                <View style={{width: 220}}>
                    <Slider
                        value={value}
                        step={2}
                        maximumValue={50}
                        onValueChange={value => {
                            setValue(value)
                            handleSetValues('fontSize', value[0])
                        }}
                    thumbStyle={{ backgroundColor: colors.white, borderColor: colors.black, borderWidth: 1 }}
                    // trackStyle={{ backgroundColor: colors.white, height: 10, borderRadius: 20 }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 60,
        width: '70%'
    },
    slider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        width: '70%'
    }
})

export default FontSize