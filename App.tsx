import React, { useEffect } from 'react';
import RootNavigation from './src/navigations';
import BookContextProvider from './src/context/bookContext';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <BookContextProvider>
        <RootNavigation />
      </BookContextProvider>
    </Provider>
  );
};

export default App;
