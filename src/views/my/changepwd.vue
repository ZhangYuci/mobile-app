<template>
  <div class="app-container">
    <van-form validate-trigger="onBlur" @submit="handleChangePassword">
      <van-cell-group inset title="修改密码">
        <van-field
          v-model="oldPassword"
          type="password"
          autocomplete="off"
          label="旧密码"
          placeholder="请填写旧密码"
          :rules="[{ required: true, message: '请填写旧密码' }]"
        />
        <van-field
          v-model="newPassword"
          type="password"
          autocomplete="off"
          label="新密码"
          placeholder="请填写新密码"
          :rules="[{ required: true, message: '请填写新密码' }]"
        />
        <van-field
          v-model="reNewPassword"
          type="password"
          autocomplete="off"
          label="确认新密码"
          placeholder="请确认新密码"
          :rules="[
            { required: true, message: '请确认新密码' },
            {
              validator: passwordValidator,
              message: '两次输入的密码不一致',
              trigger: 'onChange',
            },
          ]"
        />
      </van-cell-group>
      <div class="block-button-container">
        <van-button
          class="full-button"
          round
          block
          type="primary"
          native-type="submit"
          >完成</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
    };
  },
  created() {
    console.log("ChangePassword created");
  },
  activated() {},
  deactivated() {},
  methods: {
    passwordValidator(value) {
      return value === this.newPassword;
    },
    handleChangePassword(data) {},
  },
};
</script>
