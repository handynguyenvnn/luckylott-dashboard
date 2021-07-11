import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerRouterModule } from './player.route';
import { PlayerCreditComponent } from './player-credit/player-credit.component';
import { PlayerAddCreditComponent } from './player-add-credit/player-add-credit.component';
import {SharedModule} from '../../shared/shared.module';
import {PlayerDetailComponent} from './player-detail/player-detail.component';
import { UpdateRefCodeComponent } from './update-ref-code/update-ref-code.component';
import { UpdatePlayerComponent } from './update-player/update-player.component';

@NgModule({
  declarations: [
    PlayerComponent, PlayerCreditComponent,
    PlayerAddCreditComponent, PlayerDetailComponent, 
    UpdateRefCodeComponent,
    UpdatePlayerComponent
  ],
  entryComponents: [
    PlayerAddCreditComponent, 
    PlayerDetailComponent, 
    UpdateRefCodeComponent,
    UpdatePlayerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlayerRouterModule
  ]
})
export class PlayerModule { }
