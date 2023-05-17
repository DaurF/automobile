<template>
  <b-table striped hover :items="items"></b-table>
</template>

<script lang="ts">
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      items: this.data,
    };
  },
};
</script>
