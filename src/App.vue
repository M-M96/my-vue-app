<template>
  <div id="app">
    <div>
      <NavBar />
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
export default {
  name: "App",
  components: {
    NavBar,
  },
  data: function () {
    return {
      message: "Hello memo App!!",
    }
  },
  methods: {},
}
</script>

<style></style>
