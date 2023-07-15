<template>
  <q-page>
    <q-pull-to-refresh @refresh="refresh">
      <div class="q-pr-md q-pt-md text-white text-bold text-right">
        {{ daysOfWeek.get(date.getDay()) }}, {{ date.getDate() }} {{ months.get(date.getMonth()) }}
      </div>
      <q-item-section class="text-h5 text-center text-white text-bold q-py-md"> Myśl na dziś </q-item-section>
      <q-item-section class="q-px-md">
        <quote :quote="quote" :key="quote.qid"></quote>
      </q-item-section>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import data from 'assets/quotes.json';
import Quote from 'components/Quote.vue';
import daysOfWeek from 'components/daysOfWeek.ts';
import months from 'components/months.ts';

export default {
  name: 'DailyQuotePage',
  components: { Quote },
  emits: ['favouritesSize'],
  data() {
    let date = new Date();
    const quotes: any[] = JSON.parse(JSON.stringify(data));

    let checked = new Set();
    if (localStorage.checked) {
      checked = new Set(JSON.parse(localStorage.checked));
    }

    function getTodayQuoteId() {
      const oneDay = 24 * 60 * 60 * 1000;
      const baseDate = new Date(2020, 0, 1);
      const today = new Date();
      const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      const utcBaseDate = Date.UTC(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
      const diffDays = Math.floor(Math.abs(utcToday - utcBaseDate) / oneDay);
      return (diffDays % quotes.length) + 1;
    }

    let quote = quotes.filter((q) => q.qid === getTodayQuoteId())[0];

    return {
      quotes,
      quote,
      date,
      daysOfWeek,
      months,
      checked,
      dayOfMonth: date.getDate(),
    };
  },
  methods: {
    getTodayQuoteId() {
      const oneDay = 24 * 60 * 60 * 1000;
      const baseDate = new Date(2020, 0, 1);
      const today = new Date();
      const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      const utcBaseDate = Date.UTC(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
      const diffDays = Math.floor(Math.abs(utcToday - utcBaseDate) / oneDay);
      return (diffDays % this.quotes.length) + 1;
    },
    refresh(done) {
      setTimeout(() => {
        let date = new Date();
        if (this.dayOfMonth !== date.getDate()) {
          this.date = date;
          this.quote = this.quotes.filter((q) => q.qid === this.getTodayQuoteId())[0];
        }
        done();
      }, 500);
    },
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    function onResume() {
      let date = new Date();
      if (self.dayOfMonth !== date.getDate()) {
        self.date = date;
        self.quote = self.quotes.filter((q) => q.qid === self.getTodayQuoteId())[0];
      }
    }
    document.addEventListener('resume', onResume, false);
  },
};
</script>
