<template>
  <div id="checklist">
    <div id="input-container">
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
        <button class="add-button" v-on:click="addList">追加</button>
        <button class="cancel-button" v-on:click="inputCate = false">
          キャンセル
        </button>
      </div>
    </div>
    <div id="todo">
      <div class="todolist" v-for="(list, index) in lists" v-bind:key="index">
        <button class="show-button" v-on:click="list.show = !list.show">
          ＋{{ list.category }}
        </button>
        <div v-if="list.show">
          <div v-if="!list.inputShow" v-on:click="list.inputShow = true">
            <div class="listcate">
              {{ list.category }}
              <div class="list-delete" v-on:click="deleteList(index)"></div>
            </div>
          </div>
          <div v-else>
            <input
              class="inputcatebutton"
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
  padding-top: 10px;
}

#todo {
  display: flex;
  flex-wrap: wrap;
}

.todolist {
  background-color: rgb(211, 210, 223);
  border-radius: 5px;
  margin-top: 10px;
}

.listcate {
  display: flex;
  width: 95%;
  margin: 0.5rem;
}

.list-delete:hover {
  cursor: pointer;
}

.listcate:hover .list_delete {
  bottom: 4px;
  right: 4px;
  z-index: 16;
  opacity: 0.5;
}

.listcate:hover .list-delete:after {
  content: "削除";
}

.inputcatebutton {
  margin: 5px;
  padding: 3px;
  border-width: 0;
  border-radius: 3px;
}

.inputcatebutton:focus {
  outline: 0;
}

#input-container {
  width: 450px;
  background-color: rgb(211, 210, 223);
  border-radius: 5px;
  padding: 5px;
}

.input-cate {
  width: 50%;
  border-radius: 4px;
  font-size: 1em;
  border-width: 0px;
}

.add-button,
.cancel-button {
  margin: 1px;
  padding: auto;
  color: #fff;
  background-color: rgb(108, 108, 243);
  border-radius: 4px;
  user-select: none;
  border-width: 0;
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
