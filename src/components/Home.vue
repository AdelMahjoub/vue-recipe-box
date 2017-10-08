<template>
  <div id="home">
    <toolbar></toolbar>
    <div class="columns is-7 is-variable">
      <div class="column is-4">
        <recipe-list></recipe-list>
      </div>
      <div class="column is-8">
        <transition appear enter-active-class="animated tada">
          <recipe-landing v-show="$route.name === 'recipes.all'"></recipe-landing>
        </transition>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from '../components/Toolbar';
import RecipeList from '../components/Recipes/RecipeList';
import RecipeLanding from '../components/Recipes/RecipeLanding';

export default {
  name: 'home',
  components: {
    Toolbar,
    RecipeList,
    RecipeLanding
  }
}
</script>

<style scoped>

</style>
