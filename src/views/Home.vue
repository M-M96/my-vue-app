<template>
  <div id="checklist">
    <div id="todo">
      <div class="todolist" v-for="(list, index) in lists" v-bind:key="index">
        <div class="listcate">
          {{ list.category }}
          <div class="list-delete" v-on:click="deleteList(index)"></div>
        </div>
        <TodoList></TodoList>
      </div>
    </div>
    <div>
      <input
        class="input-list"
        type="text"
        placeholder="入力"
        v-model="inputList"
      />
      <button v-on:click="addList">リスト追加</button>
    </div>
  </div>
</template>

<script>
import TodoList from "../components/TodoList.vue"
export default {
  components: { TodoList },
  data() {
    return {
      inputList: "",
      lists: [{ category: "買い物リスト" }],
    }
  },
  methods: {
    addList() {
      if (this.inputList !== "") {
        this.lists.push({ category: this.inputList })
      }
    },
    deleteList(index) {
      this.lists.splice(index, 1)
    },
  },
}
</script>

<style scoped>
#checklist {
  width: 100%;
  height: 100%;
}

#todo {
  display: flex;
  flex-wrap: wrap;
}

.todolist {
  background-color: rgb(97, 97, 248);
}

.listcate {
  display: flex;
  width: 95%;
  margin: 0.5rem;
  background-color: white;
}

.listcate:hover .list_delete {
  bottom: 4px;
  right: 4px;
  z-index: 16;
  opacity: 0.5;
  color: #f00;
}

.listcate:hover .list-delete:after {
  content: "削除";
}
</style>
