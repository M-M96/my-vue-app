<template>
  <div id="app">
    <div>
      <router-view />
    </div>
    <div class="hello-world">
      <img alt="Vue logo" src="./assets/logo.png" />
      <div class="hello-world__message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "Hello memo App!!",
    }
  },
  methods: {},
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped>
.hello-world {
  margin-top: 60px;
  text-align: center;
}

.hello-world .hello-world__message {
  color: #2c3e50;
}
</style>
