<template>
  <q-page class="q-pa-md" id="background">
    <div class="text-white">
      <q-tabs
        dense
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="mails" icon="mail" />
        <q-tab name="alarms" icon="copyright" />
      </q-tabs>

      <q-separator />

      <q-tab-panels dark v-model="tab" animated id="background">
        <q-tab-panel dark name="mails">
          <div class="text-h6 text-center">Kontakt</div>
          <q-separator dark />

          <div class="q-pt-md q-pb-sm text-bold text-white">
            Wszelkie uwagi o aplikacji, sugestie, informacje o błędach kieruj na:
          </div>
          <div class="q-pb-md">
            <a class="link" href="mailto:wojtek1171@proton.me">wojtek1171@proton.me</a>
          </div>
          <div class="q-pb-md">
            <a class="link" href="https://github.com/wojtek1171/rozmyslania" target="blank"
              >github.com/wojtek1171/rozmyslania</a
            >
          </div>
          <q-separator dark />
          <div class="q-py-md text-bold text-white">
            Aplikacja jest dostępna za darmo i nie zawiera reklam, jeśli jednak chcesz w jakiś sposób wynagrodzić twórcy
            wykonaną pracę, można to zrobić tutaj:
          </div>

          <q-card-actions class="q-pb-md" vertical>
            <a href="https://buycoffee.to/wojtek.mski" target="blank">
              <q-img class="img4" src="../assets/buycoffeeto.png"></q-img>
            </a>
          </q-card-actions>
        </q-tab-panel>

        <q-tab-panel class="panel" name="alarms">
          <div class="text-h6 text-center">Prawa autorskie</div>
          <q-separator dark />
          <div class="q-py-md text-bold text-white">
            Aplikacja oparta jest na treści zawartej w "<a
              class="link"
              href="https://wolnelektury.pl/katalog/lektura/rozmyslania-marek-aureliusz/"
              target="blank"
              >Rozmyślaniach</a
            >" Marka Aureliusza w tłumaczeniu M. Reitera (wyd. Warszawa 1937). Wykorzystany tekst pochodzi z opracowania
            zrealizowanego w ramach projektu
            <a class="link" href="https://wolnelektury.pl">Wolne Lektury</a>
            przez Fundację Nowoczesna Polska.
          </div>

          <q-card-actions vertical>
            <a href="https://wolnelektury.pl" target="blank">
              <q-img class="img2" src="../assets/wolne-lektury-logo.png"></q-img>
            </a>
          </q-card-actions>

          <div class="q-pt-md text-bold text-white">
            Wydanie pierwotne z 1937 r można znaleźć na
            <a
              class="link"
              href="https://pl.wikisource.org/wiki/Rozmy%C5%9Blania_(Marek_Aureliusz)/ca%C5%82o%C5%9B%C4%87"
              target="blank"
              >Wikiźródłach</a
            >
          </div>

          <q-card-actions vertical>
            <a href="https://pl.wikisource.org" target="blank">
              <q-img class="img1" src="../assets/wiki-logo.png"></q-img>
            </a>
          </q-card-actions>

          <div class="q-py-md text-bold text-white">
            Treść utworu jest w domenie publicznej, natomiast treść dodatkowa zrealizowana przez Wolne Lektury (wstęp,
            niektóre przypisy, motywy literackie wykorzystane w formie tagów) są udostępnione na
            <a class="link" href="https://artlibre.org/licence/lal/pl/" target="blank">Licencji Wolnej Sztuki 1.3</a>
          </div>

          <q-separator dark />

          <div class="q-py-md text-bold text-white">
            Ilustracja na stronie startowej, ikonach i tle:
            <a
              class="link"
              href="https://commons.wikimedia.org/wiki/File:Bronze_Marcus_Aurelius_Louvre.jpg"
              target="blank"
              >Bronze Marcus Aurelius Louvre, Waterborough, domena publiczna.</a
            >
          </div>

          <q-separator dark />

          <div class="q-py-md text-bold text-white">
            <div class="q-pb-md">Aplikacja została stworzona przy użyciu frameworka Quasar.</div>
            <q-img class="img3" src="../assets/quasar-logo.png"></q-img>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <q-footer class="footer">
      <q-separator class="text-center" dark />
      <div class="text-center">v 1.0.1</div>
    </q-footer>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'InfoPage',
  setup() {
    return {
      tab: ref('mails'),
    };
  },
};
</script>

<style lang="scss">
.link {
  text-decoration: none;
}

.img1 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80px;
}

.img2 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 140px;
}

.img3 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70px;
}

.img4 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 170px;
}

.link {
  color: rgb(80, 163, 211);
}

.link:visited {
  color: rgb(80, 163, 211);
}

.footer {
  background-color: rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 100vh;
  width: 20%;
  margin-left: auto;
  margin-right: auto;
}

// html,
// body {
//   height: 100%;
// }

#background {
  padding-bottom: 0;
}
</style>
