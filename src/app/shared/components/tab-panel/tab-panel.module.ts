import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabPanelHeaderComponent } from './tab-panel-header/tab-panel-header.component';
import { TabPanelFooterComponent } from './tab-panel-footer/tab-panel-footer.component';
import { TabPanelItemComponent } from './tab-panel-item/tab-panel-item.component';
import { TabPanelNavComponent } from './tab-panel-nav/tab-panel-nav.component';
import { TabPanelItemTextComponent } from './tab-panel-item-text/tab-panel-item-text.component';
import { TabPanelAsideComponent } from './tab-panel-aside/tab-panel-aside.component';
import { TabPanelAsideContentDirective } from './tab-panel-aside-content.directive';
import { TabPanelItemIconDirective } from './tab-panel-item-icon.directive';
import { TabPanelBodyComponent } from './tab-panel-body/tab-panel-body.component';
import { TabPanelCustomItemComponent } from './tab-panel-custom-item/tab-panel-custom-item.component';

@NgModule({
  declarations: [
    TabPanelComponent,
    TabPanelHeaderComponent,
    TabPanelFooterComponent,
    TabPanelItemComponent,
    TabPanelNavComponent,
    TabPanelItemTextComponent,
    TabPanelAsideComponent,
    TabPanelBodyComponent,
    TabPanelCustomItemComponent,
    TabPanelAsideContentDirective,
    TabPanelItemIconDirective,
  ],
  imports: [CommonModule],
  exports: [
    TabPanelComponent,
    TabPanelHeaderComponent,
    TabPanelFooterComponent,
    TabPanelItemComponent,
    TabPanelNavComponent,
    TabPanelItemTextComponent,
    TabPanelAsideComponent,
    TabPanelBodyComponent,
    TabPanelCustomItemComponent,
    TabPanelAsideContentDirective,
    TabPanelItemIconDirective,
  ],
})
export class EmrTabPanelModule {}
