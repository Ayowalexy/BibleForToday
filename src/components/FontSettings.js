import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Button, Modal, Dimensions, TouchableOpacity, FlatList } from "react-native";
import { colors } from "../utils/colors";
import { Slider } from '@miblanchard/react-native-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setFontSettings } from "../redux/font";
import { useDispatch, useSelector } from "react-redux";


const FontSettings = ({ isPanelActive, setIsPanelActive }) => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const { allFonts } = useSelector(state => state.fontReducer);
    const [selected, setSelected] = useState('');
    const [fonts, setFonts] = useState([
        'Manrope', 'Poppins'
    ])
    const [fontId, setFontId] = useState(0);
    
    const handleSetValues = (field, value) => { 
        dispatch(setFontSettings({
            ...allFonts,
            [field]: value
        }))
    }

    useEffect(() => {
        handleSetValues('backgroundColor', selected)
    }, [selected])


    return (
        <Modal
            visible={isPanelActive}
            onRequestClose={() => setIsPanelActive(!isPanelActive)}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.close} onPress={() => setIsPanelActive(!isPanelActive)}>
                        <Ionicons name='close-circle' colors={colors.black_faded} size={30} />
                    </TouchableOpacity>

                    <Text style={styles.font}>
                        Font Size
                    </Text>
                    <View style={styles.flex}>
                        <View style={{ width: '80%' }}>
                            <Slider
                                value={value}
                                step={5}
                                maximumValue={50}
                                onValueChange={value => {
                                    setValue(value)
                                    handleSetValues('fontSize', value[0])
                                }}
                                thumbStyle={{ backgroundColor: colors.white }}
                                trackStyle={{ backgroundColor: colors.white, height: 10, borderRadius: 20 }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => {
                            if(allFonts.lineHeight === 1.5){
                                handleSetValues('lineHeight', 1)
                            } else {
                                handleSetValues('lineHeight', 1.5)
                            }
                        }} style={[styles.line_, {
                            justifyContent: allFonts.lineHeight === 1.5 ? 'space-around' : 'space-evenly'
                        }]}>
                            {
                                [1, 2, 3].map((ele, idx) => <View key={idx} style={styles.line} />)
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.font_box}>
                        <View>
                            <Text style={[styles.font, { fontSize: 11 }]}>Font</Text>
                            <Text style={[styles.font, { fontFamily: 'Manrope-Bold', fontSize: 20, marginTop: -5 }]}>
                                {fonts[fontId]}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            if(fontId  === 1){
                                setFontId(0)
                            } else {
                                setFontId(prev => prev + 1)
                            }
                            handleSetValues('fontFamily', fonts[fontId])
                        }}>
                            <Ionicons name='md-chevron-forward-circle-outline' color={colors.black_faded} size={30} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={[{bgColor: '#fff', color: '#000'}, 
                                {bgColor: '#656565', color: '#fff'},
                                {bgColor: '#C6B7B7', color: '#000'},
                                {bgColor: '#323655', color: '#fff'},
                                 {bgColor: '#F7BCBC', color: '#000'}]}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                setSelected(item.bgColor)
                                handleSetValues('color', item.color)
                                

                            }} style={[styles.align, { backgroundColor: item.bgColor }]}>
                                <View style={{ width: '100%' }}>
                                    <View style={styles.line_1} />
                                    <View style={styles.line_2} />
                                    <View style={styles.line_1} />
                                    <View style={styles.line_2} />
                                </View>
                                <View style={styles.selected}>
                                    {selected === item.bgColor && (
                                        <Ionicons name='checkmark-outline' size={16} color={colors.black} />
                                    )}
                                </View>

                            </TouchableOpacity>
                        )}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={({ item, idx }) => item}
                    />
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black_faded,
        display: 'flex',
        justifyContent: 'flex-end',
        height: Dimensions.get('window').height
    },
    box: {
        backgroundColor: colors.modal_bg,
        height: 400,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 40,

    },
    close: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    font: {
        fontFamily: 'Manrope-Medium',
        color: colors.black,
        fontSize: 15
    },
    line: {
        height: 1,
        width: 20,
        backgroundColor: colors.black,
        // marginBottom: 10

    },
    line_: {
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 7,

    },
    flex: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    font_box: {
        width: '100%',
        height: 60,
        borderColor: colors.black_faded,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        paddingTop: 10,
        paddingLeft: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },
    align: {
        height: 100,
        width: 70,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginTop: 20,
        marginRight: 30,
        paddingLeft: 15
    },
    line_1: {
        width: '60%',
        height: 1,
        backgroundColor: colors.black,
        marginBottom: 10
    },
    line_2: {
        width: '35%',
        height: 1,
        backgroundColor: colors.black,
        marginBottom: 10
    },
    selected: {
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderColor: colors.black,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default FontSettings