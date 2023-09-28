<template>
  <div class="login-container">
    <div class="login-form">
      <h3>PPEDL效率化管理系统</h3>
      <van-form @submit="handleLogin">
        <van-cell-group inset>
          <van-field
            v-model="account"
            name="account"
            label="账号"
            placeholder="请填写账号"
            autocomplete="off"
            :rules="[{ required: true, message: '请填写账号' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请填写密码"
            autocomplete="off"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div class="block-button-container">
          <van-button round block type="primary" native-type="submit"
            >登 录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import tools from "@/utils/tool";

export default {
  name: "Login",
  computed: {
    ...mapGetters("breadcrumb", ["getCount"]),
    ...mapState("breadcrumb", ["count"]),
  },
  data() {
    return {
      account: "",
      password: "",
    };
  },
  created() {
    // console.log(this.getCount);
    // console.log(import.meta.env.MODE);
    // console.log(import.meta.env.VITE_BASE_URL);
  },
  methods: {
    ...mapMutations("app", ["setAppToken"]),
    /**
     * 登录
     */
    handleLogin(values) {
      this.setAppToken("this is test token string");
      const redirect = this.$route.query?.redirect;
      this.$router.replace(redirect ? decodeURIComponent(redirect) : "/");

      //调用API
      // this.$API.login.getAccessToken.get(123).then((res) => {
      //   console.log(res);
      // });
      // this.addCount();
      // this.$toast({
      //   type: "success",
      //   message: this.count,
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #f7f8fa;
  height: 100vh;
  .login-form {
    padding-top: 30vh;
    h3 {
      margin-bottom: 20px;
      color: #0b3a57;
      padding: 0px 25px;
      position: relative;
    }
    h3::before {
      content: "";
      position: absolute;
      display: inline-block;
      left: 16px;
      top: 7.5%;
      width: 3px;
      height: 85%;
      background: #0b3a57;
    }
  }
}
</style>
