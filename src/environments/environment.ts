// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA61zbFVO1Eflj0FGSkq1GA3MNEEbhV8XE',
    authDomain: 'butcherorder-54e9f.firebaseapp.com',
    projectId: 'butcherorder-54e9f',
    storageBucket: 'butcherorder-54e9f.appspot.com',
    messagingSenderId: '806701132805',
    appId: '1:806701132805:web:bcb7f55d83f0616188006c'
  },
  source: 'http://localhost:8200',
  gatewayPath: 'http://localhost:6001'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
