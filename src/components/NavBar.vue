<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo nav__link">買い物memo</router-link>
    <div class="nav__items">
      <router-link to="/about" class="nav__item nav__link"
        >calender</router-link
      >
      <router-link to="/memo" class="nav__item nav__link"> memo </router-link>
      <router-link to="/help" class="nav__item nav__link"> help </router-link>
    </div>
  </div>
</template>

<style scoped>
.nav__bar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: black;
}
.nav__link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #eee;
  text-decoration: none;
}
.nav__link:visited {
  color: #eee;
}
.nav__link:hover {
  font-weight: bold;
  color: #fff;
}
.nav__logo {
  width: 130px;
}
.nav__items {
  display: flex;
}
.nav__item {
  width: 100px;
  border-left: 1px solid #eee;
}
</style>
