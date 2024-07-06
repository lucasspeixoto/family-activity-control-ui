import { Injectable } from '@angular/core';
import { DialogConfig } from '@shared/models/dialog-config.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public getDeleteDialogData(
    id: string,
    title: string,
    subtitle: string
  ): DialogConfig {
    const config = {
      title,
      subtitle,
      cancelButtonTitle: 'Cancel',
      confirmationButtonTitle: 'Confirm',
      id,
    };

    return config;
  }
}
