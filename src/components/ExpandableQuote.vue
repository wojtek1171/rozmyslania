<template>
  <q-expansion-item
    dark
    class="q-px-sm text-white"
    id="background"
    expand-separator
    v-model="expanded"
    :label="label"
    :label-lines="1"
    :caption="caption"
  >
    <quote style="min-height: 50px" :quote="quote"></quote>
  </q-expansion-item>
</template>

<script lang="ts">
import Quote from 'components/Quote.vue';
import chapters from 'components/chapters';

export default {
  name: 'ExpandableQuote',
  props: ['quote', 'searchPhrase'],
  components: { Quote },
  data() {
    let expanded = false;
    let label = this.quote.text;
    const chaptersMap = chapters;
    let caption = 'Księga ' + chaptersMap.get(this.quote.book) + ' : ' + this.quote.paragraph;
    return {
      label,
      caption,
      chapters,
      expanded,
    };
  },
  methods: {},
  watch: {
    expanded: {
      handler() {
        if (this.expanded) {
          this.label = '';
          this.caption = '';
        } else {
          this.label = this.quote.text;
          this.caption = 'Księga ' + this.chapters.get(this.quote.book) + ' : ' + this.quote.paragraph;
        }
      },
    },
  },
};
</script>

<style lang="scss"></style>
