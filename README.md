# Rozmyślania

Rozmyślania Marka Aureliusza w formie aplikacji.

Aplikacja została stworzona w technologii PWA (Progressive Web Application), dzięki czemu może być zainstalowana na urządzeniach mobilnych i desktopowych prosto z przeglądarki, z pominięciem Google Play i App Store'a.
Po wejściu na [stronę aplikacji](https://rozmyslania.vercel.app/) Twoje urządzenie powinno dać Ci mozliwość 'dodać aplikację do ekranu początkowego' (ikona plusa na iOS) lub ją 'zainstalować' (odpowiednia informacja w przeglądarce na Android). Po instalacji aplikacja będzie działać nawet w trybie offline.

Aplikacja aktualnie dostępna tylko w języku polskim 🇵🇱

# Zrzuty ekranu

![screen0](/doc/imgs/screen0.JPG)
![screen1](/doc/imgs/screen1.JPG)
![screen2](/doc/imgs/screen2.JPG)
![screen3](/doc/imgs/screen3.JPG)
![screen4](/doc/imgs/screen4.JPG)

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
