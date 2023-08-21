import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from "../../utils/colors";
import { Slider } from '@miblanchard/react-native-slider';
import { useBook } from "../../context/bookContext";
import Ionicons from 'react-native-vector-icons/Ionicons'



const FontOpacity = () => {
    const [value, setValue] = useState('100');
    const { fontData, setFontData } = useBook();

    const handleSetValues = (field, value) => {
        setFontData({
            ...fontData,
            [field]: value
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <View />
                <View style={styles.box}>
                    <TouchableOpacity style={styles.box_1} onPress={() => handleSetValues('color', '#000')}>
                        {
                            fontData.color === '#000' && <Ionicons name='checkmark-sharp' size={25} color={colors.white} />

                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSetValues('color', '#fff')} style={[styles.box_1, { backgroundColor: colors.white, height: 47, width: '45%' }]}>
                        {
                            fontData.color === '#fff' && <Ionicons name='checkmark-sharp' size={25} color={colors.black} />
                        }
                    </TouchableOpacity>
                </View>
                <View />
            </View>
            <View style={styles.slider}>
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    color: colors.black,
                    fontSize: 18
                }}>Opacity</Text>
                <View style={{ width: 220 }}>
                    <Slider
                        value={value}
                        step={1}
                        minimumValue={30}
                        maximumValue={100}
                        onValueChange={value => {
                            setValue(value)
                            handleSetValues('opacity', Number(value[0])/ 100)
                        }}
                        thumbStyle={{ backgroundColor: colors.white, borderColor: colors.black, borderWidth: 1 }}
                    // trackStyle={{ backgroundColor: colors.white, height: 10, borderRadius: 20 }}
                    />
                </View>
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    color: colors.black,
                    fontSize: 18
                }}>{value[0]}%</Text>
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    },
    box: {
        width: 120,
        height: 50,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row'
    },
    box_1: {
        width: '50%',
        height: 50,
        backgroundColor: colors.black,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FontOpacity