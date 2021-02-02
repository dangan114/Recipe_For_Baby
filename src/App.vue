<template>
  <div id="app">
    <div>
      <img alt="Vue logo" src="./assets/logo.png">
      <Navbar />
    </div>

    <div>
      <router-view />
    </div>

    <div>
      
    </div>
  </div>
</template>

<script>
import Navbar from 'src/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
