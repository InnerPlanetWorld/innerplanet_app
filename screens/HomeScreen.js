import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../constants/data'
import Journey from '../components/journey';
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  TextInput,
  Picker,
  Image,
} from 'react-native';
import { MonoText } from '../components/StyledText';

const FUEL_TYPES = [
  { key: 'diesel', name: 'Diesel' },
  { key: 'petrol', name: 'Petrol' },
  { key: 'electric', name: 'Electric' },
];

// TODO Have breakpoints
const BARRIERS = [
  0,
  20,
  30,
  40,
  50,
  60,
  70,
]

const VEHICLE_OPTIONS = [
  { key: "small_car", name: 'Small car' },
  // { key: "medium_car", name: 'Medium sized car' },
  // { key: "large_car", name: 'Large Car' },
  // { key: "motorbike", name: 'Motorbike' },
  // { key: "scooter", name: 'Scooter' },
  // { key: "motorised_bike", name: 'Motorised Bike' },
  // { key: "electric_scooter", name: 'Electric Scooter' },
  // { key: "electric_bike", name: 'Electric Bike' },
  // { key: "lorry", name: 'Lorry' },
  // { key: "van", name: 'Van' },
  // { key: 'bus', name: 'Bus' },
  { key: 'train', name: 'Train' },
  // { key: 'plane', name: 'Plane' },
]


function getDefaultState() {
  return {
    warming: 0,
    mode: 'small_car',
    distance: 0,
    unit: 'km',
    name: '',
    journeys: [],
  };
}



export default class HomeScreen extends React.Component {
  state = {
    warming: 0,
    mode: 'small_car',
    distance: 0,
    unit: 'km',
    name: '',
    journeys: [],
    planetMode: 'dead',
  }


  updateDistance = (distance) => {
    this.setState({ distance });
  }

  updatePlanetMode = (mode) => {
    this.setState({ planetMode: mode });
  }

  addJourney = () => {
    if (!(this.state.distance && this.state.mode
      && this.state.unit)) {
      return;
    }
    const journeys = this.state.journeys.concat({
      journeyName: this.state.name,
      mode: this.state.mode,
      distance: Number(this.state.distance),
      unit: this.state.unit,
    })
    this.setState(Object.assign(getDefaultState(), { journeys }));
  }

  getData = () => {
    console.log(this.state.journeys);
    axios.post(API_ENDPOINT, {
      transport: this.state.journeys,
    }).then((res) => {
      this.setState({ warming: res.data.warming });
    }).catch((err) => {
      console.log(err);
    });
  }

  updateMode = (key) => {
    this.setState({ mode: key });
  }

  getImage = () => {
    if (this.state.warming < 0.5) {
      return require('../assets/planets/planet_0.jpg');
    }
    return require('../assets/planets/planet_7.png');
  }

  render() {
    let arrs = VEHICLE_OPTIONS.map((s) => {
      return <Picker.Item key={s.key} label={s.name} value={s.key} />
    });
    return (
      <View style={styles.container}>
          <TextInput style={styles.distanceContainer} placeholder="Distance travelled (km)"
          keyboardType={'numeric'} onChangeText={this.updateDistance} value={this.state.distance}
          />
          <Text>Vehicle type</Text>
          <Picker
              style={styles.pickerStyle}
              selectedValue={this.state.mode}
              onValueChange={this.updateMode}>
            {arrs}

          </Picker>
          <Button onPress={this.addJourney} title="Add Journey" />
          
          <FlatList data={this.state.journeys}
                    renderItem={({item}) => <Journey mode={item.mode} distance={item.distance} unit={item.unit} />}
                    keyExtractor={(item, index) => index.toString()} />

          <Button onPress={this.getData} title="Get Carbon from Journey" />
          <Text>{this.state.warming}</Text>
          <Image style={styles.planet} source={this.getImage()} />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Inner Planet',
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
  pickerStyle: {
    width: 250,
  },
  planet: {
    width: 200,
    height: 200,
  },
  distanceContainer: {
    margin: 20,
    width: 200,
    textAlign: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#009688',
    marginBottom: 10
  },
});
