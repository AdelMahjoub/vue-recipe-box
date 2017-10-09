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
          <div
          @click="menuIsOpen = !menuIsOpen"
          :class="{'is-active': menuIsOpen}"
          class="navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <!-- navbar right side: visible on desktop, hidden on touch devices -->
        <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
        <div
        :class="{'is-active': menuIsOpen}"
        class="navbar-menu">
          <!-- menu left part -->
          <div class="navbar-start">

          </div>
          <!-- menu right part -->
          <div class="navbar-end">
            <a
            :key="socialLink.name"
            v-for="socialLink in socialLinks" 
            :href="socialLink.url" 
            class="navbar-item"
            target="_blank">
              <span class="has-icon">
                <i :class="socialLink.icon" class="fa-lg"></i>
                <span>{{ socialLink.name }}</span>
              </span>
            </a>
          </div>
        </div>
        </transition>
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
      brand: 'recipe box',
      socialLinks: [
        {
          url: 'https://github.com/AdelMahjoub/vue-recipe-box',
          icon: 'fa fa-github',
          name: 'Github'
        },
        {
          url: 'https://www.freecodecamp.org/adelmahjoub',
          icon: 'fa fa-free-code-camp',
          name: 'Freecodecamp'
        }
      ],
      menuIsOpen: false,
    }
  },
}
</script>

<style scoped>
  .navbar-brand > .navbar-item {
    padding-left: 0;
  }
  a.navbar-item {
    font-weight: bold;
  }
  .navbar-menu .navbar-item span{
    font-family: 'Bad Script', cursive;
  }
  #brand-title {
    font-size: 22px;
    letter-spacing: 2px;
    font-family: 'Bad Script', cursive;
    margin-left: 14px;
  }
</style>
