<!-- ❗️ .vueファイルの中で、<template>タグは、1つの子しか持てません。❗️ -->
<template>
  <div class="counter">{{ count }}</div>
</template>

<script>
export default {
  props: {
    initialValue: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      count: this.initialValue,
    }
  },
}
</script>

<!-- ❗️ <style scoped>を使うと、CSSのスコープをこの.vueファイルに限定できます! ❗️ -->
<style scoped>
.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgreen;
}
</style>
