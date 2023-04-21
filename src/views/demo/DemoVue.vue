<template>
  <div class="home">
    <h1>Demo页面</h1>
    <div>
      <h1>pinia定义的count值为：</h1>
      {{ getCount }}
    </div>
    <button @click="addCount">修改pinia的count值</button>
    <hr />
    <button class="test-button" @click="testQuest">测试请求api</button>
    <hr />

    <van-button v-for="(btn, index) in button" :key="index" :type="btn.type" :size="btn.size">
      {{ btn.name }}
    </van-button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { computed, reactive, toRefs } from 'vue';
  import { ProxyLogin } from '@/api/demo';
  import { DemoStore } from '@/store/demo.store';

  export default {
    name: 'HomeView',
    setup() {
      const appStore = DemoStore();
      const getCount = computed(() => {
        return appStore.count;
      });
      const state = reactive({
        tempCount: 0,
        password: '994978704',

        button: [
          { type: 'primary', size: 'mini', name: '主要按钮' },
          { type: 'success', size: 'mini', name: '成功按钮' },
          { type: 'default', size: 'mini', name: '默认按钮' },
          { type: 'warning', size: 'mini', name: '警告按钮' },
          { type: 'danger', size: 'mini', name: '危险按钮' },
        ],
      });

      const addCount = () => {
        appStore.SET_COUNT(++state.tempCount);
      };

      const testQuest = async () => {
        await ProxyLogin({
          phone: '15534076357',
          data: 'password=' + state.password,
        });
      };

      return {
        ...toRefs(state),
        getCount,
        addCount,
        testQuest,
      };
    },
  };
</script>
