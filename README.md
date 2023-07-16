# Rozmyślania

Rozmyślania Marka Aureliusza w formie aplikacji.

Aplikacja została stworzona w technologii PWA (Progressive Web Application), dzięki czemu może być zainstalowana na urządzeniach mobilnych i desktopowych prosto z przeglądarki, z pominięciem Google Play i App Store'a.
Po wejściu na [stronę aplikacji](https://rozmyslania.vercel.app/) Twoje urządzenie powinno dać Ci mozliwość ['dodać aplikację do ekranu początkowego'](https://manula.s3.amazonaws.com/user/16094/img/pwa-ios-01.png) (ikona plusa na iOS) lub ją ['zainstalować'](https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid&oco=0) (odpowiednia informacja w przeglądarce na Android). Po instalacji aplikacja będzie działać nawet w trybie offline.

Aplikacja dostępna tylko w języku polskim 🇵🇱

# Zrzuty ekranu

![screen0](/doc/imgs/screen0.png)
![screen1](/doc/imgs/screen1.png)
![screen2](/doc/imgs/screen2.png)
![screen3](/doc/imgs/screen3.png)
![screen4](/doc/imgs/screen4.png)

# Dla developerów

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
# or
npx quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app in PWA mode for production

```bash
quasar build -m pwa
```

### Start the app in PWA mode

```bash
quasar serve dist/pwa
```
