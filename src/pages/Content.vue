<template>
  <q-page class="q-pb-xl">
    <!-- <q-layout> -->
    <q-item-section class="text-h5 text-center text-white text-bold q-pt-lg"> Spis treści </q-item-section>

    <div class="q-pt-md text-center text-white text-bold">
      <q-btn no-caps class="intro" color="grey-10" @click="emitAnim()" to="/intro" label="Wstęp"></q-btn>
    </div>

    <div v-for="chapter in chaptersArray" :key="chapter" class="q-pa-md text-center text-bold">
      <div class="text-center text-white q-mb-xs">
        Księga {{ chapters.get(chapter) }}
        <q-chip dense dark>{{ countCheckedForChapter(chapter) }} / {{ countQuotesForChapter(chapter) }}</q-chip>
      </div>
      <span class="text-center text-white q-mb-xs"> </span>

      <span v-for="(el, index) in filterByChapter(chapter)" :key="index">
        <q-btn
          v-if="isQuoteCheked(el)"
          class="checked"
          color="grey-10"
          :label="index + 1"
          @click="emitAnim()"
          :to="`/quote/${el}`"
        ></q-btn>
        <q-btn
          v-else
          class="not-checked"
          color="grey-10"
          :label="index + 1"
          @click="emitAnim()"
          :to="`/quote/${el}`"
        ></q-btn>
      </span>
    </div>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="grey-9" icon="keyboard_arrow_up" @click="scrollToTop()" />
    </q-page-sticky>
    <!-- <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller> -->
    <!-- </q-layout> -->
  </q-page>
</template>

<script lang="ts">
import data from 'assets/quotes.json';
import chapters from 'components/chapters';

export default {
  name: 'ContentPage',
  data() {
    let checked = new Set();

    if (localStorage.checked) {
      checked = new Set(JSON.parse(localStorage.checked));
    }

    const chaptersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let chaptersMap = new Map();
    chaptersArray.forEach((chapter) => chaptersMap.set(chapter, []));

    const quotes: any[] = JSON.parse(JSON.stringify(data));

    quotes.forEach((q) => {
      let arr = chaptersMap.get(q.book);
      arr.push(q.qid);
      chaptersMap.set(q.book, arr);
    });

    return {
      quotes,
      chaptersArray,
      chapters,
      checked,
      chaptersMap,
      showTop: false,
      windowTop: 0,
    };
  },
  methods: {
    filterByChapter(chapter: number) {
      return this.chaptersMap.get(chapter);
    },
    isQuoteCheked(qid: number) {
      return this.checked.has(qid);
    },
    countCheckedForChapter(chapter: number) {
      return this.chaptersMap.get(chapter).filter((q) => this.checked.has(q)).length;
    },
    countQuotesForChapter(chapter: number) {
      return this.chaptersMap.get(chapter).length;
    },
    scrollToTop() {
      // window.scrollTo({
      //   top: 0,
      //   behavior: 'instant',
      // });
      document.getElementsByTagName('body')[0].scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    scrollToBottom() {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'instant',
      });
    },
    emitAnim() {
      this.$emit('animEnter', 'animated slideInRight');
      this.$emit('animLeave', 'animated slideOutLeft');
    },
  },
  watch: {
    windowTop: {
      handler() {
        if (this.windowTop > document.body.scrollHeight / 2) {
          this.showTop = true;
        } else {
          this.showTop = false;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
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

.intro {
  width: 100px;
  height: 0px;
  margin: 2px;
}
</style>
