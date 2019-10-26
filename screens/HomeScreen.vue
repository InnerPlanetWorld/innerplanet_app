<template>
  <view class="container">
    <text class="heading">Home</text>
    <text class="text">Hello World</text>
    <button title="View Details" @press="goToTab('Details')"></button>
    <button title="View Settings" @press="goToTab('Settings')"></button>
  </view>
</template>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 50px;
}
.heading {
  font-size: 30px;
  font-weight: bold;
  color: darkolivegreen;
  margin: 20px;
}
.text {
  text-align: center;
  margin: 10px;
}
</style>

<script>
export default {
  props: {
    navigation: { type: Object }
  },
  methods: {
    goToTab(tab) {
      this.navigation.navigate(tab)
    },
  }
}
</script>
