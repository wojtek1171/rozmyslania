<template>
  <q-page>
    <q-item-section class="text-h5 text-center text-white text-bold q-py-md"> Ustawienia </q-item-section>

    <q-card class="my-card q-px-xs bordered text-white" id="background">
      <q-card-section class="q-pt-xs">
        <q-separator dark />
        <!--
        <div class="q-py-xs text-bold text-subtitle1">Powiadomienia</div>

        <q-toggle color="blue" dark v-model="notificationsSetup.enabled" />

        <div v-if="notificationsSetup.enabled" class="q-pt-xs q-pb-md text-bold text-white">
          Wybierz godzinę wyświetlania powiadomień
        </div>
        <div v-else class="q-pt-xs q-pb-md text-bold text-grey-10">Wybierz godzinę wyświetlania powiadomień</div>

        <q-input
          class="time-input"
          dark
          filled
          dense
          :disable="!notificationsSetup.enabled"
          :readonly="true"
          v-model="notificationsSetup.time"
          mask="time"
          :rules="['time']"
        >
          <template v-slot:append>
            <q-icon dark name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="notificationsSetup.time" dark format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="q-pb-md">
          <q-banner class="bg-grey-9 text-white">
            Po 7 dniach niaktywności w aplikacji kolejne powiadomienia wygasają. Aby mieć pewność, że powiadomienia będą
            się stale wyświetlać nie zapominaj sprawdzić 'Myśli na dziś' przynajmniej raz w tygodniu.
          </q-banner>
        </div>

        <q-separator dark />
        -->

        <div class="q-pb-md">
          <q-banner class="bg-grey-9 text-white">
            W celu zachowania postępów lub przenoszenia je na inne urządzenie, możesz pobrać plik JSON ze swoimi danymi.
          </q-banner>
        </div>

        <div class="q-py-xs text-bold text-subtitle1">Eksportuj postęp do pliku JSON</div>
        <div class="q-py-md">
          <q-btn color="grey-9" size="md" icon="cloud_download" label="Pobierz" @click="download()"></q-btn>
        </div>
        <q-separator dark />
        <div class="q-py-xs text-bold text-subtitle1">Importuj postęp z pliku JSON</div>
        <q-file dark color="grey-9" filled v-model="file" label="Wybierz plik" accept=".json">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <div class="q-py-md">
          <q-btn color="grey-9" size="md" icon="cloud_download" label="Import" @click="onUpload"></q-btn>
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
    let notificationsSetup = {
      enabled: false,
      time: '20:00',
    };

    const quotes: any[] = JSON.parse(JSON.stringify(data));

    let checked = new Set();
    if (localStorage.checked) {
      checked = new Set(JSON.parse(localStorage.checked));
    }

    if (localStorage.notificationsSetup) {
      const setup = JSON.parse(localStorage.notificationsSetup);
      notificationsSetup.enabled = setup.enabled;
      notificationsSetup.time = setup.time;
    }
    return {
      notificationsSetup,
      tempTime: '20:00',
      confirmFavourites: false,
      confirmChecked: false,
      checked,
      quotes,
      file: ref(null),
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
      console.log(this.file);
      exportFile(`rozmyslania-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.json`, JSON.stringify(data));
    },
    onUpload() {
      //console.log(file);
      //console.log(this.file);

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = JSON.parse(e.target?.result);
        console.log(data);
        localStorage.setItem('favourites', data.favourites);
        localStorage.setItem('checked', data.checked);
      };
      reader.readAsText(this.file);
    },
    // scheduleNotification() {
    //   const timeSetup = this.notificationsSetup.time.split(':');
    //   // eslint-disable-next-line @typescript-eslint/no-this-alias
    //   const self = this;
    //   cordova.plugins.notification.local.cancelAll();

    //   let initialRandom = this.getRandom();
    //   let idsForNextWeek = [];

    //   let i = 1;
    //   while (i < 8) {
    //     idsForNextWeek.push(initialRandom);
    //     initialRandom++;
    //     i++;
    //   }

    //   i = 0;

    //   let triggerTime = new Date();
    //   triggerTime.setHours(+timeSetup[0]);
    //   triggerTime.setMinutes(+timeSetup[1]);
    //   triggerTime.setSeconds(0);
    //   let scheduledArray = [];

    //   idsForNextWeek.forEach((id) => {
    //     const notification = {
    //       id: id,
    //       title: 'Czeka na Ciebie nieprzeczytana myśl!',
    //       text: this.quotes[id - 1].text.substring(0, 50) + '...',
    //       at: new Date(triggerTime),
    //     };
    //     scheduledArray.push(notification);
    //     triggerTime.setDate(triggerTime.getDate() + 1);
    //   });

    //   scheduledArray = scheduledArray.filter((noti) => !this.checked.has(noti.id));

    //   document.addEventListener(
    //     'deviceready',
    //     function () {
    //       cordova.plugins.notification.local.schedule(scheduledArray);

    //       cordova.plugins.notification.local.on('click', function () {
    //         self.$router.push('/daily');
    //       });
    //     },
    //     false
    //   );
    // },
    getRandom() {
      const now = new Date();
      const preRandom = now.getFullYear() + now.getMonth() + now.getDate();
      return (preRandom % this.quotes.length) + 1;
    },
    confirmTime() {
      this.notificationsSetup.time = this.tempTime;
    },
  },
  watch: {
    notificationsSetup: {
      handler() {
        localStorage.setItem('notificationsSetup', JSON.stringify(this.notificationsSetup));
        if (this.notificationsSetup.enabled) {
          //this.scheduleNotification();
        } else {
          //cordova.plugins.notification.local.cancelAll();
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.time-input {
  width: 130px;
}

#background {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
