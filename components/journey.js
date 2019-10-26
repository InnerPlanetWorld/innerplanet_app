import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Journey extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text>{this.props.mode}, {this.props.distance}{this.props.unit}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
