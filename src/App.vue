<template>
  <div id="app">
    <navbar></navbar>
    <div class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    Navbar
  },
  methods: {
    ...mapActions([ 'initRecipes' ])
  },
  mounted() {
    this.initRecipes();
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Bad+Script');
  ::-webkit-scrollbar {
      width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #999;
  }
</style>
