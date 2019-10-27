import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Image,
} from 'react-native';
import {
  Button,
  Layout,
  Text,
  Input,
  Select,
  List,
  ListItem,
} from 'react-native-ui-kitten';
import { API_ENDPOINT } from '../constants/data';

const FUEL_TYPES = [ // eslint-disable-line no-unused-vars
  { key: 'diesel', name: 'Diesel' },
  { key: 'petrol', name: 'Petrol' },
  { key: 'electric', name: 'Electric' },
];

// TODO Have breakpoints
const BARRIERS = [ // eslint-disable-line no-unused-vars
  0,
  20,
  30,
  40,
  50,
  60,
  70,
];

const VEHICLE_OPTIONS = [
  { key: 'small_car', text: 'Small car' },
  // { key: 'medium_car', text: 'Medium sized car' },
  // { key: 'large_car', text: 'Large Car' },
  // { key: 'motorbike', text: 'Motorbike' },
  // { key: 'scooter', text: 'Scooter' },
  // { key: 'motorised_bike', text: 'Motorised Bike' },
  // { key: 'electric_scooter', text: 'Electric Scooter' },
  // { key: 'electric_bike', text: 'Electric Bike' },
  // { key: 'lorry', text: 'Lorry' },
  // { key: 'van', text: 'Van' },
  // { key: 'bus', text: 'Bus' },
  { key: 'train', text: 'Train' },
  // { key: 'plane', text: 'Plane' },
];

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
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
  journeyStyle: {
    width: 400,
  },
  journeyBoxStyle: {
    backgroundColor: 'transparent',
  },
  distanceContainer: {
  },
});

function getDefaultState() {
  return {
    warming: 0,
    mode: null,
    distance: null,
    unit: 'km',
    name: '',
    journeys: [],
  };
}


function renderJourney({ item }) {
  return (
    <ListItem
      style={styles.journeyStyle}
      title={item.mode.text}
      description={`${item.distance}${item.unit}`}
    />
  );
}


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warming: 0,
      carbon: 0,
      mode: null,
      distance: null,
      unit: 'km',
      name: '',
      journeys: [],
    };
  }


  updateDistance = (distance) => {
    this.setState({ distance: distance.replace(/[^0-9]/g, '') });
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
    });
    this.setState((prevState) => Object.assign(getDefaultState(), {
      mode: prevState.mode, // keep mode
      journeys,
    }));
  }

  getData = () => {
    const payload = this.state.journeys.map((j) => Object({
      mode: j.mode.key,
      unit: j.unit,
      distance: j.distance,
    }));
    axios.post(API_ENDPOINT, {
      transport: payload,
    }).then((res) => {
      this.setState({ carbon: res.data['CO2 produced'] });
    }).catch((err) => {
      console.log(err); // eslint-disable-line no-console
    });
  }

  updateMode = (mode) => {
    this.setState({ mode });
  }

  getImage = () => {
    if (this.state.warming < 0.5) {
      return require('../assets/planets/planet_0.jpg');
    }
    return require('../assets/planets/planet_7.png');
  }

  render() {
    return (
      <Layout style={styles.container}>
        <Input
          style={styles.distanceContainer}
          placeholder="Distance travelled (km)"
          status="primary"
          keyboardType="numeric"
          onChangeText={this.updateDistance}
          value={this.state.distance}
        />
        <Text>Vehicle type</Text>
        <Select
          style={styles.pickerStyle}
          data={VEHICLE_OPTIONS}
          placeholder="Choose vehicle"
          selectedOption={this.state.mode}
          onSelect={this.updateMode}
        />
        <Button onPress={this.addJourney}>Add Journey</Button>

        <List
          style={styles.journeyBoxStyle}
          data={this.state.journeys}
          renderItem={renderJourney}
        />

        <Button onPress={this.getData}>Get Carbon from Journey</Button>
        <Text>{this.state.carbon}</Text>
        <Image style={styles.planet} source={this.getImage()} />
      </Layout>
    );
  }
}
