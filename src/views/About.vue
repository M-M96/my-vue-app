<template>
  <div class="home">
    <Calendar />
  </div>
</template>

<script>
import moment from "moment"
import Calendar from "@/components/Calendar.vue"
export default {
  components: { Calendar },
  data() {
    return {
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      year: moment().year(),
      month: moment().month() + 1,
      date: moment().date(),
    }
  },
}
</script>

<style>
.home {
  padding-top: 10px;
}
</style>
