import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../constants/data'

var OWN_SCORE;

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  state = {
    warming: 0,
  }

  getData = () => {
    axios.post(API_ENDPOINT, {
      transport: [
        { mode: 'small_car', distance: 50, unit: 'km' },
      ],
    }).then((res) => {
      this.setState({ warming: res.data.warming });
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>{this.state.warming}</Text>
          <Button onPress={this.getData} title="Press Me" />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
