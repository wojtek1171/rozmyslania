<template>
  <q-page class="bg-black text-center" id="page">
    <div class="text-h6 text-center text-white text-bold q-py-md">Marek Aureliusz</div>
    <div class="text-h4 text-center text-white text-bold">Rozmyślania</div>
    <div class="img-container">
      <router-link to="/daily">
        <q-img class="img" src="../assets/marcus-start-bronze.jpg"></q-img>
      </router-link>
    </div>

    <q-page-sticky position="bottom" :offset="[0, 30]">
      <q-btn round class="btn" color="black" size="xl" to="/daily" icon="adjust" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'IndexPage',
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@media screen and (max-height: 450px) {
  .img-container {
    display: none;
  }
}

.img {
  max-height: 90vh;
  max-width: 50vh;
}

.btn {
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
  }
}

#page {
  max-width: 100%;
}
</style>
