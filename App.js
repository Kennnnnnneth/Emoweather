import { NavigationContainer } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import store from "./src/store"
import Nav from './src/nav';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import BarContext from './src/nav/BarContext';
export default () => {
  const [isBar, setIsBar] = useState(false)
  return <SafeAreaProvider>
    <Provider store={store} >
      <BarContext.Provider value={{ isBar, setIsBar }}>
        <NavigationContainer>
          <StatusBar hidden />
          <Nav />
        </NavigationContainer>
      </BarContext.Provider>
    </Provider>
  </SafeAreaProvider>
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
EStyleSheet.build({
  $rem: (10 * windowWidth / 393),
  $rwidth: windowWidth * 0.01,
  $rheight: windowHeight * 0.01,
  $h1_s: '2.65rem',
  $h1_h: '3.5rem',
  $h2_s: '2.2rem',
  $h2_h: '2.75rem',
  $h3_s: '2rem',
  $h3_h: '2.7rem',
  $p1_s: '2.2rem',
  $p1_h: '2.75rem',
  $p2_s: '1.8rem',
  $p2_h: '2.45rem',
  $p3_s: '1.56rem',
  $p3_h: '2.2rem',
})