<template>
  <van-nav-bar
    :safe-area-inset-top="true"
    :title="$route.meta.title"
    :border="false"
    fixed
    placeholder
    :left-arrow="$route.meta.back ?? false"
    v-if="$route.meta.nav ?? true"
    @click-left="handleLeftClick"
  />

  <div :class="mainClass">
    <router-view v-slot="{ Component }">
      <keep-alive :include="$store.state.app.keepAliveRoute" :max="15">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>

  <van-tabbar
    v-if="$route.meta.tabbar ?? true"
    :safe-area-inset-bottom="true"
    route
  >
    <van-tabbar-item
      replace
      v-for="item in appTabbarMenu"
      :to="item.path"
      :icon="item.icon"
      >{{ item.title }}</van-tabbar-item
    >
  </van-tabbar>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    const tabbar = this.getTabbarStatus();
    return {
      mainClass: {
        main: true,
        tabbar,
      },
    };
  },
  computed: {
    ...mapState("app", ["appTabbarMenu"]),
  },
  watch: {
    $route: {
      handler() {
        this.mainClass.tabbar = this.getTabbarStatus();
      },
    },
  },
  created() {},
  methods: {
    handleLeftClick() {
      this.$router.back();
    },
    getTabbarStatus() {
      return this.$route.meta.tabbar ?? true;
    },
  },
};
</script>
