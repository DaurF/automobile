<template>
  <b-dropdown :text="text">
    <slot name="form" />
  </b-dropdown>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: false,
    },
  },
});
</script>
