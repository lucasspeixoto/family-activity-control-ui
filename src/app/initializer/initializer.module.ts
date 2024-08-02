import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DecodedToken } from '@shared/models/decoded-token';
import { UserService } from '@sharedS/user/user.service';

import { jwtDecode } from 'jwt-decode';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (userService: UserService) => {
        return (): void => {
          let token = null;

          if (typeof sessionStorage !== 'undefined') {
            token = sessionStorage.getItem('FAC:access_token') as string;
          }

          if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);

            userService.getUserData(decodedToken.sub);
          }
        };
      },
      deps: [UserService],
    },
  ],
})
export class InitializerModule {}
