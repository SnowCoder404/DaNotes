import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"danotes-fe5ea","appId":"1:651769317560:web:b3a9a5be152c9a4ddfcc4d","storageBucket":"danotes-fe5ea.firebasestorage.app","apiKey":"AIzaSyB0akZcRv-9IXG53sGX_afIMwIvodwH9lA","authDomain":"danotes-fe5ea.firebaseapp.com","messagingSenderId":"651769317560"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
