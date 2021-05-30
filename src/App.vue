<template>
  <div id="app">
    <div>
      <NavBar />
      <router-view />
    </div>
    <Counter v-bind:initialValue="1000"></Counter>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import Counter from "@/components/Counter.vue"
export default {
  name: "App",
  components: {
    Counter,
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
