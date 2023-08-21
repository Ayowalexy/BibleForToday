import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Select from "../pages/Select";
import RootTabs from "./tabs";
import BookDetails from "../pages/Books/BookDetails";
import EditImage from "../pages/EditVerse";
import CompareTabs from "../pages/Compare";
import Compare from "../pages/Compare/Compare";
import AddNote from "../pages/Note";
import AddedNotes from "../pages/AddedNotes";
import AddedBookmarks from "../pages/AddedBookmarks";
import Search from "../pages/Search";

const Stack = createNativeStackNavigator();


const RootStacks = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Tabs">
            <Stack.Screen name='Tabs' component={RootTabs} />
            <Stack.Screen name='Select' component={Select} />
            <Stack.Screen name="Book Details" component={BookDetails} />
            <Stack.Screen name='Edit Image' component={EditImage} />
            <Stack.Screen name="Compare" component={Compare} />
            <Stack.Screen name='Add Note' component={AddNote} />
            <Stack.Screen name='Added Notes' component={AddedNotes} />
            <Stack.Screen name='Added Bookmarks' component={AddedBookmarks} />
            <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
    )
}

export default RootStacks