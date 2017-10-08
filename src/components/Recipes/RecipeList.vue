<template>
  <div id="recipe-list">
    <nav class="panel">
      <p class="panel-heading">Recipes</p>
      <div class="panel-block">
        <!-- search field -->
        <p class="control has-icons-left">
          <input
          v-model="searchTerm"
          class="input is-small" 
          type="text" 
          placeholder="search">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
      </div>
      <!-- recipes -->
        <router-link
        active-class="is-active"
        :to="{name: 'recipes.id', params: {id: recipe.id}}"
        :key="recipe.id"
        v-for="recipe in recipes" 
        class="panel-block">
          <!-- recipe -->
          <recipe-list-item :recipe="recipe"></recipe-list-item>
        </router-link>
      
      
      <!-- pagination -->
      <div class="panel-block">
        <nav class="pagination is-right">
          <!-- previous page -->
          <a
          @click="paginate(-1)" 
          class="pagination-previous">
            <span class="icon is-small">
              <i class="fa fa-chevron-left"></i>
            </span>
          </a>
          <!-- next page -->
          <a 
          @click="paginate(1)"
          class="pagination-next">
            <span class="icon is-small">
              <i class="fa fa-chevron-right"></i>
            </span>
          </a>
          <!-- pages select -->
          <ul class="pagination-list">
            <div class="level is-mobile">
              <div class="level-item">
                <span>page</span>
              </div>
              <div class="level-item">
                <span class="select control">
                  <!-- select page-->
                  <select v-model.number="pagination.currentPage">
                    <option
                    :key="`page-${page}`" 
                    v-for="page in lastPage">{{ page }}</option>
                  </select>
                </span>
              </div>
              <div class="level-item">
                <span>of</span> 
              </div>
              <div class="level-item">
                <span>{{ lastPage }}</span>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </nav>
  </div>
</template>

<script>
import eventBus from '../../store/eventBus';

import RecipeListItem from './RecipeListItem';

export default {
  name: 'recipe-list',
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 10,
      },
      searchTerm: ''
    }
  },
  components: {
    RecipeListItem
  },
  computed: {
    recipes() {
      if(!this.searchTerm) {
        const startIndex = (this.pagination.currentPage - 1) * this.pagination.perPage
        const lastIndex = this.pagination.currentPage * this.pagination.perPage;
        return this.$store.getters.recipesPage(startIndex, lastIndex);
      } else {
        this.pagination.currentPage = 1;
        return this.$store.getters.search(this.searchTerm)
      }
    },
    totalItems() {
      return this.$store.state.recipes.length;
    },
    lastPage() {
      return Math.ceil(this.$store.state.recipes.length / this.pagination.perPage);
    }
  },
  methods: {
    paginate(dp) {
      let cp = this.pagination.currentPage;
      this.pagination.currentPage = Math.max(1, Math.min(this.lastPage, cp + dp));
    }
  },
  mounted() {
    eventBus.$on('rewind', () => {
      this.pagination.currentPage = 1;
    });
  }
}
</script>

<style scoped>
  nav.pagination {
    width: 100%;
  }
  .pagination-list span {
    margin-left: 2px;
    margin-right: 2px;
  }
  .panel-block.is-active {
    border-left-width: 4px;
  }
</style>
