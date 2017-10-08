<template>
  <div id="home">
    <toolbar></toolbar>
    <div class="columns is-7 is-variable">
      <div class="column is-4">
        <recipe-list></recipe-list>
      </div>
      <div class="column is-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from '../components/Toolbar';
import RecipeList from '../components/Recipes/RecipeList';

export default {
  name: 'home',
  components: {
    Toolbar,
    RecipeList
  }
}
</script>

<style scoped>

</style>
