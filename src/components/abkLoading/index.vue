<template>
  <div class="abk-loading" v-show="isLoading">
    <van-loading size="24px" color="#fff" vertical>加载中...</van-loading>
  </div>
</template>

<script>
  import { computed } from 'vue';
  import { AppStore } from '@/store/app.store';

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'index',
    setup() {
      const isLoading = computed(() => {
        let loading = AppStore().isQuestLoading;
        if (loading) {
          document.querySelector('body').classList.add('abk-not--click');
        } else {
          document.querySelector('body').classList.remove('abk-not--click');
        }
        return AppStore().isQuestLoading;
      });

      return {
        isLoading,
      };
    },
  };
</script>

<style scoped lang="scss">
  .abk-loading {
    position: fixed;
    max-height: 100%;
    overflow-y: auto;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    transition: all var(--van-animation-duration-fast);
    width: var(--van-toast-default-width);
    max-width: var(--van-toast-max-width);
    min-height: var(--van-toast-default-min-height);
    padding: var(--van-toast-default-padding);
    color: var(--van-toast-text-color);
    font-size: var(--van-toast-font-size);
    line-height: var(--van-toast-line-height);
    white-space: pre-wrap;
    text-align: center;
    word-break: break-all;
    background: var(--van-toast-background-color);
    border-radius: var(--van-toast-border-radius);
    pointer-events: none;
    z-index: 2001;
  }
</style>
