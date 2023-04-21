<template>
  <div class="abk-empty">
    <abk-empty description="访问页面不存在呦 ~" image="error" />
  </div>
</template>

<script>
  import AbkEmpty from '@/components/abkEmpty';

  export default {
    name: 'NotFound',
    components: {
      AbkEmpty,
    },
  };
</script>

<style scoped lang="scss">
  .abk-empty {
    height: 100vh;

    :deep(.van-empty) {
      height: 100%;
    }
  }
</style>
