<template>
  <q-page>
    <q-item-section class="text-h5 text-center text-italic text-bold text-white q-py-lg">
      Alea iacta est...
    </q-item-section>
    <!-- <q-item-section class="q-pa-md q-gutter-xs"> -->
    <q-item-section v-touch-swipe.touch.right.left="handleSwipe">
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <quote v-if="quote" :quote="quote" :key="quote.qid"></quote>
        <div v-else class="q-py-lg text-grey text-center">Przeczytałeś wszystkie myśli Marka Aureliuesza</div>
      </transition>
      <!-- </q-item-section> -->
    </q-item-section>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="grey-10" icon="casino" @click="rollTheDice()" />
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
    let checked = new Set();
    let drawInUnckecked;

    if (localStorage.checked) {
      checked = new Set(JSON.parse(localStorage.checked));
    }
    if (localStorage.drawInUnckecked) {
      drawInUnckecked = JSON.parse(localStorage.drawInUnckecked);
    }

    let quotes: any[] = JSON.parse(JSON.stringify(data));

    if (drawInUnckecked) {
      quotes = quotes.filter((el) => !checked.has(el.qid));
    }

    let quote;

    return { quotes, quote, checked, drawInUnckecked };
  },
  methods: {
    random() {
      const random = Math.floor(Math.random() * this.quotes.length);
      if (this.quotes.length > 0) {
        return this.quotes[random];
      } else {
        return undefined;
      }
    },
    handleSwipe({ evt, ...info }) {
      this.quote = this.random();
    },
    rollTheDice() {
      this.quote = this.random();
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.quote = this.random();
  },
};
</script>
