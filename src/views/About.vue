<template>
  <div class="home__wrapper">
    <div class="day">
      <div id="dates">
        <select name="year" v-model="year" v-on:change="modify">
          <option
            v-for="year in getYears()"
            name="year"
            :value="year"
            :key="year"
          >
            {{ year }}
          </option>
        </select>
        <label>年</label>

        <select name="month" v-model="month" v-on:change="modify">
          <option
            v-for="month in months"
            name="month"
            :value="month"
            :key="month"
          >
            {{ month }}
          </option>
        </select>
        <label>月</label>

        <select name="date" v-model="date">
          <option
            v-for="date in getDates(year, month)"
            name="date"
            :value="date"
            :key="date"
          >
            {{ date }}
          </option>
        </select>
        <label>日</label>
        <div>"{{ year }}-{{ month }}-{{ date }}"</div>
      </div>
    </div>
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
  methods: {
    getYears() {
      const goBackYears = 5
      const currentYear = moment().year()
      const startYear = currentYear - 1
      return [...Array(goBackYears + 1).keys()].map((x) => x + startYear)
    },
    getDates(year, month) {
      const maxDate = this.getFinalDate(year, month)
      return [...Array(maxDate).keys()].map((x) => x + 1)
    },
    modify() {
      // 年や月が変更されたとき、日が存在しなくなる場合があるので調整する。
      // 例: 2018-12-31 を選択していて月が 12 から 2 に変更された場合、日を 28 にする。
      if (!moment([this.year, this.month - 1, this.date]).isValid()) {
        this.date = this.getFinalDate(this.year, this.month)
      }
    },
    getFinalDate(year, month) {
      // 月末日
      return moment([year, month - 1])
        .endOf("month")
        .date()
    },
  },
}
</script>
