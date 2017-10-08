import Vue from 'vue';
import Vuex from 'vuex';
import shortId from 'shortid';
import localForage from 'localforage';

import eventBus from './eventBus';

import Recipe from '../models/recipe.model';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    recipes: [],
    guid: 'a8048a85ef554962ba4dace855237341'
  },
  getters: {
    recipes: state => {
      return state.recipes;
    },
    recipe: state => id => {
      const recipe = state.recipes.find(candidate => candidate.id === id);
      if(recipe) {
        return JSON.parse(JSON.stringify(recipe));
      }
      return new Recipe();
    },
    recipesPage: state => (startIndex, lastIndex) => {
      return state.recipes.slice(startIndex, lastIndex);
    },
    search: state => searchTerm => {
      if(searchTerm) {
        return state.recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
      } else {
        return state.recipes;
      }
    }
  },
  mutations: {
    new: (state, recipe) => {
      state.recipes.unshift(recipe);
      localForage.setItem(state.guid, state.recipes);
      eventBus.$emit('saved', state.recipes[0].id);
      eventBus.$emit('rewind');
    },
    update: (state, recipe) => {
      const index = state.recipes.findIndex(candidate => candidate.id === recipe.id);
      state.recipes.splice(index, 1, recipe);
      localForage.setItem(state.guid, state.recipes);
      eventBus.$emit('saved', recipe.id);
    },
    delete: (state, id) => {
      const index = state.recipes.findIndex(recipe => recipe.id === id);
      state.recipes.splice(index, 1);
      localForage.setItem(state.guid, state.recipes);
      eventBus.$emit('discarded', state.recipes[index - 1] ? state.recipes[index - 1].id : null);
    },
    initRecipes: (state, recipes) => {
      state.recipes = recipes;
    }
  },
  actions: {
    // Add a new recipe
    // Check if the recipe image url is loadable, if not replace it with a placeholder image
    new: (context, recipe) => {
      const id = shortId.generate();
      const candidate = JSON.parse(JSON.stringify(recipe));
      if(!Boolean(candidate.img)) {
        candidate.img = 'http://via.placeholder.com/512x512';
        context.commit('new', Object.assign(candidate, { id }));
      } else {
        const image = new Image();
        image.src = candidate.img;
        image.addEventListener('load', function(e) {
          context.commit('new', Object.assign(candidate, { id }));
        });
        image.addEventListener('error', function(e) {
          candidate.img = 'http://via.placeholder.com/512x512';
          context.commit('new', Object.assign(candidate, { id }));
        });
      }
    },
    // Update a recipe by id, 
    // If the no recipe has the passed id, add a new recipe
    // Check if the recipe image url is loadable, if not replace it with a placeholder image
    update: (context, recipe) => {
      const recent = JSON.parse(JSON.stringify(recipe));
      const old = context.state.recipes.find(candidate => candidate.id === recipe.id);
      if(!Boolean(recent.img)) {
        recent.img = 'http://via.placeholder.com/512x512'
        if(old) {
          context.commit('update', recent);
        } else {
          context.commit('new', recent);
        }
      } else {
        const image = new Image();
        image.src = recent.img;
        image.addEventListener('load', function(e) {
          if(old) {
            context.commit('update', recent);
          } else {
            context.commit('new', recent);
          }
        });
        image.addEventListener('error', function(e) {
          recent.img = 'http://via.placeholder.com/512x512';
          if(old) {
            context.commit('update', recent);
          } else {
            context.commit('new', recent);
          }
        });
      }
    },
    // Remove a recipe by id
    delete: (context, id) => {
      const index = context.state.recipes.findIndex(candidate => candidate.id === id);
      if(index > -1) {
        context.commit('delete', id);
      } else {
        eventBus.$emit('discarded', null);
      }
    },
    // Initialize recipes from localForage
    initRecipes: (context) => {
      localForage.getItem(context.state.guid)
      .then(recipes => {
        if(recipes) {
          context.commit('initRecipes', recipes);
        } else {
          context.commit('initRecipes', []);
        }
      })
      .catch(err => {
        context.commit('initRecipes', []);
      })
    }
  }
});

export default store;