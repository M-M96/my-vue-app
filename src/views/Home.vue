<template>
  <div id="checklist">
    <div id="todo">
      <div class="todolist" v-for="(list, index) in lists" v-bind:key="index">
        <button v-on:click="list.show = !list.show">{{ list.category }}</button>
        <div v-if="list.show">
          <div v-if="!list.inputShow" v-on:click="list.inputShow = true">
            <div class="listcate">
              {{ list.category }}
              <div class="list-delete" v-on:click="deleteList(index)"></div>
            </div>
          </div>
          <div v-else>
            <input
              type="text"
              v-model="list.category"
              v-on:keydown.enter="list.inputShow = false"
            />
          </div>
          <TodoList></TodoList>
        </div>
        <div v-else></div>
      </div>
    </div>

    <div class="input-container">
      <div class="input-cate" v-if="!inputCate" v-on:click="inputCate = true">
        カテゴリー追加
      </div>
      <div v-else>
        <input
          class="input-list"
          type="text"
          placeholder="入力"
          v-model="inputList"
          v-on:keydown.enter="addList"
        />
        <div class="lisbutton">
          <button class="list-button" v-on:click="addList">追加</button>
          <button class="list-button" v-on:click="inputCate = false">
            キャンセル
          </button>
        </div>
      </div>
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
      lists: [{ category: "買い物リスト", show: true, inputShow: false }],
      inputCate: false,
    }
  },
  methods: {
    addList() {
      if (this.inputList !== "") {
        this.lists.push({
          category: this.inputList,
          show: true,
          inputShow: false,
        })
        this.inputCate = false
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
  display: flex;
}

#todo {
  width: 50%;
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

.input-container {
  width: 500px;
  height: 3rem;
  background-color: rgb(97, 97, 248);
}

.input-cate {
  width: 50%;
  border-radius: 4px;
  color: #fff;
  font-size: 1em;
  border-width: 0px;
}

.list-button {
  padding: auto;
  color: #fff;
  background-color: #2ab643;
  border-radius: 4px;
  user-select: none;
}

.input-list {
  width: 50%;
  padding: 4px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 0 #ccc;
  font-size: 1em;
  border-width: 0px;
}

.input-list:focus {
  outline: 0;
}
</style>
