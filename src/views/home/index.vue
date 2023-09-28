<template>
  <div class="app-container">
    <van-grid :column-num="2" class="grid-menu">
      <van-grid-item
        icon="todo-list-o"
        text="经费审核"
        icon-color="#2CC2D5"
        @click="handleGoApprove"
      />
      <van-grid-item
        icon="clock-o"
        text="代办"
        badge="99+"
        icon-color="#F3A035"
      />
    </van-grid>
    <div>
      <p>1</p>
      <p v-for="i in 1">test</p>
      <p>2</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      name: "Home",
    };
  },
  created() {},
  methods: {
    handleGoApprove() {
      this.$router.push("/approve");
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-menu {
  z-index: 0;
}
</style>
