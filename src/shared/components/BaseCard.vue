<template>
  <figure class="card">
    <img v-if="imgUrl" class="card__img" :src="imgUrl" alt="Car Image" />
    <div class="card__text">
      <h6 class="card__title">{{ title }}</h6>
      <p class="card__subtitle">{{ subtitle }}</p>
    </div>
    <slot />
  </figure>
</template>

<script lang="ts">
export default {
  props: {
    imgUrl: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  border: none;
  position: relative;

  &__img {
    border-radius: 9px;
    width: 160px;
    height: 120px;
    object-fit: cover;
    object-position: center;
  }

  &__title {
    font-weight: 600;
    color: #000;
    font-size: 1.1rem;
  }

  &__subtitle {
    font-size: 1rem;
  }

  &:hover {
    box-shadow: 1px 1px 30px #e1e1e1;
  }
}
</style>
