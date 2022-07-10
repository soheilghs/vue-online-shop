<template>
  <div class="a-textInput">
    <input
      class="a-textInput__element"
      :class="{ '-animate': animateBorder }"
      placeholder=" "
      :value="modelValue"
      @input="updateValue"
      :type="inputType"/>

    <div class="a-textInput__placeholder">{{ placeholder }}</div>

    <span class="a-textInput__pcAnimation" v-if="animateBorder"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  setup(props, context) {
    const updateValue = (event) => {
      context.emit('update:modelValue', event.target.value);
    }

    return { updateValue }
  },
  methods: {
  },
  props: {
    inputType: {
      type: String,
      required: false,
      default: "text"
    },
    placeholder: {
      type: String,
      required: true
    },
    animateBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/components/inputs/_animatedInput.scss";

</style>
