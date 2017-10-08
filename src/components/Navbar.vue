<template>
  <div id="navbar">
    <div class="navbar is-light">
      <div class="container">
        <!-- navbar left side: visible on all devices -->
        <div class="navbar-brand">
          <router-link :to="{name: 'recipes.all'}" class="navbar-item">
            <img id="brand-logo" src="../assets/logo.png" alt="recipe box brand logo" width="32">
            <span id="brand-title">{{ brand | capitalize }}</span>
          </router-link>
          <div class="navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <!-- navbar right side: visible on desktop, hidden on touch devices -->
        <div class="navbar-menu">
          <!-- menu left part -->
          <div class="navbar-start">

          </div>
          <!-- menu right part -->
          <div class="navbar-end">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { capitalize } from '../filters/';

export default {
  name: 'navbar',
  filters: {
    capitalize: capitalize
  },
  data() {
    return {
      brand: 'recipe box'
    }
  }
}
</script>

<style scoped>
  .navbar-brand > .navbar-item {
    padding-left: 0;
  }
  .navbar-menu .navbar-item {
    padding-right: 0;
  }
  a.navbar-item {
    font-weight: bold;
  }
  #brand-title {
    font-size: 22px;
    letter-spacing: 2px;
    font-family: 'Bad Script', cursive;
    margin-left: 14px;
  }
</style>
