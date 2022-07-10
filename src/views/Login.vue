<template>
  <form class="m-loginForm">
    <Header :title="title"/>

    <div class="m-loginForm__group">
      <animated-input placeholder="Username"
                      v-model="username"
                      animateBorder/>
    </div>

    <div class="m-loginForm__group">
      <animated-input
          placeholder="Password"
          animateBorder
          inputType="password"
          v-model="password"/>
    </div>

    <div class="m-loginForm__group -mg-lg">
      <div class="m-loginForm__rememberWrapper">
        <custom-checkbox
            name="remember_me"
            id="remember_me"
            labelText="Remember Me 😉"
            checkbox="✔︎"></custom-checkbox>
      </div>
    </div>

    <submit-button :btn-disabled="buttonDisabled" @click="doLogin">
      Login
    </submit-button>
  </form>
</template>

<script>
import Header from "./inputs/Header.vue";
import AnimatedInput from "./inputs/AnimatedInput.vue";
import CustomCheckbox from "./inputs/CustomCheckbox.vue";
import SubmitButton from "./buttons/SubmitButton.vue";

export default {
  name: 'Login',
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      buttonDisabled: false
    };
  },
  components: {
    Header,
    AnimatedInput,
    CustomCheckbox,
    SubmitButton
  },
  props: {
    title: String
  },
  methods: {
    doLogin() {
      if (this.username == '' || this.password == '') {
        alert("username and password shouldn't be empty!!!")
        return;
      }

      this.buttonDisabled = true;

      this.$store.commit('authError', {});

      let data = {
        action: 'login',
        username: this.username,
        password: this.password,
      };

      this.$store.dispatch('authRequest', data)
          .then(() => {
            this.buttonDisabled = false;
            this.$router.push({name: 'Home'});
          })
          .catch(() => {
            this.buttonDisabled = false;
            alert("username or password is incorrect");
          });
    }
  },
  computed: {
    authErrors: {
      get() {
        return this.$store.getters.authErrors;
      },
      set(value) {
        this.$store.commit('authError', value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/forms/_loginForm.scss";

.m-loginForm {
  width: 54%;
  margin: 0 auto;
}

</style>
