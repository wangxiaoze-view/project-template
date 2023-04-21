<template>
  <van-nav-bar
    :style="{ backgroundColor: backgroundColor, paddingTop: paddingTop || getStatusHei }"
    :title="title"
    left-arrow
    :fixed="fixed"
    :zIndex="zIndex"
    :border="border"
    @click-right="onClickRight"
    @click-left="onClickLeft"
  >
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
  import appMixins from '@/mixins/app.mixins';

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'index',
    props: {
      title: {
        tye: String,
        default: '标题',
      },
      fixed: {
        type: Boolean,
        default: true,
      },
      paddingTop: {
        type: String,
        default: '',
      },
      color: {
        type: String,
        default: '#fff',
      },
      border: {
        type: Boolean,
        default: false,
      },
      backgroundColor: {
        type: String,
        default: '#0c8bde',
      },
      zIndex: {
        type: Number,
        default: 1,
      },
    },
    setup(props, { emit }) {
      const { getStatusHei, defaultNavBarHeiPx } = appMixins();

      const onClickRight = () => {
        emit('emit-right');
      };

      const onClickLeft = () => {
        emit('emit-left');
      };
      return {
        getStatusHei: getStatusHei(true),
        defaultNavBarHeiPx: defaultNavBarHeiPx(true),
        onClickRight,
        onClickLeft,
      };
    },
  };
</script>

<style scoped lang="scss">
  :deep(.van-nav-bar__content) {
    height: v-bind(defaultNavBarHeiPx);
  }

  :deep(.van-icon) {
    color: var(--van-white);
  }

  :deep(.van-nav-bar__title) {
    color: var(--van-white);
  }

  :deep(.van-nav-bar__right) {
    color: var(--van-white);
  }
</style>
