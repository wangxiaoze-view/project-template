<template>
  <router-view v-slot="{ Component }">
    <keep-alive v-if="keepAlive">
      <component :is="Component" v-wechat-title="getTitle" :key="$route.name" />
    </keep-alive>
    <component :is="Component" v-else v-wechat-title="getTitle" :key="$route.name" />
  </router-view>

  <teleport to="body">
    <abk-loading />
  </teleport>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import AbkLoading from '@/components/abkLoading';
  import { computed } from 'vue';

  const route = useRoute();
  if (process.env.NODE_ENV !== 'production') {
    document.querySelector('.vc-switch').innerHTML = '埋点';
  }

  const getTitle = computed(() => {
    return route.meta['title'];
  });

  const keepAlive = computed(() => {
    return route.meta['keepAlive'];
  });
</script>
<style lang="scss">
  #app {
    width: 100%;
    height: auto;
    min-height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-size: 14px;
    -webkit-touch-callout: none; /*系统默认菜单被禁用*/
    -webkit-user-select: none; /*webkit浏览器*/
    -khtml-user-select: none; /*早期浏览器*/
    -moz-user-select: none; /*火狐*/
    -ms-user-select: none; /*IE10*/
    user-select: none;

    * {
      -webkit-touch-callout: none; /*系统默认菜单被禁用*/
      -webkit-user-select: none; /*webkit浏览器*/
      -khtml-user-select: none; /*早期浏览器*/
      -moz-user-select: none; /*火狐*/
      -ms-user-select: none; /*IE10*/
      user-select: none;
    }
  }

  .vc-switch {
    background-color: #3392f2 !important;
  }

  #nprogress {
    .spinner {
      top: 50% !important;
      left: 50% !important;

      .spinner-icon {
        margin-left: -14px;
        margin-top: -14px;
      }
    }
  }
</style>
