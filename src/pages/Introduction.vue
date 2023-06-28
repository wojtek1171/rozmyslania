<template>
  <q-page class="q-pb-lg">
    <q-item-section class="text-h5 text-center text-white text-bold q-py-md"> Wstęp </q-item-section>

    <q-card class="my-card q-px-xs bordered text-white" id="background">
      <q-card-section class="q-pt-xs text-subtitle2">
        <q-separator dark />
        <div class="q-py-md text-bold text-white">
          Ważna i nietypowa książka w kulturze europejskiej. Napisana przez Rzymianina – po grecku. Powstała w II wieku
          naszej ery, pozostawała bez odzewu aż do X wieku, kiedy zaczęto ją cytować w Bizancjum, w Europie Zachodniej
          stała się znana dopiero po publikacji łacińskiego tłumaczenia w połowie XVI wieku. Pisana w pogranicznej
          twierdzy oraz w obozach wojskowych w trakcie kampanii przeciwko barbarzyńcom, niemalże nie zawiera odniesień
          do wojny i armii. Stworzona przez władcę imperium liczącego dziesiątki milionów mieszkańców, dowódcę doskonale
          zorganizowanej armii, stanowi ciąg luźnych zapisków, bez planu porządkującego koncepcyjnie całość. Napisana
          przez cesarza i filozofa, cechuje się prostym, szczerym językiem, bez wywyższania się z pozycji monarchy lub
          mędrca.
        </div>
        <div class="q-py-md text-bold text-white">
          Rozmyślania, w większości greckich rękopisów znane pod tytułem Do siebie samego, to zapis prywatnych,
          adresowanych do samego siebie przemyśleń na temat życia i śmierci, ludzkich ograniczeń i niedoskonałości,
          błahości codziennych kłopotów wzbudzających w nas zbyt duże emocje. Źródło inspiracji i swoisty przewodnik
          samodoskonalenia i stosowania właściwej perspektywy, by żyć szczęśliwie i z pożytkiem dla innych.
        </div>
      </q-card-section>
      <q-space></q-space>
    </q-card>

    <q-page-sticky position="bottom-left" :offset="[17, 17]">
      <q-btn round color="grey-10" icon="arrow_back" to="/content" @click="emitAnim()" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'IntroPage',
  data() {
    return { animEnter: '', animLeave: '' };
  },
  methods: {
    emitAnim() {
      this.$emit('animEnter', 'animated slideInLeft');
      this.$emit('animLeave', 'animated slideOutRight');
    },
  },
};
</script>
