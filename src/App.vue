<template>
  <main>
    <div id="app">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Login from './views/LoginPage.vue'

export default {
  components: {
    Login
  }
}

</script>
