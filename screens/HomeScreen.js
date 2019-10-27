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
  Icon,
} from 'react-native-ui-kitten';
import { API_ENDPOINT } from '../constants/data';

const StarIcon = (style) => (
  <Icon {...style} name="trash-2-outline" />
);

const FUEL_TYPES = [ // eslint-disable-line no-unused-vars
  { key: 'diesel', name: 'Diesel' },
  { key: 'petrol', name: 'Petrol' },
  { key: 'electric', name: 'Electric' },
];

// TODO Have breakpoints
const CARBON_BRACKETS = [
  // Brackets are calculated as the first number
  // the carbon generated is less than
  [10, require('../assets/planets/planet_0.jpg')],
  [20, require('../assets/planets/planet_1.jpg')],
  [30, require('../assets/planets/planet_2.jpg')],
  [40, require('../assets/planets/planet_3.jpg')],
  [50, require('../assets/planets/planet_4.jpg')],
  [60, require('../assets/planets/planet_5.jpg')],
  [Number.MAX_VALUE, require('../assets/planets/planet_6.jpg')],

];


// TODO enable these options once backend supports them
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


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  removeJourney = (index) => {
    this.setState((prevState) => {
      const newJourneys = [...prevState.journeys];
      newJourneys.splice(index, 1);
      return { ...prevState, journeys: newJourneys };
    });
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
    for (let i = 0; i < CARBON_BRACKETS.length; i++) {
      if (this.state.carbon < CARBON_BRACKETS[i][0]) {
        return CARBON_BRACKETS[i][1];
      }
    }
    return require('../assets/planets/planet_default.png');
  }

  renderJourney = ({ item }) => (
    <ListItem
      style={styles.journeyStyle}
      title={item.mode.text}
      accessory={this.renderJourneyRemoveButton}
      description={`${item.distance}${item.unit}`}
    />
  );

  renderJourneyRemoveButton = (style, index) => (
    <Button status="danger" icon={StarIcon} onPress={() => this.removeJourney(index)} />
  )

  render() {
    return (
      <Layout style={styles.container}>
        <Text>{Math.round(this.state.carbon)}kg of carbon produced</Text>
        <Image style={styles.planet} source={this.getImage()} />
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
          renderItem={this.renderJourney}
        />

        <Button onPress={this.getData}>Get Carbon from Journey</Button>
      </Layout>
    );
  }
}
