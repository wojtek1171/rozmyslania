<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    handleStyles() {
      if (['/search'].includes(this.$route.path)) {
        document.getElementsByTagName('body')[0].className = 'body-search';
        document.getElementsByTagName('html')[0].className = 'html-search';
      } else {
        document.getElementsByTagName('body')[0].className = 'body-common';
        document.getElementsByTagName('html')[0].className = 'html-common';
      }
    },
  },
  mounted() {
    this.handleStyles();
  },
  watch: {
    $route() {
      this.handleStyles();
    },
  },
});
</script>

<style>
.html-common {
  overflow: hidden;
  height: 100%;
}

.body-common {
  height: 100%;
  overflow: scroll;
}

.html-search {
  overflow: auto;
  height: auto;
}

.body-search {
  height: auto;
  overflow: auto;
}
</style>
