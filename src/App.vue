<template>
  <main>
    <div id="app">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Test from './views/test.vue'

export default {
  components: {
    Test
  }
}

</script>
