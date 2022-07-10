<template>
  <button type="button" :disabled="btnDisabled"
          class="a-submitButton">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    btnDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../scss/components/buttons/_submitButton.scss";

</style>
