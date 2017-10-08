<template>
  <div id="recipe-details">

    <article class="columns">
      <!-- text section -->
      <div class="column is-12">
        <div class="content">
          <!-- recipe name -->
          <transition appear enter-active-class="animated slideInDown">
            <h1
            class="has-text-centered" 
            :key="recipe.id">{{ recipe.name | capitalize }}</h1>
          </transition>
        </div>
        <hr>
      </div>
    </article>

    <article class="columns">
      <div class="column is-6" id="ingredients">
        <!-- recipe ingredients -->
        <transition appear enter-active-class="animated slideInUp">
          <ul :key="recipe.id">
            <li
            :key="`ingredient-${index}`" 
            v-for="(ingredient, index) in recipe.ingredients">
              <p>
                <span><b>{{ ingredient.name }}</b></span>
                <span class="tag">{{ ingredient.quantity }} {{ ingredient.unit }}</span>
                <span></span>
              </p>
            </li>
          </ul>
        </transition>
      </div>
      <div class="column is-6" id="image">
        <!-- recipe image -->
        <transition appear enter-active-class="animated zoomIn">
          <figure 
          class="image" 
          :key="recipe.id" >
            <img :src="recipe.img" alt="recipe image">
          </figure>
        </transition>
      </div>
    </article>

    <article class="columns">
      <div class="column is-12">
        <hr>
        <!-- recipe description -->
        <transition appear enter-active-class="animated slideInLeft">
          <div
          class="has-text-left" 
          :key="recipe.id"
          v-html="recipe.description"></div>
        </transition>
      </div>
    </article>

    <article class="columns">
      <div class="column is-12">
        <hr>
        <transition appear enter-active-class="animated slideInRight">
          <div
          :key="recipe.id" 
          class="field is-grouped">
            <div class="control">
              <router-link
              v-if="recipe.id"
              :to="{name: 'recipes.edit', params: {id: recipe.id}}"
              class="button is-outlined is-success">
                <span class="icon is-small">
                  <i class="fa fa-pencil"></i>
                </span>
                <span>Edit</span>
              </router-link>
            </div>
            <div class="control">
              <button
              @click="discard" 
              class="button is-outlined is-danger">
                <span class="icon is-small">
                  <i class="fa fa-trash"></i>
                </span>
                <span>Discard</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </article>
  </div>
</template>

<script>
import eventBus from '../../store/eventBus.js';
import { capitalize } from '../../filters/';

export default {
  name: 'recipe-details',
  computed: {
    recipe() {
      const id = this.$route.params.id;
      return this.$store.getters.recipe(id);
    },
  },
  filters: {
    capitalize
  },
  methods: {
    discard() {
      this.$store.dispatch('delete', this.recipe.id);
    }
  },
  mounted() {
    if(!this.recipe.id) {
      this.$router.push({ name: 'recipes.all' });
    }
    eventBus.$on('discarded', id => {
      if(id) {
        this.$router.push({ name: 'recipes.id', params: { id } })
      } else {
        this.$router.push({ name: 'recipes.all' })
      }
    })
  }
}
</script>

<style scoped>
  .card img {
    width: 50%;
    height: 50%;
  }
  ul {
    list-style-type: none;
    margin: 0;
  }
  .content h1 {
    word-wrap: break-word;
  }
</style>
