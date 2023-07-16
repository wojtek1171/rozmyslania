<template>
  <q-page>
    <div>
      <div class="row text-center items-center">
        <div class="col-3 text-white q-pt-md">
          <q-btn round outline icon="chevron_left" @click="animLeft()" :to="`/quote/${getPreviousId()}`"></q-btn>
        </div>
        <div class="col-6">
          <div class="text-h6 text-white q-pt-lg">
            Księga {{ chaptersMap.get(filteredQuotes[0].book) }} :
            {{ filteredQuotes[0].paragraph }}
          </div>
        </div>
        <div class="col-3 text-white q-pt-md">
          <q-btn outline round icon="chevron_right" @click="animRight()" :to="`/quote/${getNextId()}`"> </q-btn>
        </div>
      </div>
    </div>

    <q-item-section v-touch-swipe.touch.right.left="handleSwipe" class="q-px-md">
      <transition appear :enter-active-class="animEnter" :leave-active-class="animLeave">
        <quote class="q-pt-lg" :quote="filteredQuotes[0]" :key="filteredQuotes[0].qid"></quote>
      </transition>
    </q-item-section>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="grey-10" icon="arrow_back" to="/content" @click="emitAnim()" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import data from 'assets/quotes.json';
import Quote from 'components/Quote.vue';
import chapters from 'components/chapters';

export default {
  name: 'IndexPage',
  components: { Quote },
  data() {
    const chaptersMap = chapters;
    let quoteId = +this.$route.params.number;
    const quotes: any[] = JSON.parse(JSON.stringify(data));
    let filteredQuotes = quotes.filter((el) => el.qid === quoteId);
    return { filteredQuotes, chaptersMap, quotes, animEnter: '', animLeave: '' };
  },
  methods: {
    getNextId() {
      if (this.filteredQuotes[0].qid === this.quotes.length) {
        return 1;
      }
      return this.filteredQuotes[0].qid + 1;
    },
    getPreviousId() {
      if (this.filteredQuotes[0].qid === 1) {
        return this.quotes.length;
      }
      return this.filteredQuotes[0].qid - 1;
    },
    animRight() {
      this.animEnter = 'animated slideInRight';
    },
    animLeft() {
      this.animEnter = 'animated slideInLeft';
    },
    emitAnim() {
      this.$emit('animEnter', 'animated slideInLeft');
      this.$emit('animLeave', 'animated slideOutRight');
    },
    handleSwipe({ evt, ...info }) {
      if (info.direction === 'left') {
        this.animRight();
        this.$router.push('/quote/' + this.getNextId());
      }
      if (info.direction === 'right') {
        this.animLeft();
        this.$router.push('/quote/' + this.getPreviousId());
      }
    },
  },
  watch: {
    '$route.params': {
      handler() {
        this.quoteId = +this.$route.params.number;
        this.filteredQuotes = this.quotes.filter((el) => el.qid === this.quoteId);
      },
    },
  },
};
</script>
