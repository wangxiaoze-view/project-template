// 全局的loading插件， 避免单页面定义loading

import { ref } from 'vue';

export default function UseLoading(initValue = false) {
  const loading = ref(initValue);

  const setLoading = (value) => {
    loading.value = value;
  };

  const toggleLoading = () => {
    loading.value = !loading.value;
  };

  return {
    loading,
    setLoading,
    toggleLoading,
  };
}
