import { Injectable } from '@angular/core';
import { DialogConfig } from '@shared/models/dialog-config.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  /**
   * @description
   * A partir de um id de usuário, um titulo e um
   * subtitulo, retorna o objeto de configuração
   * do dialog do Angular Material
   * @name getDeleteDialogData
   * @access public
   * @param {string} userId
   * @param {string} title
   * @param {string} subtitle
   * @return {DialogConfig}
   */
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
