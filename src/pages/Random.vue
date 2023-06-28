<template>
  <q-page>
    <q-item-section class="text-h5 text-center text-italic text-bold text-white q-py-lg">
      Alea iacta est...
    </q-item-section>
    <!-- <q-item-section class="q-pa-md q-gutter-xs"> -->
    <q-item-section v-touch-swipe.touch.right.left="handleSwipe">
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <quote :quote="quote[0]" :key="quote[0].qid"></quote>
      </transition>
      <!-- </q-item-section> -->
    </q-item-section>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="grey-10" icon="casino" @click="random()" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import data from 'assets/quotes.json';
import Quote from 'components/Quote.vue';

export default {
  name: 'RandomPage',
  components: { Quote },
  data() {
    const quotes: any[] = JSON.parse(JSON.stringify(data));
    const random = Math.floor(Math.random() * quotes.length) + 1;
    let quote = quotes.filter((el) => el.qid === random);

    return { quotes, quote };
  },
  methods: {
    random() {
      const random = Math.floor(Math.random() * this.quotes.length) + 1;
      this.quote = this.quotes.filter((el) => el.qid === random);
      window.scrollTo(0, 0);
    },
    handleSwipe({ evt, ...info }) {
      this.random();
    },
  },
};
</script>
