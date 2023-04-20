<template>
  <tui-form ref="formRef" :showMessage="false">
    <tui-form-item marginBottom="40">
      <tui-input padding="0" :borderBottom="false" placeholder="请输入用户名" backgroundColor="transparent"
                 type="number" v-model="phone" maxlength="11" >
        <template #left>
          <tui-icon name="mobile" size="34" unit="rpx" margin="0 14rpx 0 0"></tui-icon>
        </template>
        <template #right >
          <tui-icon v-if="phone !== ''" name="close-fill" size="34" unit="rpx" margin="0 0 0 14px" color="#bfbfbf"
                    @click="clearForm('phone')"></tui-icon>
        </template>
      </tui-input>
    </tui-form-item>

    <tui-form-item marginBottom="40">
      <tui-input padding="0" :borderBottom="false" :password="!isPassword" placeholder="请输入密码"
                 backgroundColor="transparent" v-model="password">
        <template #left>
          <tui-icon name="pwd" size="34" unit="rpx" margin="0 14rpx 0 0"></tui-icon>
        </template>
        <template #right v-if="password !== ''">
          <tui-icon name="close-fill" size="34" unit="rpx" margin="0 0 0 14px" color="#bfbfbf"
                    @click="clearForm('password')"></tui-icon>
          <tui-icon :name="!isPassword ? 'unseen' : 'seen'" size="34" unit="rpx" margin="0 0 0 50rpx"
                    color="#bfbfbf" @click="isPassword = !isPassword"/>
        </template>
      </tui-input>
    </tui-form-item>

    <tui-form-item marginBottom="50" padding="0" :bottomBorder="false">
      <tui-text text="忘记密码?" align="right" block color="#666"></tui-text>
    </tui-form-item>

    <tui-form-item padding="0" :bottomBorder="false">
      <tui-button height="80rpx" :disabled="isBtnDisabled" @click="submitEvent">登 录</tui-button>
    </tui-form-item>
  </tui-form>
</template>

<script>
import {computed, reactive, ref, toRefs} from "vue";
import {PageJump, ShowToast} from "../../../utils/uniVab";

export default {
  name: "loginForm",
  setup() {

    const formRef = ref(null);
    const formRules = [{
      name: "phone",
      rule: ["required", "isMobile"],
      msg: ["请输入手机号", "请输入正确的手机号"]
    }, {
      name: "password",
      rule: ["required", "isEnAndNo"],
      msg: ["请输入密码", "密码为8~20位数字和字母组合"]
    }];

    const state = reactive({
      phone: '13412314111',
      password: '123123123w123',
      isPassword: false,

      clearForm: (key) => {
        state[key] = '';
        console.log(key, state[key])
        if (key === 'password') {
          state.isPassword = false;
        }
      },

      isBtnDisabled: computed(() => {
        return state.phone === '' || state.password === ''
      }),

      submitEvent: () => {
        if (formRef.value) {
          const params = {
            phone: state.phone,
            password: state.password
          }

          formRef.value.validate(params, formRules).then(res => {
            // 接口请求
            PageJump({
              url: '/pages/tabBar/home/index'
            }, 'switchTab');
          }).catch(err => {
            ShowToast({
              title: err.errorMsg,
              icon: 'none'
            })
          })
        }
      }
    })

    return {
      ...toRefs(state),
      formRef
    }
  }
}
</script>
