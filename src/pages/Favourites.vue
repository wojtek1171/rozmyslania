<template>
  <q-page>
    <q-pull-to-refresh @refresh="refresh">
      <q-item-section class="text-h5 text-center text-white q-py-lg text-bold" style="font-family: 'quicksand'">
        Ulubione
      </q-item-section>

      <expandable-quote v-for="quote in filteredQuotes" :key="quote.qid" :quote="quote"></expandable-quote>

      <div v-if="favourites.size === 0" class="q-py-lg text-grey text-center">Lista ulubionych jest pusta</div>

      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn round color="grey-10" icon="keyboard_arrow_up" @click="scrollToTop()" />
      </q-page-sticky>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import data from 'assets/quotes.json';
import ExpandableQuote from 'components/ExpandableQuote.vue';

export default {
  name: 'FavouritesPage',
  components: { ExpandableQuote },
  data() {
    let favourites = new Set();
    if (localStorage.favourites) {
      favourites = new Set(JSON.parse(localStorage.favourites));
    }
    const quotes: any[] = JSON.parse(JSON.stringify(data));
    const filteredQuotes = quotes.filter((el) => favourites.has(el.qid));
    return {
      filteredQuotes,
      favourites,
      quotes,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    refresh(done) {
      setTimeout(() => {
        let favourites = new Set();
        if (localStorage.favourites) {
          favourites = new Set(JSON.parse(localStorage.favourites));
        }
        this.filteredQuotes = this.quotes.filter((el) => favourites.has(el.qid));
        done();
      }, 500);
    },
  },
};
</script>
