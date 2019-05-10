<template>
  <div id="index" style="background-color: rgb(255,0,0); height: 100%;">
    <div style="height: 10%; background-color: rgb(0,255,255);">
      <input type="button" value="first" @click="showFirst" />
      <input type="button" value="second" @click="showSecond" />
    </div>
    <div style="height: 90%; background-color: rgb(128,128,128)">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    mixins: [],
    methods: {
      showFirst: function() {
        console.log("first");
        this.$router.push({name: 'first'});
      },
      showSecond: function() {
        console.log("second");
        this.$router.push({name: 'second'});
      }
    },
    mounted: function() {
      console.log('index loaded!');
    }
  }
</script>

