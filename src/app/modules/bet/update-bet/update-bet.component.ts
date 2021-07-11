import { Component, OnInit } from '@angular/core';
import { IBet, Bet} from '../../../shared/model';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { EditComponent } from 'src/app/shared/abstract/edit.component';
import { FormBuilder, Validators } from '@angular/forms';
import { EventManager } from 'src/app/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { BetService } from '../bet.service';
import { PlayerService } from '../../player/player.service';
import { GameService } from '../../game/game.service';

@Component({
  selector: 'app-update-bet',
  templateUrl: './update-bet.component.html',
  styleUrls: ['./update-bet.component.scss']
})
export class UpdateBetComponent extends EditComponent implements OnInit {
  isSaving: boolean;
  bet?: any;
  players: any[] = [];
  games: any[] = [];
  editForm = this.fb.group({
    id: [],
    betNumber: [0, [Validators.required]],
    betType: ['', [Validators.required]],
    win: [false, [Validators.required]],
    betAmount: [0, [Validators.required]],
    times: [0, [Validators.required]],
    gameId: [0, [Validators.required]],
    playerId: [0, [Validators.required]],
  });

  constructor(
    protected betService: BetService,
    protected playerService: PlayerService,
    protected gameService: GameService,
    private fb: FormBuilder,
    public modal: NzModalRef,
    public eventManager: EventManager,
    public route: ActivatedRoute
  ) {
    super(eventManager, route, modal)
   }

  ngOnInit(): void {
    this.editForm.patchValue({
      betNumber: this.bet.betNumber,
      betType: this.bet.betType,
      win: this.bet.win,
      betAmount: this.bet.betAmount,
      times: this.bet.times,
      gameId: this.bet.gameId,
      playerId: this.bet.playerId,
    });
    this.getGames();
    this.getPlayers();
  }
  getGames() {
    this.gameService.query()
    .subscribe((res: any) => {
      this.games = res.body || [];
    });
  }
  getPlayers() {
    this.playerService.query()
    .subscribe((res: any) => {
      this.players = res.body || [];
    });
  }
  save(): void {
    this.isSaving = true;
    const bet = this.createForm();
    const service  = this.bet.id ? 'update' : 'create';
    this.betService[service](bet)
    .subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  private createForm(): IBet {
    return {
      ...new Bet(),
      id: this.bet.id,
      betNumber: this.editForm.get(['betNumber'])!.value ,
      betType: this.editForm.get(['betType'])!.value ,
      win: this.editForm.get(['win'])!.value ,
      betAmount:this.editForm.get(['betAmount'])!.value ,
      times:this.editForm.get(['times'])!.value ,
      gameId: this.editForm.get(['gameId'])!.value ,
      playerId: this.editForm.get(['playerId'])!.value ,
    };
  }
  onSaveSuccess(): void {
    super.onSaveSuccess();
    this.eventManager.broadcast({
      name: 'betListModification',
      content: `${this.bet.id ? 'Update' : 'Add'} bet`,
    });
  }
}
