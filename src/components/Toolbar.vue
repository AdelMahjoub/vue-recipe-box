<template>
  <div class="level is-mobile">
    <!-- left side of the toolbar -->
    <div class="level-left">
      <div class="level-item">
        <router-link
        v-show="notInEditMode"
        :to="{name: 'recipes.edit', params: {id: 'new'}}"
        class="button is-outlined is-primary">
          <span class="icon is-small">
            <i class="fa fa-plus"></i>
          </span>
          <span>New</span>
        </router-link>
      </div>
    </div>
    <!-- right side of the toolbar -->
    <div class="level-right">
      <div class="level-item">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toolbar',
  data() {
    return {

    }
  },
  computed: {
    notInEditMode() {
      return this.$route.name !== 'recipes.edit';
    }
  }
}
</script>

<style scoped>
  .level {
    margin-bottom: 48px;
  }
</style>
