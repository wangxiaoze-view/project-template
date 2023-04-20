<template>
<view class="home-page">
  <view class="grid-item" v-for="(menu, index) in homeMenuConfig" :key="index">
    <tui-text block :text="menu.title" align="left" size="28" padding="0 0 10px 0" fontWeight="600" color="#000" />

    <tui-grid unlined>
      <block v-for="(grid, gIndex) in menu.grid" :key="gIndex">
        <tui-grid-item :cell="4" :border="false" :bottom-line="false">
          <view class="grid-icon">
            <tui-icon name="close-fill" size="34" unit="rpx"></tui-icon>
          </view>
          <tui-text block :text="grid.text" align="center" size="22" padding="10px 0 0 0" />
        </tui-grid-item>
      </block>
    </tui-grid>
  </view>
</view>
</template>

<script>
import homeMenuConfig from "../../../config/homeMenu.config";
export default {
  name: "index",
  setup() {

    return {
      homeMenuConfig
    }
  }
}
</script>

<style scoped lang="scss">

.home-page {
  padding: 14px;
  .grid-item {
    padding: 14px;
    margin-bottom: 14px;
    background-color: #fff;
    border-radius: 10rpx;

    .grid-icon {
      text-align: center;
    }

  }
}

</style>