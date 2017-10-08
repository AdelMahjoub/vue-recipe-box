<template>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
  <article class="media" id="recipe-list-item">
    <!-- recipe thumbnail -->
    <figure class="media-left">
      <p class="image is-32x32">
        <img :src="recipe.img" alt="recipe thumbnail">
      </p>
    </figure>
    <!-- recipe content -->
    <div class="media-content">
      <div class="content">
        <p><strong>{{ recipe.name | capitalize | shorten}}</strong></p>
      </div>
    </div>
  </article>
  </transition>
</template>

<script>
import { capitalize, shorten } from '../../filters/';

export default {
  name: 'recipe-list-item',
  props: ['recipe'],
  filters: {
    capitalize,
    shorten
  }
}
</script>

<style scoped>

</style>
