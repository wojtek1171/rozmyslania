<template>
  <q-page>
    <!-- <h4 align="center">Księga {{ chaptersMap.get(chapter) }}</h4> -->
    <q-item-section class="text-h4 q-pt-lg" align="center"> Księga {{ chaptersMap.get(chapter) }} </q-item-section>
    <q-item-section class="q-px-md">
      <q-list>
        <quote
          class="q-pt-lg"
          style="min-height: 50px"
          v-for="quote in filteredQuotes"
          :key="quote.qid"
          :quote="quote"
          >{{ quote.text }}</quote
        >
      </q-list>
    </q-item-section>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="secondary" icon="arrow_back" to="/search" />
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
    const chapter = +this.$route.params.number;
    const quotes: any[] = JSON.parse(JSON.stringify(data));
    const filteredQuotes = quotes.filter((el) => el.book === chapter);
    return { filteredQuotes, chapter, chaptersMap };
  },
};
</script>
