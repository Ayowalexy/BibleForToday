import React, { useState } from "react";
import { Text, View,  TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from "../../utils/colors";
import { Slider } from '@miblanchard/react-native-slider';
import { useBook } from "../../context/bookContext";
import Ionicons from 'react-native-vector-icons/Ionicons'



const FontBlur = () => {
    const [value, setValue] = useState('100');
    const [value_, setValue_] = useState('100');

    const { fontData, setFontData } = useBook();

    const handleSetValues = (field, value) => {
        setFontData({
            ...fontData,
            [field]: value
        })
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.slider}>
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    color: colors.black,
                    fontSize: 18
                }}>Blur</Text>
                <View style={{ width: 220 }}>
                    <Slider
                        value={value}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        onValueChange={value => {
                            setValue(value)
                            handleSetValues('blur', Number(value[0]))
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
            <View style={styles.slider}>
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    color: colors.black,
                    fontSize: 18
                }}>Brightness</Text>
                <View style={{ width: 200 }}>
                    <Slider
                        value={value_}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        onValueChange={value => {
                            setValue_(value)
                            handleSetValues('brightness', Number(value[0])/ 100)
                        }}
                        thumbStyle={{ backgroundColor: colors.white, borderColor: colors.black, borderWidth: 1 }}
                    // trackStyle={{ backgroundColor: colors.white, height: 10, borderRadius: 20 }}
                    />
                </View>
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    color: colors.black,
                    fontSize: 18
                }}>{value_[0]}%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        paddingTop: 30
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

export default FontBlur