import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchHistoryComponent } from './components/match-history/match-history.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";



@NgModule({
  declarations: [MatchHistoryComponent],
    imports: [
        CommonModule,
        NavBarModule
    ]
})
export class MatchHistoryModule { }
