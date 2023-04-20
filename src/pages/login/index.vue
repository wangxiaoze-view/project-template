<template>
  <view class="login-page">

    <view class="page-container" :style="{paddingTop: customHeight + 'px'}">
      <view class="form-container">
        <login-form/>
      </view>
    </view>

  </view>
</template>

<script>
import appHook from "../../hooks/appHook";
import loginForm from "./components/loginForm";

export default {
  name: "index",
  components: {
    loginForm
  },
  setup() {
    const {getAppHeader} = appHook();
    const customHeight = getAppHeader.customH;
    return {
      customHeight
    }
  }
}
</script>

<style scoped lang="scss">

.login-page {
  padding-bottom: env(safe-area-inset-bottom);
  height: calc(100vh - env(safe-area-inset-bottom));
  background-color: #fff;

  .page-container {

    .form-container {
      width: 80%;
      margin: 100px auto 20px;
    }
  }
}
</style>