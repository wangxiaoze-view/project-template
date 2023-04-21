<template>
  <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action @select="selectSheet" />
</template>

<script>
  import { reactive, toRefs } from 'vue';

  export default {
    name: 'AbkUploadSheet',
    setup(props, { emit }) {
      const state = reactive({
        show: false,
        actions: [{ name: '图库' }, { name: '拍照' }],

        setVisible: (visible = true) => {
          state.show = visible;
        },

        selectSheet: (action, index) => {
          emit('emit-sheet', action, index);
        },
      });

      return {
        ...toRefs(state),
      };
    },
  };
</script>

<style lang="scss" scoped></style>
