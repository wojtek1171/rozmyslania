<template>
  <div>
    <q-list clickable class="text-center text-white q-mb-xs" @click="expand()">
      <q-icon v-if="expanded" name="expand_less" size="sm"></q-icon>
      <q-icon v-else name="expand_more" size="sm"></q-icon>
      Księga {{ chapters.get(chapter) }}
      <q-chip dense dark>{{ countCheckedForChapter(chapter) }} / {{ quotes.length }}</q-chip>
      <q-icon v-if="expanded" name="expand_less" size="sm"></q-icon>
      <q-icon v-else name="expand_more" size="sm"></q-icon>
    </q-list>
    <span class="text-center text-white q-mb-xs"> </span>

    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="expanded" transition-show="slide-down">
        <span v-for="(el, index) in quotes" :key="index">
          <q-btn
            v-if="isQuoteCheked(el)"
            class="checked"
            color="grey-10"
            :label="index + 1"
            :to="`/quote/${el}`"
          ></q-btn>
          <q-btn v-else class="not-checked" color="grey-10" :label="index + 1" :to="`/quote/${el}`"></q-btn>
        </span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import chapters from 'components/chapters';

export default {
  name: 'ExpandableChapter',
  props: ['chapter', 'quotes', 'checked'],
  data() {
    return { chapters, expanded: false };
  },
  methods: {
    isQuoteCheked(qid: number) {
      return this.checked.has(qid);
    },
    countCheckedForChapter(chapter: number) {
      return this.quotes.filter((q) => this.checked.has(q)).length;
    },
    expand() {
      this.expanded = !this.expanded;
    },
  },
  watch: {},
};
</script>

<style lang="scss">
#tag-icon {
  max-width: 30px;
}

#background {
  background-color: rgba(0, 0, 0, 0.5);
}

#background-expanded {
  background-color: grey;
}

.link {
  text-decoration: none;
}
.checked {
  width: 40px;
  height: 40px;
  opacity: 0.5;
  margin: 2px;
}

.not-checked {
  width: 40px;
  height: 40px;
  margin: 2px;
}
</style>
