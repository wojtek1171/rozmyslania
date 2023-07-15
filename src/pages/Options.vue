<template>
  <q-page>
    <q-item-section class="text-h5 text-center text-white text-bold q-py-md"> Ustawienia </q-item-section>

    <q-card class="my-card q-px-xs bordered text-white" id="background">
      <q-card-section class="q-pt-xs">
        <q-separator dark />

        <div class="q-pb-md">
          <q-banner class="bg-grey-9 text-white">
            Czyszczenie ciasteczek i danych witryny przez Twoją przeglądarkę może także usunąć postępy. W celu ich
            zachowania lub przenoszenia na inne urządzenie, możesz pobrać plik JSON ze swoimi danymi.
          </q-banner>
        </div>

        <div class="q-py-xs text-bold text-subtitle1">Eksportuj postęp do pliku JSON</div>
        <div class="q-py-md">
          <q-btn color="grey-9" size="md" icon="cloud_download" label="Pobierz" @click="download()"></q-btn>
        </div>

        <q-separator dark />

        <div class="q-py-xs text-bold text-subtitle1">Importuj postęp z pliku JSON</div>
        <div class="import">
          <q-file dark color="grey-9" filled v-model="file" label="Wybierz plik" accept=".json">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>
        <div class="q-py-md">
          <q-btn color="grey-9" size="md" icon="cloud_upload" label="Import" @click="onUpload"></q-btn>
        </div>

        <q-separator dark />

        <div class="q-py-md">
          <q-btn
            color="grey-9"
            size="md"
            icon="delete"
            label="Wyczyść przeczytane"
            @click="confirmChecked = true"
          ></q-btn>
        </div>
        <div class="q-py-md">
          <q-btn
            color="grey-9"
            size="md"
            icon="delete"
            label="Wyczyść ulubione"
            @click="confirmFavourites = true"
          ></q-btn>
        </div>

        <q-separator dark />

        <q-dialog v-model="confirmChecked">
          <q-card>
            <q-card-section class="text-center items-center">
              <q-icon name="warning" color="primary" size="lg" text-color="white" />
              <div class="q-ml-sm">Na pewno? Usuniętych danych nie można przywrócić.</div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cofnij" color="primary" v-close-popup />
              <q-btn flat @click="deleteChecked()" label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="confirmFavourites">
          <q-card>
            <q-card-section class="text-center items-center">
              <q-icon name="warning" color="primary" size="lg" text-color="white" />
              <div class="q-ml-sm">Na pewno? Usuniętych danych nie można przywrócić.</div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cofnij" color="primary" v-close-popup />
              <q-btn flat @click="deleteFavourites()" label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="importAlert">
          <q-card>
            <q-card-section v-if="isImportSucceded" class="text-center items-center">
              <q-icon name="done" color="primary" size="lg" text-color="white" />
              <div class="q-ml-sm">Import zakończony powodzeniem</div>
            </q-card-section>

            <q-card-section v-else class="text-center items-center">
              <q-icon name="warning" color="primary" size="lg" text-color="white" />
              <div class="q-ml-sm">Coś poszło nie tak. Sprawdź swoj plik.</div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import data from 'assets/quotes.json';
import { ref } from 'vue';
import { exportFile } from 'quasar';

export default {
  name: 'OptionsPage',
  data() {
    const quotes: any[] = JSON.parse(JSON.stringify(data));

    return {
      confirmFavourites: false,
      confirmChecked: false,
      quotes,
      isImportSucceded: false,
      file: ref(null),
      importAlert: ref(false),
    };
  },
  methods: {
    deleteFavourites() {
      localStorage.setItem('favourites', '[]');
    },
    deleteChecked() {
      localStorage.setItem('checked', '[]');
    },
    download() {
      const data = {
        favourites: localStorage.favourites,
        checked: localStorage.checked,
      };
      const now = new Date();
      exportFile(`rozmyslania-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.json`, JSON.stringify(data));
    },
    async getFileContent() {
      const reader = new FileReader();
      reader.readAsText(this.file);
      const result = await new Promise((resolve, reject) => {
        reader.onload = function (event) {
          resolve(reader.result);
        };
      });
      return result;
    },
    async onUpload() {
      const fileContent = await this.getFileContent();
      let parsedFileData;

      try {
        parsedFileData = JSON.parse(fileContent);
        this.isImportSucceded = this.checkParsedData(parsedFileData);
      } catch (e) {
        console.error(e);
        this.isImportSucceded = false;
      }

      if (this.isImportSucceded) {
        localStorage.setItem('favourites', parsedFileData.favourites);
        localStorage.setItem('checked', parsedFileData.checked);
        this.file = null;
      }
      this.importAlert = true;
    },
    checkParsedData(parsedFileData) {
      let favouritesValid = false;
      let checkedValid = false;
      let favourites;
      let checked;
      try {
        favourites = new Set(JSON.parse(parsedFileData.favourites));
        favouritesValid = this.checkArray(favourites);
      } catch (e) {
        console.error(e);
      }
      try {
        checked = new Set(JSON.parse(parsedFileData.checked));
        checkedValid = this.checkArray(checked);
      } catch (e) {
        console.error(e);
      }
      return favouritesValid && checkedValid;
    },
    checkArray(array) {
      let isDataValid = true;
      if (array) {
        array.forEach((element) => {
          if (!Number.isInteger(element)) {
            isDataValid = false;
          }
        });
      } else {
        isDataValid = false;
      }
      return isDataValid;
    },
  },
  // watch: {
  //   notificationsSetup: {
  //     handler() {
  //       localStorage.setItem('notificationsSetup', JSON.stringify(this.notificationsSetup));
  //       if (this.notificationsSetup.enabled) {
  //         //this.scheduleNotification();
  //       } else {
  //         //cordova.plugins.notification.local.cancelAll();
  //       }
  //     },
  //     deep: true,
  //   },
  // },
};
</script>

<style lang="scss">
.time-input {
  width: 130px;
}

#background {
  background-color: rgba(0, 0, 0, 0.5);
}

.import {
  max-width: 300px;
}
</style>
