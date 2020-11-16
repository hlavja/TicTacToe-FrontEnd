import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccountResourceService } from './api/accountResource.service';
import { FriendResourceService } from './api/friendResource.service';
import { GameResourceService } from './api/gameResource.service';
import { MoveResourceService } from './api/moveResource.service';
import { UserJwtControllerService } from './api/userJwtController.service';
import { UserResourceService } from './api/userResource.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AccountResourceService,
    FriendResourceService,
    GameResourceService,
    MoveResourceService,
    UserJwtControllerService,
    UserResourceService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<any> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
