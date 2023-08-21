import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, useWindowDimensions, TouchableOpacity, Pressable } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import Compare from "./Compare";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useBook } from "../../context/bookContext";

const renderScene = SceneMap({
    first: Compare
});

const renderTabBar = props => {

    const { setCompareModalVisible } = useBook();
    return (
        <TabBar
            {...props}
            renderIndicator={() => null}
            style={styles.header}
            renderLabel={({ focused, route }) => {
                return (
                    <TouchableOpacity 
                        onPress={() => console.log('Hello')}
                        style={{
                            flexDirection: 'row', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            backgroundColor: 'red',
                            
                            }}>
                        <MaterialCommunityIcons name='plus' color={colors.black} size={30} />
                        <Text style={styles.text}>
                            {route.title}
                        </Text>
                    </TouchableOpacity>
                );
            }}
        />
    );
};

function Tabs() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'ADD VERSION', },

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


const CompareTabs = () => (
    <SafeAreaView>
        <View style={{ height: Dimensions.get('window').height - 100, marginBottom: 100 }}>
            <Tabs />
        </View>
    </SafeAreaView>
)


const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.black,
        height: 60
    },
    text: {
        fontFamily: "Poppins-Medium",
        fontSize: 16,
        color: colors.black,

    }
})


export default CompareTabs
