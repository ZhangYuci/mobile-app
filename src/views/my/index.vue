<template>
  <div class="app-container padding">
    <van-cell-group inset class="group user-info">
      <van-image
        round
        fit="cover"
        width="5rem"
        height="5rem"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <div class="user-name">
        <span>张三</span><van-tag round type="primary">系长</van-tag>
      </div>
    </van-cell-group>
    <van-cell-group inset class="group">
      <van-cell title="修改密码" is-link @click="handleChangePWD" />
    </van-cell-group>
    <van-cell-group inset class="group logout">
      <van-cell title="退出登录" clickable @click="show = true" />
    </van-cell-group>
  </div>
  <van-action-sheet
    v-model:show="show"
    :actions="actions"
    cancel-text="取消"
    description="系统将删除您的登录信息"
    close-on-click-action
  />
</template>

<script>
import { showConfirmDialog } from "vant";
import { mapMutations } from "vuex";
export default {
  name: "My",
  data() {
    return {
      show: false,
      actions: [
        { name: "退出登录", color: "#ee0a24", callback: this.handlelogout },
      ],
    };
  },
  methods: {
    ...mapMutations("app", ["logout"]),
    handleChangePWD() {
      this.$router.push("/my/change-password");
    },
    handlelogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-name {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    padding-right: 5px;
  }
}
.group {
  margin-bottom: 10px;
}

.logout:deep(.van-cell__title) {
  text-align: center;
  color: red;
}
</style>
