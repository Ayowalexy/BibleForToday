import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStacks from './stack';
import RootTabs from './tabs';


const RootNavigation = () => {
    return (
        <NavigationContainer>
            <RootStacks />
        </NavigationContainer>
    )
}

export default RootNavigation