import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { GameUpdateComponent } from './game-update/game-update.component';
import { GameComponent } from './game.component';
import {GameRouteModule} from './game.route';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GameRouteModule,
  ],
  declarations: [GameComponent, GameUpdateComponent],
  entryComponents: [GameUpdateComponent]
})
export class GameModule {}
