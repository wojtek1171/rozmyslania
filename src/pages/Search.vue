<template>
  <q-page>
    <q-item-section class="text-h5 text-center text-white text-bold q-py-md"> Szukaj </q-item-section>
    <div class="q-px-sm">
      <div class="row">
        <div class="col">
          <q-input
            class="q-px-xs q-py-xs"
            dark
            dense
            filled
            clearable
            v-model="filterCriteria.textSearch"
            label="Treść"
          />
        </div>
        <div class="col">
          <q-input class="q-px-xs q-py-xs" dark dense filled clearable v-model="filterCriteria.tagSearch" label="Tag" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-select
            class="q-px-xs q-py-xs"
            dark
            filled
            dense
            v-model="filterCriteria.chapterSearch"
            :options="chapterOptions"
            label="Księga"
          >
            <template v-slot:append>
              <q-icon
                v-if="filterCriteria.chapterSearch !== null"
                class="cursor-pointer"
                name="clear"
                @click.stop="filterCriteria.chapterSearch = null"
              />
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-checkbox
            class="q-px-xs q-py-xs text-grey text-bold"
            dark
            v-model="filterCriteria.searchInFavourites"
            label="szukaj w ulubionych"
          />
        </div>
      </div>
    </div>

    <q-infinite-scroll @load="onLoad" :offset="250" ref="infiniteScroll">
      <!-- <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in"> -->
      <quote
        class="q-pt-lg q-px-sm"
        style="min-height: 50px"
        v-for="item in items"
        :key="item.qid"
        :quote="item"
        :searchPhrase="filterCriteria.textSearch"
        @tag="getTag"
      ></quote>
      <!-- </transition-group> -->

      <template v-slot:loading>
        <div v-if="shouldLoad" class="row justify-center q-py-md">
          <q-spinner-dots color="white" size="40px" />
        </div>
      </template>
      <div v-if="!shouldLoad" class="row justify-center q-py-md">
        <q-icon class="text-black" name="done" size="40px" />
      </div>
    </q-infinite-scroll>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="grey-10" icon="keyboard_arrow_up" @click="scrollToTop()" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import data from 'assets/quotes.json';
import Quote from 'components/Quote.vue';
import chapters from 'components/chapters';

export default {
  name: 'SearchPage',
  components: { Quote },
  data() {
    let favourites = new Set();
    let paramTag = this.$route.params.tag;

    let filterCriteria = {
      textSearch: '',
      tagSearch: '',
      chapterSearch: null,
      searchInFavourites: false,
    };

    if (paramTag) {
      filterCriteria.tagSearch = paramTag;
    }

    if (localStorage.favourites) {
      favourites = new Set(JSON.parse(localStorage.favourites));
    }

    const chapterOptions = [
      {
        label: 'I',
        value: 1,
      },
      {
        label: 'II',
        value: 2,
      },
      {
        label: 'III',
        value: 3,
      },
      {
        label: 'IV',
        value: 4,
      },
      {
        label: 'V',
        value: 5,
      },
      {
        label: 'VI',
        value: 6,
      },
      {
        label: 'VII',
        value: 7,
      },
      {
        label: 'VII',
        value: 8,
      },
      {
        label: 'XI',
        value: 9,
      },
      {
        label: 'X',
        value: 10,
      },
      {
        label: 'XI',
        value: 11,
      },
      {
        label: 'XII',
        value: 12,
      },
    ];

    const quotes: any[] = JSON.parse(JSON.stringify(data));
    let slicer = 0;

    return {
      favourites,
      chapters,
      chapterOptions,
      quotes,
      filteredQuotes: [],
      items: [],
      slicer,
      shouldLoad: true,
      filterCriteria,
    };
  },
  created: function () {
    this.filter();
    this.items = this.filteredQuotes.slice(0, 4);
  },
  methods: {
    onLoad(index, done) {
      if (this.items.length < this.filteredQuotes.length) {
        setTimeout(() => {
          this.items = this.items.concat(this.filteredQuotes.slice(this.slicer + 4, this.slicer + 9));
          this.slicer = this.slicer + 5;

          done();
        }, 250);
      } else {
        this.shouldLoad = false;
        done(true);
      }
    },
    filter() {
      let filtered = this.quotes;

      if (this.filterCriteria.textSearch) {
        filtered = filtered.filter((q) => q.text.toLowerCase().includes(this.filterCriteria.textSearch.toLowerCase()));
      }

      if (this.filterCriteria.tagSearch) {
        filtered = filtered.filter((q) => q.tags.toLowerCase().includes(this.filterCriteria.tagSearch.toLowerCase()));
      }

      if (this.filterCriteria.chapterSearch) {
        filtered = filtered.filter((q) => q.book === this.filterCriteria.chapterSearch.value);
      }
      if (this.filterCriteria.searchInFavourites) {
        filtered = filtered.filter((q) => this.favourites.has(q.qid));
      }
      this.filteredQuotes = filtered;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    getTag(tag: string) {
      this.filterCriteria.tagSearch = tag;
    },
  },
  watch: {
    filterCriteria: {
      handler() {
        this.filter();
        this.items = this.filteredQuotes.slice(0, 4);
        if (this.items.length < this.filteredQuotes.length) {
          this.shouldLoad = true;
        }
        this.$refs.infiniteScroll.resume();
        this.slicer = 0;
      },
      deep: true,
    },
  },
};
</script>
