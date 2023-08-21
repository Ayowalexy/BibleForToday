import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View, SafeAreaView, StyleSheet, Platform, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import BuyBooks from '../pages/Books';

const Tabs = createBottomTabNavigator();


function MyTabBar({ state, descriptors, navigation }) {
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', height: 60 , justifyContent: 'center', alignItems: 'center', paddingLeft: 15, paddingRight: 15}}>
                
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tab}
                        >

                            {
                                route.name === 'Home'
                                    ?
                                    <Ionicons name='ios-book' size={20} color='#000' />
                                    : route.name === 'Books'
                                        ?
                                        <Ionicons name='ios-cart' size={20} color='#000' />
                                        : route.name === 'Plans'
                                            ? <Ionicons name='ios-cart' size={20} color='#000' />
                                            : route.name === 'Menu'
                                                ? <Ionicons name='menu' size={20} color='#000' />
                                                : null


                            }
                            <Text style={{ color: isFocused ? '#673ab7' : '#222', ...styles.text }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
                
            </View>
        </SafeAreaView>
    );
}



const RootTabs = () => {
    return (
        <Tabs.Navigator
            tabBar={props => <MyTabBar {...props} />}
            initialRouteName='Dashboard'
            screenOptions={({ route }) => ({

                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    height: 60
                },
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false
            })}

        >
            <Tabs.Screen name='Home' component={Home} />
            <Tabs.Screen name='Books' component={BuyBooks} />
            {/* <Tabs.Screen name='Plans' component={Home} /> */}
            <Tabs.Screen name='Menu' component={Menu} />


        </Tabs.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        flexDirection: 'row'
    },
    tab: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontFamily: 'Manrope-Medium',
        fontSize: 11
    }
})

export default RootTabs;