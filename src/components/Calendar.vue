<template>
  <div id="calendar-app">
    <div id="content">
      <div id="calendar">
        <div id="button-area">
          <button class="button" @click="prevMonth">＜</button>
          <h2>カレンダー{{ displayDate }}</h2>
          <button class="button" @click="nextMonth">＞</button>
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
              @dblclick="openinputEvent(event), GET(day.date)"
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
      <div>
        イベント
        <div v-for="(event, index) in events" v-bind:key="event.id">
          {{ event.name }}
          <button v-on:click="deleteEvent(index)">×</button>
          <div>{{ event.start }}～{{ event.end }}</div>
          <div>メモ欄</div>
        </div>
      </div>
    </div>
    <teleport to="#modal">
      <div class="base" v-show="modal">
        <div class="overlay" v-show="modal" @click="modal = false"></div>
        <div class="content" v-show="modal">
          <div>イベント追加</div>
          <div>
            <label> 開始日 </label>
            <input v-model="form.start" />
          </div>
          <div>
            <label> 終了日 </label>
            <input v-model="form.end" />
          </div>
          <div>
            <label>イベント</label>
            <input
              type="text"
              v-model="inputEvent"
              placeholder="入力してね"
              class="input-cal"
            />
          </div>
          <select v-model="selected">
            <option
              v-for="selectcolor in selectcolors"
              v-bind:key="selectcolor"
              :style="`background:${selectcolor}`"
            >
              {{ selectcolor }}
            </option>
          </select>
          <div v-on:click="addEvent" class="cal-add">追加</div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      modal: false,
      inputEvent: "",
      selected: "",
      form: {
        id: "",
        name: "",
        start: "a",
        end: "",
        color: "",
      },
      selectcolors: [
        "#EF5350",
        "#F48FB1",
        "#2196F3",
        "#00BCD4",
        "#009688",
        "#FFC107",
        "#E0E0E0",
      ],
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
    openinputEvent() {
      // Object.assign(this.form, event)
      this.modal = true
    },
    GET(date) {
      console.log(date)
      this.form.start = date
      this.form.end = date
    },
    addEvent() {
      if (this.inputEvent !== "") {
        this.events.push({
          id: this.events.length + 1,
          name: this.inputEvent,
          start: this.form.start,
          end: this.form.end,
          color: this.selected,
        })
        this.modal = false
      }
    },
    deleteEvent(index) {
      this.events.splice(index, 1)
    },
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
  margin: auto 1rem 1rem 0;
  width: 100%;
  height: 700px;
  display: flex;
}

#calendar {
  width: 70%;
}

#button-area {
  display: flex;
  max-width: 700px;
  background-color: rgba(138, 41, 228, 0.699);
  justify-content: space-between;
  color: white;
}

.button {
  font-size: 20px;
  border: none;
  background: none;
  width: 50px;
  color: white;
}

.button:hover {
  font-size: 30px;
}

#CAL {
  max-width: 700px;
  border-top: 1px solid #e0e0e0;
}

.CAL-weekly {
  display: flex;
  border-left: 1px solid #e0e0e0;
}
.CAL-daily {
  flex: 1;
  /* text-align: center; */
  min-height: 85px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-right: -1px;
}

.CAL-daily:hover {
  background-color: grey;
}

.CAL-day {
  text-align: center;
}

.CAL-youbi {
  flex: 1;
  border-right: 1px solid #e0e0e0;
  margin-right: -1px;
  text-align: center;
  background-color: rgb(147, 236, 225);
  padding-top: 5px;
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

.cal-add {
  width: 50px;
  margin-top: 5px;
  padding: 2px 0;
  text-align: center;
  color: #fff;
  background-color: #2ab643;
  border-radius: 4px;
  user-select: none;
}

.cal-add:hover {
  cursor: pointer;
}

.base {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
  opacity: 0.5;
}

.content {
  background-color: white;
  position: relative;
  border-radius: 10px;
  padding: 40px;
}
</style>
