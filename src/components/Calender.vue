<template>
  <div>
    <h2>カレンダー{{ currentDate }}</h2>
    <div id="CAL">
      <div class="CAL-week" v-for="(week, index) in calendars" :key="index">
        <div class="CAL-day" v-for="(day, index) in week" :key="index">
          {{ day.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      currentDate: moment(),
    }
  },
  methods: {
    getStartDate() {
      let date = moment(this.currentDate)
      date.startOf("month")
      const youbiNum = date.day()
      return date.subtract(youbiNum, "days")
    },
    getEndDate() {
      let date = moment(this.currentDate)
      date.endOf("month")
      const youbiNum = date.day()
      return date.add(6 - youbiNum, "days")
    },
    getCalendar() {
      let startDate = this.getStartDate()
      const endDate = this.getEndDate()
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7)
      let calendars = []
      for (let week = 0; week < weekNumber; week++) {
        let weekRow = []
        for (let day = 0; day < 7; day++) {
          weekRow.push({
            date: startDate.get("date"),
          })
          startDate.add(1, "days")
        }
        calendars.push(weekRow)
      }
      return calendars
    },
  },
  mounted() {
    console.log(this.getCalender())
  },
  computed: {
    calendars() {
      return this.getCalendar()
    },
  },
}
</script>

<style scoped>
#CAL {
  width: 100%;
  border-top: 5px solid red;
}

.CAL-week {
  display: flex;
  justify-content: space-around;
  border-left: 5px solid green;
}
.CAL-day {
  width: 100px;
  height: 50px;
  text-align: center;
  min-height: 125px;
}

.CAL-day:hover {
  background-color: gray;
}
</style>
