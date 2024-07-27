import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  MAT_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MY_DATE_FORMATS } from './config/dates';
import { authorizationInterceptor } from './shared/interceptors/authorizationInterceptor';
import { PageTitleStrategyService } from './shared/services/page-title-strategy.service';
import { provideClientHydration } from '@angular/platform-browser';
import { InitializerModule } from './initializer/initializer.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authorizationInterceptor])
    ),
    provideStore(),
    provideNativeDateAdapter(),
    importProvidersFrom(InitializerModule),
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategyService,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
};
