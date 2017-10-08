<template>
  <div id="app">
    <navbar></navbar>
    <div class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from './components/Navbar';
import PageFooter from './components/PageFooter';

export default {
  name: 'app',
  components: {
    Navbar,
    PageFooter

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
  @import url('https://fonts.googleapis.com/css?family=Bad+Script|Oswald');
  * {
    font-family: 'Oswald', sans-serif;
  }
  #app > .section {
    min-height: 700px;
  }
  ::-webkit-scrollbar {
      width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #999;
  }
</style>
