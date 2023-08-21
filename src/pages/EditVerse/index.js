import React, { useRef } from "react";
import { Image, Alert, Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground, useWindowDimensions, Dimensions, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { useBook } from "../../context/bookContext";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SelectFont from "./SelectFont";
import FontSize from "./fontSize";
import FontOpacity from "./fontOpacity";
import FontBlur from "./fontBlur";
import Share from 'react-native-share'
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
import { BlurView, VibrancyView } from "@react-native-community/blur";


const renderScene = SceneMap({
    first: SelectFont,
    second: FontSize,
    third: FontOpacity,
    fourth: FontBlur
});

const renderTabBar = props => {
    return (
        <TabBar
            {...props}
            indicatorStyle={styles.indicatorStyle}
            style={styles.header_}
            renderIcon={({ route, focused, color }) => (
                <Ionicons
                    name={route.icon}
                    color={colors.black}
                    size={25}
                />
            )}
        />
    );
};

function EditTabs() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Text', icon: 'language' },
        { key: 'second', title: 'Font', icon: 'md-text' },
        { key: 'third', title: 'Opacity', icon: 'color-fill' },
        { key: 'fourth', title: 'Blur', icon: 'color-filter' },
    ])
    return (
        <TabView
            sceneContainerStyle={{
                backgroundColor: colors.white
            }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            tabBarPosition='bottom'
            swipeEnabled={false}
            initialLayout={{ width: layout.width, backgroundColor: colors.white }}
            renderTabBar={renderTabBar}
        />
    );
}

const EditImage = ({ navigation }) => {
    const {
        selectedVerseToEdit: { verse, verseNumber, verseChapter, verseBook, verseImage },
        fontData
    } = useBook();
    const viewShotRef = useRef(null);

    const shareImage = async () => {
        try {
            const uri = await captureRef(viewShotRef, {
                format: 'png',
                quality: 0.9
            })
            await Share.open({ url: uri })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <SafeAreaView style={{ backgroundColor: colors.white, height: Dimensions.get('window').height }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() =>{
                    Alert.alert(
                        "Please, confirm",
                        "What would you like to do?",
                        [
                          {
                            text: "DISCARD CHANGES",
                            onPress: () => navigation.goBack(),
                            style: "cancel"
                          },
                          { text: "CONTINUE EDITING", onPress: () => console.log("OK Pressed") }
                        ]
                      );
                }}>
                    <Ionicons name='close' size={20} color={colors.black_faded} />
                </TouchableOpacity>
                <TouchableOpacity onPress={shareImage} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name='md-download' color={colors.black_faded} size={25} />
                    <Text style={styles.text}>Download</Text>
                </TouchableOpacity>
            </View>
            {/* <ViewShot
                ref={viewShotRef}
                options={{
                    fileName: `Bible For Today(BT) ${verseBook} ${verseChapter}:${verseNumber}`,
                    format: 'jpg',
                    quality: 0.9
                }}
            > */}

                <ImageBackground source={verseImage} resizeMode='cover' style={styles.image}>
                    <BlurView
                        style={styles.absolute}
                        blurType='dark'
                        blurAmount={Number(fontData.blur)}
                        reducedTransparencyFallbackColor="white"
                    />
                    <View style={{
                        backgroundColor: `rgba(0,0,0,${fontData.brightness})`,
                        height: '100%',
                        width: '100%',
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center'

                    }} >
                        <Text style={[styles.verse, fontData]}>
                            {verse}
                        </Text>
                        <Text style={[styles.book, {
                            color: fontData.color
                        }]}>
                            {verseBook} {verseChapter}:{verseNumber}
                        </Text>
                        <Text style={[styles.today, {
                            color: fontData.color
                        }]}>
                            Bible For Today(BT)
                        </Text>
                    </View>

                </ImageBackground>
            {/* </ViewShot> */}
            <EditTabs />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    header: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.white,
        flexDirection: 'row'
    },
    text: {
        fontFamily: 'Poppins-Regular',
        color: colors.black_faded,
        fontSize: 13
    },
    image: {
        height: 400,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    verse: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: colors.white,
        width: '60%',
        textAlign: 'center'
    },
    book: {
        fontFamily: 'Poppins-Bold',
        color: colors.white,
        fontSize: 30,
        position: 'absolute',
        bottom: 20
    },
    today: {
        fontFamily: 'Poppins-Light',
        color: colors.white,
        fontSize: 12,
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    header_: {
        backgroundColor: colors.white,
        borderTopColor: colors.black,
        borderTopWidth: 0.7
    },
    text_: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: colors.black
    },
    indicatorStyle: {
        top: -3,
        backgroundColor: colors.black
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // zIndex: -
    }

})

export default EditImage