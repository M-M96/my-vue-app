<template>
  <div class="home__wrapper">
    <Helpnav />
  </div>
</template>

<script>
import Helpnav from "@/components/help.vue"
export default {
  components: { Helpnav },
}
</script>

<style scoped>
.home__wrapper {
  margin: 0 auto;
  max-width: 600px;
  background-color: #ccc;
}
</style>
