<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2">
    <q-header elevated>
      <q-toolbar class="bg-grey-10">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="toolbar-title"> Rozmyślania </q-toolbar-title>
        <div><q-btn round size="sm" color="grey-9" to="/" @click="animToDefaults()"></q-btn></div>
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-grey-10 text-white" id="drawer" v-model="leftDrawerOpen" :width="230" show-if-above>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <q-item to="/daily" clickable>
          <q-item-section avatar>
            <q-icon name="import_contacts" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Myśl na dziś</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/content" clickable>
          <q-item-section avatar>
            <q-icon name="format_list_bulleted" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Spis treści</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/search" clickable>
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Szukaj</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/favourites" clickable>
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>
            <q-item-label
              >Ulubione
              <q-chip dense size="md">{{ favourites.size }}</q-chip>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/random" clickable>
          <q-item-section avatar>
            <q-icon name="casino" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Losuj</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/options" clickable>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ustawienia</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/info" clickable>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Info</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="page">
      <router-view v-slot="{ Component }" @animEnter="getAnimEnter" @animLeave="getAnimLeave">
        <transition appear :enter-active-class="animationEnter" :leave-active-class="animationLeave" mode="out-in">
          <q-page>
            <component class="item" :is="Component" />
          </q-page>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      favourites: new Set(),
      animationEnter: 'animated fadeIn',
      animationLeave: 'animated fadeOut',
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    getAnimEnter(anim: string) {
      this.animationEnter = anim;
    },
    getAnimLeave(anim: string) {
      this.animationLeave = anim;
    },
    animToDefaults() {
      this.animationEnter = 'animated fadeIn';
      this.animationLeave = 'animated fadeOut';
    },
  },
  watch: {
    leftDrawerOpen: {
      handler() {
        if (localStorage.favourites) {
          this.favourites = new Set(JSON.parse(localStorage.favourites));
        }
        this.animationEnter = 'animated fadeIn';
        this.animationLeave = 'animated fadeOut';
      },
    },
  },
});
</script>

<style lang="scss">
.page {
  font-family: 'quicksand';
  background-color: black;
  background-image: url('../assets/marcus-corner.jpg');
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: auto 29vh;
  -webkit-background-size: auto 29vh;
}

.toolbar-title {
  font-family: 'quicksand';
}

.item {
  max-width: 820px;
  margin: auto;
}

#drawer {
  font-family: 'quicksand';
}
</style>
