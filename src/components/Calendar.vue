<template>
  <div id="content">
    <h2>カレンダー{{ displayDate }}</h2>
    <div id="button-area">
      <button class="button" @click="prevMonth">前の月</button>
      <button class="button" @click="nextMonth">次の月</button>
    </div>
    <div id="CAL">
      <div class="CAL-weekly">
        <div class="CAL-youbi" v-for="n in 7" v-bind:key="n">
          {{ youbi(n - 1) }}
        </div>
      </div>
      <div
        class="CAL-weekly"
        v-for="(week, index) in calendars"
        v-bind:key="index"
      >
        <div
          class="CAL-daily"
          :class="{ outside: currentMonth !== day.month }"
          v-for="(day, index) in week"
          v-bind:key="index"
          @drop="dragEnd($event, day.date)"
          @dragover.prevent
        >
          <div class="CAL-day">
            {{ day.day }}
          </div>
          <div v-for="dayEvent in day.dayEvents" v-bind:key="dayEvent.id">
            <div
              class="CAL-event"
              v-if="dayEvent.width"
              :style="`width:${dayEvent.width}%;background-color:${dayEvent.color}`"
              draggable="true"
              @dragstart="dragStart($event, dayEvent.id)"
            >
              {{ dayEvent.name }}
            </div>
            <div v-else style="height: 26px"></div>
          </div>
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
      events: [
        {
          id: 1,
          name: "ミーティング",
          start: "2021-05-19",
          end: "2021-05-21",
          color: "blue",
        },
        {
          id: 2,
          name: "イベント",
          start: "2021-05-21",
          end: "2021-05-24",
          color: "limegreen",
        },
      ],
    }
  },
  methods: {
    prevMonth() {
      this.currentDate = moment(this.currentDate.subtract(1, "month"))
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate.add(1, "month"))
    },
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
      let calendarDate = this.getStartDate()
      for (let week = 0; week < weekNumber; week++) {
        let weekRow = []
        for (let day = 0; day < 7; day++) {
          let dayEvents = this.getDayEvents(calendarDate, day)
          weekRow.push({
            day: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
            date: calendarDate.format("YYYY-MM-DD"),
            dayEvents: dayEvents,
          })
          calendarDate.add(1, "days")
        }
        calendars.push(weekRow)
      }
      return calendars
    },
    getDayEvents(date, day) {
      let stackIndex = 0
      let dayEvents = []
      let startedEvents = []
      this.sortedEvents.forEach((event) => {
        let startDate = moment(event.start).format("YYYY-MM-DD")
        let endDate = moment(event.end).format("YYYY-MM-DD")
        let Date = date.format("YYYY-MM-DD")
        if (startDate <= Date && endDate >= Date) {
          if (startDate === Date) {
            ;[stackIndex, dayEvents] = this.getStackEvents(
              event,
              day,
              stackIndex,
              dayEvents,
              startedEvents,
              event.start
            )
          } else if (day === 0) {
            ;[stackIndex, dayEvents] = this.getStackEvents(
              event,
              day,
              stackIndex,
              dayEvents,
              startedEvents,
              date
            )
          } else {
            startedEvents.push(event)
          }
        }
      })
      return dayEvents
    },
    getEventWidth(start, end, day) {
      let betweenDays = moment(end).diff(moment(start), "days")
      if (betweenDays > 6 - day) {
        return (6 - day) * 100 + 95
      } else {
        return betweenDays * 100 + 95
      }
    },
    getStackEvents(event, day, stackIndex, dayEvents, startedEvents, start) {
      ;[stackIndex, dayEvents] = this.getStartedEvents(
        stackIndex,
        startedEvents,
        dayEvents
      )
      let width = this.getEventWidth(start, event.end, day)
      Object.assign(event, {
        stackIndex,
      })
      dayEvents.push({ ...event, width })
      stackIndex++
      return [stackIndex, dayEvents]
    },
    getStartedEvents(stackIndex, startedEvents, dayEvents) {
      let startedEvent
      do {
        startedEvent = startedEvents.find(
          (event) => event.stackIndex === stackIndex
        )
        if (startedEvent) {
          dayEvents.push(startedEvent)
          stackIndex++
        }
      } while (typeof startedEvent !== "undefined")
      return [stackIndex, dayEvents]
    },
    dragStart(event, eventId) {
      event.dataTransfer.effectAllowed = "move"
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.setData("eventId", eventId)
    },
    dragEnd(event, date) {
      let eventId = event.dataTransfer.getData("eventID")
      let dragEvent = this.events.find((event) => event.id == eventId)
      let betweenDays = moment(dragEvent.end).diff(
        moment(dragEvent.start),
        "days"
      )
      dragEvent.start = date
      dragEvent.end = moment(dragEvent.start)
        .add(betweenDays, "days")
        .format("YYYY-MM-DD")
    },
    youbi(dayIndex) {
      const week = ["日", "月", "火", "水", "木", "金", "土"]
      return week[dayIndex]
    },
  },
  mounted() {
    console.log(this.getCalendar())
  },
  computed: {
    calendars() {
      return this.getCalendar()
    },
    displayDate() {
      return this.currentDate.format("YYYY[年]M[月]")
    },
    currentMonth() {
      return this.currentDate.format("YYYY-MM")
    },
    sortedEvents() {
      return this.events.slice().sort(function (a, b) {
        let startDate = moment(a.start).format("YYYY-MM-DD")
        let startDate_2 = moment(b.start).format("YYYY-MM-DD")
        if (startDate < startDate_2) return -1
        if (startDate > startDate_2) return 1
        return 0
      })
    },
  },
}
</script>

<style scoped>
#content {
  margin: 2rem auto;
  width: 900px;
}
#button-area {
  margin: 0.5rem 0;
}

.button {
  padding: 4px 8px;
  margin-right: 8px;
}

#CAL {
  max-width: 900px;
  border-top: 1px solid #e0e0e0;
}

.CAL-weekly {
  display: flex;
  border-left: 1px solid #e0e0e0;
}
.CAL-daily {
  flex: 1;
  /* text-align: center; */
  min-height: 125px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-right: -1px;
}
.CAL-day {
  text-align: center;
}
.CAL-youbi {
  flex: 1;
  border-right: 1px solid #e0e0e0;
  margin-right: -1px;
  text-align: center;
}
.outside {
  background-color: #f7f7f7;
}
.CAL-event {
  color: white;
  margin-bottom: 1px;
  height: 25px;
  line-height: 25px;
  position: relative;
  z-index: 1;
  border-radius: 4px;
  padding-left: 4px;
}
</style>
