<template>
  <div class="todolist">
    <div id="list">
      <slot></slot>
      <draggable v-model="todos" draggable=".todo">
        <ul v-if="todos.length">
          <li class="todo" v-for="(todo, index) in todos" v-bind:key="index">
            <div v-if="!todo.todoShow" v-on:click="todo.todoShow = true">
              <div class="todo__checkbox">
                <input type="checkbox" v-model="todo.isDone" />
              </div>
              <div class="todo__text todo__text--done" v-if="todo.isDone">
                {{ index + 1 }} : {{ todo.text }}
              </div>
              <div v-else class="todo__text">
                {{ index + 1 }} : {{ todo.text }}
              </div>
              <div class="todo_delete" v-on:click="deleteTodo(index)"></div>
            </div>
            <div v-else>
              <input
                type="text"
                v-model="todo.text"
                v-on:keydown.enter="todo.todoShow = false"
              />
            </div>
          </li>
        </ul>
        <ul v-else>
          <li style="list-style: none">ないよ</li>
        </ul>
        <div>
          <div class="add">
            <input
              class="input-todo"
              type="text"
              placeholder="入力"
              v-model="inputTodo"
              v-on:keydown.enter="addTodo"
            />
            <div class="todo_add" v-on:click="addTodo">追加</div>
          </div>
        </div>
        <div>{{ todos }}</div>
      </draggable>
    </div>
  </div>
</template>

<script>
// import _ from "lodash"
import draggable from "vuedraggable"
export default {
  components: { draggable },
  data() {
    return {
      inputTodo: "",
      todos: [],
    }
  },
  // watch: {
  //   list: function () {
  //     localStorage.list = JSON.stringify(this.list)
  //   },
  // },
  // created: function () {
  //   if (localStorage.list) {
  //     this.list = JSON.parse(localStorage.list)
  //   }
  // },
  methods: {
    addTodo() {
      if (this.inputTodo !== "") {
        this.todos.push({
          text: this.inputTodo,
          isDone: false,
          todoShow: false,
        })
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
  },
}
</script>

<style scoped>
#list {
  min-width: 250px;
  width: 250px;
  padding: 8px;
  border-radius: 4px;
  background-color: #e2e4e6;
  margin: 1rem;
}

ul {
  padding: 0;
}

.todo,
.add {
  height: 2em;
  width: 95%;
  padding: 4px;
  margin: 5px 2px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 0 #ccc;
  font-size: 1em;
  border-width: 0px;
  display: flex;
  align-items: center;
}

.todo__text {
  margin-left: 1rem;
  /* text-align: left; */
}

.todo__text--done {
  text-decoration-line: line-through;
}

.todo_delete {
  margin-left: 2rem;
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
}

.todo:hover .todo_delete {
  bottom: 4px;
  right: 4px;
  z-index: 16;
  opacity: 0.5;
  color: #f00;
}

.todo:hover .todo_delete:after {
  content: "削除";
}

.todo_add {
  width: 50px;
  padding: 2px 0;
  text-align: center;
  color: #fff;
  background-color: #2ab643;
  border-radius: 4px;
  user-select: none;
}

.input-todo {
  height: 2em;
  width: 75%;
  padding: 4px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 0 #ccc;
  font-size: 1em;
  border-width: 0px;
}

.input-todo:focus {
  outline: 0;
}
</style>
