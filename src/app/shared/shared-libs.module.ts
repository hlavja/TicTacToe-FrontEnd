import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  exports: [FormsModule, CommonModule, InfiniteScrollModule, FontAwesomeModule, ReactiveFormsModule],
})
export class TicTacSharedLibsModule {}
