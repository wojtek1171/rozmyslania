<template>
  <q-page class="page">
    <q-pull-to-refresh @refresh="refresh">
      <div class="q-pr-md q-pt-md text-white text-bold text-right">
        {{ daysOfWeek.get(date.getDay()) }}, {{ date.getDate() }} {{ months.get(date.getMonth()) }}
      </div>
      <q-item-section class="text-h5 text-center text-white text-bold q-py-md"> Myśl na dziś </q-item-section>
      <q-item-section class="q-px-md">
        <quote :quote="quote" :key="quote.qid"></quote>
      </q-item-section>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import data from 'assets/quotes.json';
import Quote from 'components/Quote.vue';
import daysOfWeek from 'components/daysOfWeek.ts';
import months from 'components/months.ts';

export default {
  name: 'DailyQuotePage',
  components: { Quote },
  data() {
    let date = new Date();
    const quotes: any[] = JSON.parse(JSON.stringify(data));

    let checked = new Set();
    if (localStorage.checked) {
      checked = new Set(JSON.parse(localStorage.checked));
    }

    function getRandom() {
      const now = new Date();
      const preRandom = now.getFullYear() + now.getMonth() + now.getDate();
      return (preRandom % quotes.length) + 1;
    }

    let quote = quotes.filter((q) => q.qid === getRandom())[0];

    let notificationsSetup;

    if (localStorage.notificationsSetup) {
      notificationsSetup = JSON.parse(localStorage.notificationsSetup);
    }

    return {
      quotes,
      quote,
      date,
      daysOfWeek,
      months,
      notificationsSetup,
      checked,
      dayOfMonth: date.getDate(),
    };
  },
  methods: {
    // scheduleNotification() {
    //   const timeSetup = this.notificationsSetup.time.split(':');
    //   // eslint-disable-next-line @typescript-eslint/no-this-alias
    //   const self = this;
    //   cordova.plugins.notification.local.cancelAll();

    //   let initialRandom = this.getRandom();
    //   let idsForNextWeek = [];

    //   let i = 1;
    //   while (i <= 7) {
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

    //   cordova.plugins.notification.local.getScheduled();
    // },
    getRandom() {
      const now = new Date();
      const preRandom = now.getFullYear() + now.getMonth() + now.getDate();
      return (preRandom % this.quotes.length) + 1;
    },
    refresh(done) {
      setTimeout(() => {
        let date = new Date();
        if (this.dayOfMonth !== date.getDate()) {
          this.date = date;
          this.quote = this.quotes.filter((q) => q.qid === this.getRandom())[0];
        }
        done();
      }, 500);
    },
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    function onResume() {
      let date = new Date();
      if (self.dayOfMonth !== date.getDate()) {
        self.date = date;
        self.quote = self.quotes.filter((q) => q.qid === self.getRandom())[0];
      }
      // if (self.notificationsSetup?.enabled) {
      //   setTimeout(() => {
      //     self.scheduleNotification();
      //   }, 61000);
      // }
    }
    document.addEventListener('resume', onResume, false);

    // if (this.notificationsSetup?.enabled) {
    //   setTimeout(() => {
    //     this.scheduleNotification();
    //   }, 61000);
    // }
  },
};
</script>

<style lang="scss" scoped>
.page {
  max-width: 800px;
}
</style>
