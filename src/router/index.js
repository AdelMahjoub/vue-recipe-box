import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/Home.vue';
import RecipeDetails from '../components/Recipes/RecipeDetails.vue';
import RecipeForm from '../components/Recipes/RecipeForm.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/recipes' },
    { path: '/recipes', name: 'recipes.all', component: Home, children: [
      { path: 'edit/:id', name: 'recipes.edit', component: RecipeForm },
      { path: ':id', name: 'recipes.id', component: RecipeDetails },
    ]}
  ],
  mode: 'history'
});

export default router;