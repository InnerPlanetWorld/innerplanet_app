<template>
  <view class="text-container">
    <text class="heading">Hello Other World</texT>
    <button title="Get data" @press="doSomething"></button>
    <text v-if="datastuff === null" class="datastuff">Press button to get data</text>
    <text v-else class="datastuff">
      Your carbon footprint is {{datastuff.stuff}}
    </text>
  </view>
</template>

<style>
.text-container {
  align-items: center;
  justify-content: center;
  flex: 1;
}

.heading {
  font-size: 30px;
  font-weight: bold;
  color: darkolivegreen;
  margin: 20px;
}

.datastuff {
  margin-top: 20px;
}
</style>

<script>
import { API_ENDPOINT } from '../constants';
import axios from 'axios';

export default {
  data() {
    return {
      datastuff: null,
    };
  },
  methods: {
    doSomething() {
      axios.post(API_ENDPOINT, {
        stuff: 'Practically diamond',
      }).then((res) => {
        this.datastuff = res.data;
      });
    },
  },
};
</script>
