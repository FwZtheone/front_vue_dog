<template>
  <div class="is-child tile box ">
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <slot></slot>
          <p class="title">{{nombre}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardInformation",
  props: {
    message: String,
    nombre: Number,
  },
};
</script>

<style scoped>
.container-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-image: url('/assets/svg/wave.svg');
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain; */
}
</style>
