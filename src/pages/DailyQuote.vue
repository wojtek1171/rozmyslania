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
    const date = new Date();
    const quotes: any[] = JSON.parse(JSON.stringify(data));
    let quote;

    return {
      quotes,
      quote,
      date,
      daysOfWeek,
      months,
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
      return diffDays % this.quotes.length;
    },
    refresh(done) {
      setTimeout(() => {
        this.quote = this.quotes[this.getTodayQuoteId()];
        done();
      }, 500);
    },
  },
  created() {
    this.quote = this.quotes[this.getTodayQuoteId()];
  },
  // mounted() {
  //   // eslint-disable-next-line @typescript-eslint/no-this-alias
  //   const self = this;

  //   function onResume() {
  //     let date = new Date();
  //     if (self.dayOfMonth !== date.getDate()) {
  //       self.date = date;
  //       self.quote = self.quotes[self.getTodayQuoteId()];
  //     }
  //   }
  //   document.addEventListener('resume', onResume, false);
  // },
};
</script>
