import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@sb/material';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { DialogService } from './ui-services/dialog/dialog.service';
import { NotifyService } from './ui-services/notify/notify.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MaterialModule],
  entryComponents: [UiModalComponent],
  declarations: [UiModalComponent, ToolbarComponent, SearchbarComponent],
  providers: [DialogService, NotifyService],
  exports: [UiModalComponent, ToolbarComponent, SearchbarComponent]
})
export class UiLibrariesModule {}
