import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { colors } from '../../utils/colors';

import SelectBook from './Books';
import Chapters from './Chapters';
import Verses from './Verses';



const renderScene = SceneMap({
  first: SelectBook,
  second: Chapters,
  third: Verses
});

const renderTabBar = props => {
  return (
    <TabBar
      {...props}
      renderLabel={({ focused, route }) => {
        return (
          <Text style={styles.text}
          >
            {route.title}
          </Text>
        );
      }}
      indicatorStyle={styles.indicatorStyle}
      style={styles.header}
    />
  );
};

function BookTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Books' },
    { key: 'second', title: 'Chapters' },
    { key: 'third', title: 'Verses' },
  ]);

  return (
    <TabView
      sceneContainerStyle={{
        backgroundColor: colors.white
      }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width,  backgroundColor: colors.white }}
      style={styles.header}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: colors.black
  }
})

export default BookTabs