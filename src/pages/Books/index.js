import React from "react";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, Text, StyleSheet, useWindowDimensions, SafeAreaView, Dimensions } from "react-native";
import { colors } from "../../utils/colors";
import BooksBuy from "./BooksBuy";
import BuyBible from "./BuyBible";

const Book = () => <Text>Book</Text>


const renderScene = SceneMap({
    first: BooksBuy,
    second: BuyBible,
    third: Book,
});

const renderTabBar = props => {
    return (
        <TabBar
            activeColor="#6b5a39"
            {...props}
            renderIndicator={() => null}
            renderLabel={({ focused, route }) => {
                console.log(focused)
                return (
                    <Text style={[styles.text, {
                        marginLeft: route.title === 'Bibles' ? -50 : 20,
                        fontSize: focused ? 20 : 12,
                        paddingTop: focused ? -20 : 6
                    }]}
                    >
                        {route.title}
                    </Text>
                );
            }}
            onTabPress={({ route, preventDefault }) => {
                if (route.key === 'third') {
                  preventDefault();
            
                }
              }}
            indicatorStyle={styles.indicatorStyle}
            style={styles.header}
        />
    );
};

function Books() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Books' },
        { key: 'second', title: 'Bibles' },
        { key: 'third', title: '' },
    ]);

    return (
        <TabView
            sceneContainerStyle={{
                backgroundColor: colors.white
            }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width, backgroundColor: colors.white }}
            style={styles.header}
            renderTabBar={renderTabBar}
        />
    );
}

const BuyBooks = () => {
    return (
        <SafeAreaView>
            <View style={{ height: Dimensions.get('window').height - 100, marginBottom: 100 }}>
                <Books />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.white,
        height: 60,
        borderBottomWidth: 0.7
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: colors.black,
        // borderWidth: 1,
        height: 60,
        width: 100,
        // paddingTop: 10

    }
})

export default BuyBooks