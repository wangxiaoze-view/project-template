<template>
  <van-empty :description="description" :image="image" :image-size="imageSize">
    <slot name="image"></slot>
    <slot name="default"></slot>
    <slot name="description"></slot>
  </van-empty>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'index',
    props: {
      image: {
        type: String,
      },
      imageSize: {
        type: [Number, String, Array],
      },
      description: {
        type: String,
        default: () => '空空如也 ~',
      },
    },
  };
</script>
