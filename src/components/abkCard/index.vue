<template>
  <div class="data-card">
    <span class="data-card--title">
      {{ title }}
      <slot></slot>
    </span>
    <span class="data-card--subTitle">{{ subTitle }}</span>
  </div>
</template>

<script>
  export default {
    name: 'DataCard',
    props: {
      title: {
        type: [String, Number],
        default: '卡片标题',
      },
      subTitle: {
        type: String,
        default: '卡片副标题',
      },
    },
  };
</script>

<style scoped lang="scss">
  .data-card {
    padding: 14px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    &--title {
      font-size: 20px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 10px;
    }

    &--subTitle {
      font-weight: 400;
      font-size: 14px;
      color: #999999;
    }
  }
</style>
