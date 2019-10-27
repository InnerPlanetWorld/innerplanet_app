import React from 'react';
import { StyleSheet } from 'react-native';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten';
import HomeScreen from './screens/HomeScreen';

const App = () => (
  <ApplicationProvider mapping={mapping} theme={darkTheme}>
      <HomeScreen/>
  </ApplicationProvider>
);

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
  },
});
