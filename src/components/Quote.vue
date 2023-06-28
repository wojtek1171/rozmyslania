<template>
  <q-page>
    <q-card class="my-card bordered text-white" id="background">
      <q-card-section class="text-bold">
        <p style="text-align: left">
          Księga {{ chaptersMap.get(quote.book) }} : {{ quote.paragraph }}
          <span class="text-grey" style="float: right">
            <q-icon class="q-pb-xs" name="schedule"></q-icon>
            {{ estimateReadingTime(quote.text) }}
          </span>
        </p>
      </q-card-section>

      <q-card-section class="q-pt-xs text-subtitle2">
        <div class="text-bold" v-html="highlightSearchePhrase(quote.text)"></div>
      </q-card-section>

      <q-card-section class="q-py-xs" v-if="quote.tags">
        <div class="row items-center text-bold">
          <div class="col-1" id="tag-icon">
            <q-icon name="tag" size="sm"></q-icon>
          </div>
          <div class="col-11">
            <span v-for="tag in quote.tags.split(',')" :key="tag">
              <router-link class="link" :to="`/search/${tag}`">
                <q-chip dense clickable size="md" @click="emitTag(tag)">
                  {{ tag }}
                </q-chip>
              </router-link>
            </span>
          </div>
        </div>
      </q-card-section>

      <q-card-section v-if="quote.note">
        <q-separator dark />
        <div v-html="quote.note"></div>
      </q-card-section>

      <q-separator dark />

      <q-card-actions align="right">
        <q-btn v-if="isFavourite" flat
          ><q-icon name="favorite" @click="removeFromFavourites(quote.qid)"></q-icon
        ></q-btn>
        <q-btn v-else flat><q-icon name="favorite_border" @click="addToFavourites(quote.qid)"></q-icon></q-btn>

        <q-btn v-if="isChecked" flat><q-icon name="check_box" @click="removeFromChecked(quote.qid)"></q-icon></q-btn>
        <q-btn v-else flat><q-icon name="check_box_outline_blank" @click="addToChecked(quote.qid)"></q-icon></q-btn>

        <q-btn flat><q-icon name="share" @click="shareQuote()"></q-icon></q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import chapters from 'components/chapters';

export default defineComponent({
  name: 'QuoteComponent',
  props: ['quote', 'searchPhrase'],
  data() {
    let favourites = new Set();
    let checked = new Set();
    if (localStorage.favourites) {
      favourites = new Set(JSON.parse(localStorage.favourites));
    }
    if (localStorage.checked) {
      checked = new Set(JSON.parse(localStorage.checked));
    }

    let isFavourite = favourites.has(this.quote.qid);
    let isChecked = checked.has(this.quote.qid);
    const chaptersMap = chapters;
    return {
      chaptersMap,
      favourites,
      isFavourite,
      checked,
      isChecked,
      testMsg: 'testing',
    };
  },
  methods: {
    addToFavourites(qid: number) {
      if (localStorage.favourites) {
        this.favourites = new Set(JSON.parse(localStorage.favourites));
      }
      this.favourites.add(qid);

      localStorage.setItem('favourites', JSON.stringify(Array.from(this.favourites)));
      this.isFavourite = !this.isFavourite;
    },
    removeFromFavourites(qid: number) {
      if (localStorage.favourites) {
        this.favourites = new Set(JSON.parse(localStorage.favourites));
      }
      this.favourites.delete(qid);

      localStorage.setItem('favourites', JSON.stringify(Array.from(this.favourites)));

      this.isFavourite = !this.isFavourite;
    },
    addToChecked(qid: number) {
      if (localStorage.checked) {
        this.checked = new Set(JSON.parse(localStorage.checked));
      }
      this.checked.add(qid);
      localStorage.setItem('checked', JSON.stringify(Array.from(this.checked)));
      this.isChecked = !this.isChecked;
      this.cancelNotification(qid);
    },
    removeFromChecked(qid: number) {
      if (localStorage.checked) {
        this.checked = new Set(JSON.parse(localStorage.checked));
      }
      this.checked.delete(qid);
      localStorage.setItem('checked', JSON.stringify(Array.from(this.checked)));
      this.isChecked = !this.isChecked;
    },
    highlightSearchePhrase(text: string): string {
      if (this.searchPhrase) {
        const index = text.toLowerCase().indexOf(this.searchPhrase.toLowerCase());

        const sth =
          String(text).substring(0, index) +
          '<mark>' +
          String(text).substring(index, index + this.searchPhrase.length) +
          '</mark>' +
          String(text).substring(index + this.searchPhrase.length);

        return sth;
      }
      return text;
    },
    estimateReadingTime(text: string) {
      const words = this.quote.text.split(' ').length;
      const result = words / 238;
      if (result < 1) {
        return '< 1 min';
      }
      return Math.trunc(result) + 1 + ' min';
    },
    emitTag(tag: string) {
      this.$emit('tag', tag);
    },
    shareQuote() {
      const quote = this.quote.text;
      window.plugins.socialsharing.share(quote);
    },
    cancelNotification(qid: number) {
      cordova.plugins.notification.local.cancel(qid);
    },
  },
});
</script>

<style lang="scss">
#tag-icon {
  max-width: 30px;
}

// #background {
//   background-color: rgba(0, 0, 0, 0.5);
// }

.link {
  text-decoration: none;
}
</style>
