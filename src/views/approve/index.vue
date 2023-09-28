<template>
  <div class="app-container">
    <van-dropdown-menu>
      <van-dropdown-item v-model="status" :options="approveStatus" />
      <van-dropdown-item v-model="type" :options="approveType" />
      <van-dropdown-item title="检索" ref="itemSearchRef">
        <van-search
          shape="round"
          v-model="searchContent"
          placeholder="请输入检索关键字"
          @search="onConfirm"
          autocomplete="off"
        />
        <div class="block-button-container-lr">
          <van-button type="primary" block round @click="onConfirm">
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    
  </div>
</template>
<script>
const approveStatus = [
  {
    text: "全部状态",
    value: 0,
  },
  {
    text: "待审核",
    value: 1,
  },
  {
    text: "已通过",
    value: 2,
  },
  {
    text: "被打回",
    value: 3,
  },
  {
    text: "拒绝",
    value: 4,
  },
];
const approveType = [
  {
    text: "全部类型",
    value: 0,
  },
  {
    text: "一般经费",
    value: 1,
  },
  {
    text: "裁决愿",
    value: 2,
  },
  {
    text: "裁决(事件)",
    value: 3,
  },
  {
    text: "裁决愿(出差)",
    value: 4,
  },
];
export default {
  name: "Approve",
  data() {
    return {
      searchContent: "",
      status: 0,
      type: 0,
      approveStatus,
      approveType,
    };
  },
  methods: {
    onConfirm() {
      this.$refs.itemSearchRef.toggle();
    },
  },
};
</script>
