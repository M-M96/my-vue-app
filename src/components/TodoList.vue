<template>
  <div class="todolist">
    <div id="list">
      <slot></slot>
      <!-- <draggable v-model="todos" draggable=".todo"> -->
      <ul v-if="todos.length">
        <li
          class="todo-content"
          v-for="(todo, index) in todos"
          v-bind:key="index"
        >
          <div class="todo" v-if="!todo.todoShow">
            <div class="todo__checkbox">
              <input type="checkbox" v-model="todo.isDone" />
            </div>
            <div
              class="todo__text todo__text--done"
              v-if="todo.isDone"
              v-on:click="todo.todoShow = true"
            >
              {{ index + 1 }} : {{ todo.text }}
            </div>
            <div v-else class="todo__text" v-on:click="todo.todoShow = true">
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
        <li style="list-style: none">無いよ～</li>
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
      <div>
        <div>
          削除済み項目
          <div v-for="(deletedtodo, index) in deletedtodos" v-bind:key="index">
            {{ deletedtodos }}
          </div>
        </div>
      </div>
      <!-- </draggable> -->
    </div>
  </div>
</template>

<script>
// import draggable from "vuedraggable"
// import firebase from "firebase"
export default {
  // components: { draggable },
  data() {
    return {
      inputTodo: "",
      todos: [],
      deletedtodos: [],
    }
  },
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
      // this.deletedtodos.push(this.todo)
      this.todos.splice(index, 1)
    },
    // postTodo() {
    //   firebase.firestore().collection("todos").add({
    //     text: this.todos.text,
    //     isDone: this.todos.isDone,
    //     todoShow: this.todos.todoShow,
    //   })
    // },
    // created() {
    //   firebase
    //     .firestore()
    //     .collection("todos")
    //     .get()
    //     .then((snapshot) => {
    //       snapshot.docs.forEach((doc) => {
    //         this.todos.push({
    //           id: doc.id,
    //           ...doc.data(),
    //         })
    //       })
    //     })
    // },
  },
}
</script>

<style scoped>
#list {
  min-width: 250px;
  width: 250px;
  margin: 1rem;
}

ul {
  padding: 0;
}

.todo-content,
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

.todo {
  display: flex;
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

.todo_delete:hover,
.todo_add {
  cursor: pointer;
}

.todo_add {
  width: 50px;
  padding: 2px 0;
  text-align: center;
  color: #fff;
  background-color: rgb(108, 108, 243);
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

input:focus {
  outline: 0;
}
</style>
