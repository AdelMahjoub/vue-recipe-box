<template>
  <div id="recipe-form">
    <form @submit.prevent="submitRecipe">
      <!-- recipe name, image, description input fields -->
      <div
      :key="`recipe-field-${prop}`"
      v-for="(value, prop) in recipe"
      v-if="!Array.isArray(value) && prop !== 'id'"
      class="field">
        <!-- labels -->
        <transition appear enter-active-class="animated slideInDown">
          <label class="label is-small">{{ prop | propToLabel }}</label>
        </transition>
        <div class="control has-icons-left">
          <!-- recipe name, recipe image -->
          <transition appear enter-active-class="animated flipInY">
            <input
            v-if="prop !== 'description'"
            v-model="recipe[prop]"
            :required="prop | propToRequired"
            class="input is-small" 
            type="text" 
            :placeholder="prop | propToPlaceHolder">
          </transition>
          <!-- recipe description -->
          <transition appear enter-active-class="animated zoomIn">
            <quill-editor
            id="editor"
            v-if="prop === 'description'"
            :options="editorOptions"
            v-model="recipe[prop]"
            ref="editor"></quill-editor>
          </transition>
          <!-- field icon -->
          <transition appear enter-active-class="animated fadeIn">
            <span
            v-if="prop !== 'description'"
            class="icon is-small is-left">
              <i class="fa" :class="{ 'fa-picture-o': prop === 'img', 'fa-font': prop === 'name' }"></i>
            </span>
          </transition>
        </div>
      </div>
      <!-- ingredients input fields-->
      <transition appear enter-active-class="animated slideInDown">
        <div class="field">
          <label class="label is-small">Ingredients</label>
        </div>
      </transition>
      <!-- loop through ingredients array -->
      <transition-group appear enter-active-class="animated flipInY" leave-active-class="animated flipOutX">
        <div 
        class="field is-horizontal"
        :key="`ingredient-${index}`"
        v-for="(ingredient, index) in recipe.ingredients">
          <div class="field-body">
            <div class="field-label is-small">
              <label class="label">{{ index + 1 }}</label>
            </div>
            <!-- loop through each ingredient property -->
            <div
            :key="`ingredient-field-${prop}`"
            v-for="(value, prop) in Object.assign({}, ingredient, {delete: null})" 
            class="field is-grouped">
              <p class="control">
                <!-- ingredient name -->
                <input
                v-if="prop === 'name'"
                v-model="ingredient[prop]"
                :required="prop | propToRequired"
                class="input is-small" 
                type="text" 
                :placeholder="prop | propToPlaceHolder">
                <!-- ingredient quantity -->
                <input
                v-if="prop === 'quantity'"
                v-model.number="ingredient[prop]"
                :required="prop | propToRequired"
                class="input is-small" 
                type="number"
                min="0"
                :placeholder="prop | propToPlaceHolder">
                <!-- ingredient quantity unit -->
                <span 
                v-if="prop === 'unit'"
                class="select is-small">
                  <select v-model="ingredient[prop]">
                    <option
                    :key="unit"
                    v-for="unit in units" 
                    :value="unit">{{ unit }}</option>
                  </select>
                </span>
                <!-- delete ingredient button -->
                <button
                v-if="prop == 'delete'"
                @click="removeIngredient(index)"
                :disabled="recipe.ingredients.length < 2"
                type="button"
                title="Remove ingredient"
                class="button is-small is-danger is-outlined">
                  <span class="icon is-small">
                    <i class="fa fa-remove"></i>
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </transition-group>
      <!-- add ingredient button -->
      <transition appear enter-active-class="animated slideInRight">
        <div class="field">
          <button
          @click="addIngredient"
          type="button"
          title="Add ingredient"
          class="button is-small is-info is-outlined">
            <span class="icon is-small">
              <i class="fa fa-plus"></i>
            </span>
          </button>
        </div>
      </transition>
      <hr>
      <transition appear enter-active-class="animated slideInUp">
        <!-- submit recipe -->
        <div class="field">
          <button class="button is-primary is-small">Save</button>
          <button
          type="button"
          @click="back"
          class="button is-small">Cancel</button>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import Recipe from '../../models/recipe.model';
import Ingredient from '../../models/ingredient.model';
import eventBus from '../../store/eventBus';

import { propToLabel, propToPlaceHolder, propToRequired } from '../../filters/';

export default {
  name: 'recipe-form',
  data() {
    return {
      recipe: this.setRecipe(),
      units: [
        'pice',
        'g',
        'tbsp',
        'kg',
        'mg',
        'oz',
        'tsp',
        'lb',
        'mm',
        'cm',
        'm',
        'inch',
        'l',
        'dl',
        'ml',
        'gallon',
        'quart',
        'pint',
        'cup',
        'gill',
        'fl oz'
      ],
      editorOptions: {
        placeholder: 'Cooking steps and tips...',
        modules: {
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'font': [] }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['blockquote'],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'image', 'video']
          ]
        }
      }
    }
  },
  filters: {
    propToLabel,
    propToPlaceHolder,
    propToRequired
  },
  methods: {
    setRecipe() {
      const id = this.$route.params.id;
      if( id !== 'new') {
        return this.$store.getters.recipe(id);
      }
      return new Recipe();
    },
    addIngredient() {
      this.recipe.ingredients.push(new Ingredient());
    },
    removeIngredient(index) {
      if(this.recipe.ingredients.length > 1) {
        this.recipe.ingredients.splice(index, 1);
      }
    },
    submitRecipe() {
      const id = this.$route.params.id;
      if(id === 'new') {
        this.$store.dispatch('new', this.recipe);
      } else {
        this.$store.dispatch('update', this.recipe);
      }
    },
    back() {
      window.history.back();
    }
  },
  mounted() {
    eventBus.$on('saved', (id) => {
      this.$router.push({name: 'recipes.id', params: { id }});
    });
  }
}
</script>

<style scoped>
.quill-editor {
}
</style>
