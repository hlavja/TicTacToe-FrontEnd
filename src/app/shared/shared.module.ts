import { NgModule } from '@angular/core';
import { TicTacSharedLibsModule } from './shared-libs.module';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [TicTacSharedLibsModule],
  declarations: [ HasAnyAuthorityDirective],
  entryComponents: [],
  exports: [TicTacSharedLibsModule, HasAnyAuthorityDirective],
})
export class TicTacSharedModule {}
