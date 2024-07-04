import { ApplicationConfig } from '@angular/core';
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
import { provideNativeDateAdapter } from '@angular/material/core';

import { PageTitleStrategyService } from '@shared/services/page-title-strategy.service';
import { httpErrorInterceptor } from './shared/interceptors/httpErrorInterceptor';
import { MatDialogRef } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([httpErrorInterceptor])),
    provideAnimationsAsync(),
    provideStore(),
    provideNativeDateAdapter(),
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
    /* { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, */
  ],
};
